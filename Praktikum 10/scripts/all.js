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
    fetch('test.json')
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
        .replace(/%7D$/, '');   // URL-kodiertes } entfernen (z.B. bei logo)
}
document.addEventListener('DOMContentLoaded', ladeNeuesteProjekte);