

document.addEventListener('DOMContentLoaded', () => {
    initialisiereProjektDetailSeite();
    kommentare();
});

function initialisiereProjektDetailSeite() {
    const titelElement = document.getElementById('projekt-titel');

    if (!titelElement) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const projektId = params.get('id');
    const fehlermeldung = document.getElementById('projekt-fehler');

    if (!projektId) {
        if (fehlermeldung) {
            fehlermeldung.textContent = 'Kein Projekt ausgewählt.';
        }
        return;
    }

    fetch('http://localhost:8080/app/api/db/Projects/' + projektId)
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkfehler: ' + response.status);
            }
            return response.json();
        })
        .then(projekte => {
            projekt = projekte[0]
            if ((!projekt) || (projekt.id != projektId)) {
                throw new Error('Projekt mit der ID ' + projektId + ' wurde nicht gefunden.');
            }

            zeigeProjektAn(projekt);
        })
        .catch(error => {
            if (fehlermeldung) {
                fehlermeldung.textContent = error.message;
            }
            console.error('Fehler beim Laden des Projekts:', error);
        });
}

function zeigeProjektAn(projekt) {
    const titel = bereinigeWert(projekt.titel);
    const kurzbeschreibung = bereinigeWert(projekt.kurzbeschreibung);
    const langbeschreibung = bereinigeWert(projekt.langbeschreibung);
    const logo = bereinigeWert(projekt.logo);
    const startdatum = bereinigeWert(projekt.startdatum);

    const titelElement = document.getElementById('projekt-titel');
    const kurzbeschreibungElement = document.getElementById('projekt-kurzbeschreibung');
    const langbeschreibungElement = document.getElementById('projekt-langbeschreibung');
    const logoElement = document.getElementById('projekt-logo');
    const betreuerElement = document.getElementById('projekt-betreuer');
    const zeitraumElement = document.getElementById('projekt-zeitraum');
    const tocElement = document.getElementById('langbeschreibung-inhaltsverzeichnis');

    if (titelElement) {
        titelElement.textContent = titel;
    }

    if (kurzbeschreibungElement) {
        kurzbeschreibungElement.textContent = kurzbeschreibung;
    }

    if (logoElement) {
        logoElement.src = logo;
        logoElement.alt = titel;
    }

    if (betreuerElement) {
        betreuerElement.textContent = 'Projektleiter: keine Angabe';
    }

    if (zeitraumElement) {
        zeitraumElement.textContent = 'Startdatum: ' + startdatum;
    }

    if (langbeschreibungElement) {
        langbeschreibungElement.innerHTML = langbeschreibung;
        generiereInhaltsverzeichnis(langbeschreibungElement, tocElement);
    }
}

function generiereInhaltsverzeichnis(langbeschreibungElement, tocElement) {
    if (!tocElement) {
        return;
    }

    tocElement.innerHTML = '';

    const ueberschriften = Array.from(langbeschreibungElement.querySelectorAll('h1, h2, h3'));
    const stapel = [{ ebene: 0, liste: tocElement }];

    ueberschriften.forEach((ueberschrift, index) => {
        const ebene = Number(ueberschrift.tagName.substring(1));
        const text = bereinigeWert(ueberschrift.textContent.trim());

        if (!ueberschrift.id) {
            ueberschrift.id = 'langbeschreibung-' + index;
        }

        while (stapel.length > 1 && ebene <= stapel[stapel.length - 1].ebene) {
            stapel.pop();
        }

        const aktuellerKnoten = stapel[stapel.length - 1];
        const listenEintrag = document.createElement('li');
        listenEintrag.className = 'toc-level-' + ebene;

        const link = document.createElement('a');
        link.href = '#' + ueberschrift.id;
        link.textContent = text;
        listenEintrag.appendChild(link);

        aktuellerKnoten.liste.appendChild(listenEintrag);

        const neueListe = document.createElement('ul');
        listenEintrag.appendChild(neueListe);
        stapel.push({ ebene: ebene, liste: neueListe });
    });
}

function kommentare() {
    kommentarschreiber()
    kommentarlader()
}

function kommentarschreiber() {
    const kommentarform = document.getElementById('Kommentareingabe');
    const kommentarEingabe = document.getElementById('Kommentar');

    if (!kommentarform || !kommentarEingabe) {
        return;
    }

    kommentarform.addEventListener('submit', function(event) {
        event.preventDefault();

        const text = kommentarEingabe.value.trim();

        if (!text) {
            return;
        }

        const projektId = new URLSearchParams(window.location.search).get('id');
        const speicherSchluessel = getKommentarSpeicherSchluessel(projektId);
        const kommentare = ladeKommentareAusLocalStorage(speicherSchluessel);
        const ausgewaehlteBewertung = kommentarform.querySelector('input[name="stars"]:checked');

        kommentare.push({
            text: text,
            sterne: ausgewaehlteBewertung ? Number(ausgewaehlteBewertung.value) : null,
            erstelltAm: new Date().toISOString()
        });

        window.localStorage.setItem(speicherSchluessel, JSON.stringify(kommentare));
        kommentarEingabe.value = '';

        kommentarlader();
    });
}

function kommentarlader() {
    const kommentarform = document.getElementById('Kommentareingabe');

    if (!kommentarform) {
        return;
    }

    const projektId = new URLSearchParams(window.location.search).get('id');
    const speicherSchluessel = getKommentarSpeicherSchluessel(projektId);
    const kommentare = ladeKommentareAusLocalStorage(speicherSchluessel);

    let kommentarBereich = document.getElementById('projekt-kommentare');

    if (!kommentarBereich) {
        kommentarBereich = document.createElement('section');
        kommentarBereich.id = 'projekt-kommentare';

        const ueberschrift = document.createElement('h3');
        ueberschrift.textContent = 'Kommentare';

        const kommentarliste = document.createElement('ul');
        kommentarliste.id = 'projekt-kommentar-liste';

        kommentarBereich.appendChild(ueberschrift);
        kommentarBereich.appendChild(kommentarliste);
        kommentarform.insertAdjacentElement('afterend', kommentarBereich);
    }

    const kommentarliste = document.getElementById('projekt-kommentar-liste');

    if (!kommentarliste) {
        return;
    }

    kommentarliste.innerHTML = '';

    if (!kommentare.length) {
        const leererEintrag = document.createElement('li');
        leererEintrag.textContent = 'Noch keine Kommentare vorhanden.';
        kommentarliste.appendChild(leererEintrag);
        return;
    }

    kommentare.forEach(kommentar => {
        const eintrag = document.createElement('li');
        const text = document.createElement('p');
        const meta = document.createElement('small');

        text.textContent = kommentar.text;

        const sterneText = typeof kommentar.sterne === 'number' && !Number.isNaN(kommentar.sterne)
            ? 'Bewertung: ' + kommentar.sterne + '/5'
            : 'Bewertung: keine Angabe';
        const datumText = kommentar.erstelltAm ? ' | ' + new Date(kommentar.erstelltAm).toLocaleString('de-DE') : '';

        meta.textContent = sterneText + datumText;

        eintrag.appendChild(text);
        eintrag.appendChild(meta);
        kommentarliste.appendChild(eintrag);
    });
}

function getKommentarSpeicherSchluessel(projektId) {
    return 'projekt-kommentare-' + (projektId || 'ohne-id');
}

function ladeKommentareAusLocalStorage(speicherSchluessel) {
    const gespeicherteWerte = window.localStorage.getItem(speicherSchluessel);

    if (!gespeicherteWerte) {
        return [];
    }

    try {
        const geparst = JSON.parse(gespeicherteWerte);
        return Array.isArray(geparst) ? geparst : [];
    } catch (error) {
        console.error('Fehler beim Laden der gespeicherten Kommentare:', error);
        return [];
    }
}