

document.addEventListener('DOMContentLoaded', () => {
    initialisiereProjektDetailSeite();
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

    fetch('http://localhost:8080/app/api/db/Projects')
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkfehler: ' + response.status);
            }
            return response.json();
        })
        .then(projekte => {
            const projekt = projekte.find(eintrag => String(eintrag.id) === projektId);

            if (!projekt) {
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