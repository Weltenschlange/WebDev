// ===== PROJEKTE =====
const projekt1 = new Projekt(
    1,
    "Webshop Redesign",
    "Komplette Überarbeitung des Online-Shops mit modernem UI.",
    "/assets/logo.png",
    "2024-01-15"
);

const projekt2 = new Projekt(
    2,
    "App Entwicklung",
    "Mobile App für iOS und Android zur Kundenbindung.",
    "/assets/logo2.png",
    "2024-03-01"
);

const projekt3 = new Projekt(
    3,
    "Neue Frontpage",
    "Ansprechende Frontseite für unsere Firma",
    "/assets/LogoInput.png",
    "2024-02-29"
);

// ===== AUFGABENBEREICHE =====
const aufgabenbereich1 = new Aufgabenbereich(
    1,
    "Frontend",
    "Alle UI-bezogenen Aufgaben und Designumsetzungen."
);

const aufgabenbereich2 = new Aufgabenbereich(
    2,
    "Backend",
    "Serverlogik, Datenbankanbindung und API-Entwicklung."
);

const aufgabenbereich3 = new Aufgabenbereich(
    3,
    "Testing",
    "Qualitätssicherung durch Unit-, Integration- und E2E-Tests."
);

// ===== ARTEFAKTE =====
const artefakt1 = new Artefakt(
    1,
    "Startseite",
    "Design und Implementierung der Landing Page.",
    1,   // aufgabenbereichsID → Frontend
    12   // geplante Stunden
);

const artefakt2 = new Artefakt(
    2,
    "REST API",
    "Entwicklung der REST-Schnittstellen für Produktdaten.",
    2,   // aufgabenbereichsID → Backend
    20
);

const artefakt3 = new Artefakt(
    3,
    "Testplan",
    "Erstellung eines vollständigen Testplans für alle Module.",
    3,   // aufgabenbereichsID → Testing
    8
);

// ===== PROJEKT_AUFGABENBEREICH (Verknüpfungen) =====
const pa1 = new Projekt_Aufgabenbereich(1, 1, 1); // Webshop  ↔ Frontend
const pa2 = new Projekt_Aufgabenbereich(2, 1, 2); // Webshop  ↔ Backend
const pa3 = new Projekt_Aufgabenbereich(3, 2, 1); // App      ↔ Frontend
const pa4 = new Projekt_Aufgabenbereich(4, 2, 3); // App      ↔ Testing

// ===== PROJEKT_ARTEFAKT (Verknüpfungen mit tatsächlicher Arbeitszeit) =====
const pArt1 = new Projekt_Artefakt(1, 1, 1, 14); // Webshop + Startseite, 14h (geplant: 12h)
const pArt2 = new Projekt_Artefakt(2, 1, 2, 18); // Webshop + REST API,   18h (geplant: 20h)
const pArt3 = new Projekt_Artefakt(3, 2, 1, 10); // App     + Startseite, 10h (geplant: 12h)
const pArt4 = new Projekt_Artefakt(4, 2, 3,  9); // App     + Testplan,    9h (geplant:  8h)

let projects = [projekt1, projekt2, projekt3]
let aufgabenbereiche = [aufgabenbereich1, aufgabenbereich2, aufgabenbereich3]
let artefakte = [artefakt1, artefakt2, artefakt3]
let projekt_aufgabenbereiche = [pa1,pa2,pa3,pa4]
let projekt_artefakt = [pArt1,pArt2,pArt3,pArt4]

function projekt_laufzeit_berechnen(projekt_id){
    var sum = 0
    for(var pArt in projekt_artefakt) {
        // Alle passenden Projekt-Artefakte
        if(pArt.projekt_id != projekt_id) {
            continue
        }

        // Alle entsprechenden Artefaktzeiten
        for(art in artefakte){
            if(art.id = pArt.artefakt_id) {
                sum += art.zeitaufwand
            }
        }
    }

    return sum
}