// Aufgabe 1 - Login-Logut Switch

document.addEventListener("DOMContentLoaded",() => {
    const loginForm = document.getElementById("login-form")
    const logoutForm = document.getElementById("logout-form")

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault()
        loginForm.style.display = "none"
        logoutForm.style.display = "inline"
    })
    
    logoutForm.addEventListener("submit", function(event) {
        loginForm.style.display = "inline"
        logoutForm.style.display = "none"
    })
})

//Aufgabe 2

function ladeNeuesteProjekte() {
    const liste = document.getElementById('neuesteProjekteListe');

    if (!liste) {
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
            const sortierteProjekte = projekte.slice().sort((a, b) => {
                const datumA = new Date(bereinigeWert(a.startdatum));
                const datumB = new Date(bereinigeWert(b.startdatum));
                return datumB - datumA;
            });
            const neuesteProjekte = sortierteProjekte.slice(0, 3);

            zeigeProjekteAn(neuesteProjekte);
        })
        .catch(error => {
            console.error('Fehler beim Laden der Projekte:', error);
        });
}

function zeigeProjekteAn(projekte) {
    const liste = document.getElementById('neuesteProjekteListe');

    if (!liste) {
        return;
    }

    liste.innerHTML = '';

    projekte.forEach(projekt => {
        const titel = bereinigeWert(projekt.titel);

        const li = document.createElement('li');
        const link = document.createElement('a');

        link.href = 'projektDetailseite.html?id=' + projekt.id;
        link.textContent = titel;

        li.appendChild(link);
        liste.appendChild(li);
    });
}

function bereinigeWert(wert) {
    if (typeof wert !== 'string') {
        return wert;
    }
    return wert
        .replace(/^\{"?/, '')   // führendes { oder {" entfernen
        .replace(/"?\}$/, '')   // abschließendes } oder "} entfernen
        .replace(/%7D$/, '')   // URL-kodiertes } entfernen (z.B. bei logo)
        .replace(/\\u003C/,'<')
        .replace(/\\u003E/,'>');
}
document.addEventListener('DOMContentLoaded', ladeNeuesteProjekte);

//Aufgabe 3

let alleProjekte = [];

function ladeAlleProjekte() {
    const liste = document.getElementById('projektListe');

    if (!liste) {
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
            alleProjekte = projekte;
            zeigeProjektUebersichtAn(alleProjekte);
        })
        .catch(error => {
            console.error('Fehler beim Laden der Projekte:', error);
        });
}

function berechneLaufzeit(projekt) {
    if (!Array.isArray(projekt.artefakte)) {
        return 0;
    }
    return projekt.artefakte.reduce((summe, artefakt) => {
        return summe + (artefakt.projektZeitaufwand || 0);
    }, 0);
}

function sortiereProjekte(projekte, kriterium) {
    const kopie = projekte.slice();

    switch (kriterium) {
        case 'datum-neu':
            return kopie.sort((a, b) =>
                new Date(bereinigeWert(b.startdatum)) - new Date(bereinigeWert(a.startdatum))
            );
        case 'datum-alt':
            return kopie.sort((a, b) =>
                new Date(bereinigeWert(a.startdatum)) - new Date(bereinigeWert(b.startdatum))
            );
        case 'laufzeit-lang':
            return kopie.sort((a, b) => berechneLaufzeit(b) - berechneLaufzeit(a));
        case 'laufzeit-kurz':
            return kopie.sort((a, b) => berechneLaufzeit(a) - berechneLaufzeit(b));
        default:
            return kopie;
    }
}

function zeigeProjektUebersichtAn(projekte) {
    const liste = document.getElementById('projektListe');

    if (!liste) {
        return;
    }

    liste.innerHTML = '';

    projekte.forEach(projekt => {
        const titel = bereinigeWert(projekt.titel);
        const kurzbeschreibung = bereinigeWert(projekt.kurzbeschreibung);

        const headerEintrag = document.createElement('li');
        headerEintrag.id = 'proj-header';
        headerEintrag.textContent = titel;

        const unterListe = document.createElement('ul');

        const beschreibungEintrag = document.createElement('li');
        beschreibungEintrag.id = 'short-desc';
        beschreibungEintrag.textContent = kurzbeschreibung;

        const linkEintrag = document.createElement('li');
        const link = document.createElement('a');
        link.id = 'proj-footer';
        link.href = 'projektDetailSeite.html?id=' + projekt.id;
        link.textContent = 'Projektseite';
        linkEintrag.appendChild(link);

        unterListe.appendChild(beschreibungEintrag);
        unterListe.appendChild(linkEintrag);

        liste.appendChild(headerEintrag);
        liste.appendChild(unterListe);
    });
}

function initSortierFilter() {
    const datumRadios = document.querySelectorAll('input[name="datum-filter"]');
    const laufzeitRadios = document.querySelectorAll('input[name="laufzeit-filter"]');

    if (!datumRadios.length && !laufzeitRadios.length) {
        return;
    }

    datumRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            laufzeitRadios.forEach(r => r.checked = false);
            const sortiert = sortiereProjekte(alleProjekte, radio.value);
            zeigeProjektUebersichtAn(sortiert);
        });
    });

    laufzeitRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            datumRadios.forEach(r => r.checked = false);
            const sortiert = sortiereProjekte(alleProjekte, radio.value);
            zeigeProjektUebersichtAn(sortiert);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    ladeAlleProjekte();
    initSortierFilter();
});

