// Testwerte

// ===== PROJEKTE =====
var projekt1 = new Projekt(
    1,
    "Webshop Redesign",
    "Komplette Überarbeitung des Online-Shops mit modernem UI.",
    "/assets/logo.png",
    "2024-01-15"
);

var projekt2 = new Projekt(
    2,
    "App Entwicklung",
    "Mobile App für iOS und Android zur Kundenbindung.",
    "/assets/logo2.png",
    "2024-03-01"
);

var projekt3 = new Projekt(
    3,
    "Neue Frontpage",
    "Ansprechende Frontseite für unsere Firma",
    "/assets/LogoInput.png",
    "2024-02-29"
);

// ===== AUFGABENBEREICHE =====
var aufgabenbereich1 = new Aufgabenbereich(
    1,
    "Frontend",
    "Alle UI-bezogenen Aufgaben und Designumsetzungen."
);

var aufgabenbereich2 = new Aufgabenbereich(
    2,
    "Backend",
    "Serverlogik, Datenbankanbindung und API-Entwicklung."
);

var aufgabenbereich3 = new Aufgabenbereich(
    3,
    "Testing",
    "Qualitätssicherung durch Unit-, Integration- und E2E-Tests."
);

// ===== ARTEFAKTE =====
var artefakt1 = new Artefakt(
    1,
    "Startseite",
    "Design und Implementierung der Landing Page.",
    1,   // aufgabenbereichsID → Frontend
    12   // geplante Stunden
);

var artefakt2 = new Artefakt(
    2,
    "REST API",
    "Entwicklung der REST-Schnittstellen für Produktdaten.",
    2,   // aufgabenbereichsID → Backend
    20
);

var artefakt3 = new Artefakt(
    3,
    "Testplan",
    "Erstellung eines vollständigen Testplans für alle Module.",
    3,   // aufgabenbereichsID → Testing
    8
);

// ===== PROJEKT_AUFGABENBEREICH (Verknüpfungen) =====
var pa1 = new Projekt_Aufgabenbereich(1, 1, 1); // Webshop  ↔ Frontend
var pa2 = new Projekt_Aufgabenbereich(2, 1, 2); // Webshop  ↔ Backend
var pa3 = new Projekt_Aufgabenbereich(3, 2, 1); // App      ↔ Frontend
var pa4 = new Projekt_Aufgabenbereich(4, 2, 3); // App      ↔ Testing

// ===== PROJEKT_ARTEFAKT (Verknüpfungen mit tatsächlicher Arbeitszeit) =====
var pArt1 = new Projekt_Artefakt(1, 1, 1, 14); // Webshop + Startseite, 14h (geplant: 12h)
var pArt2 = new Projekt_Artefakt(2, 1, 2, 18); // Webshop + REST API,   18h (geplant: 20h)
var pArt3 = new Projekt_Artefakt(3, 2, 1, 10); // App     + Startseite, 10h (geplant: 12h)
var pArt4 = new Projekt_Artefakt(4, 2, 3,  9); // App     + Testplan,   9h (geplant:  8h)
var pArt5 = new Projekt_Artefakt(5, 3, 2, 3); // Frontpage+ REST API,   3h (geplant: 20h)
var pArt6 = new Projekt_Artefakt(6, 3, 3, 2); // Frontpage+ Testplan,   2h (geplant:  8h)

var projects = [projekt1, projekt2, projekt3]
var aufgabenbereiche = [aufgabenbereich1, aufgabenbereich2, aufgabenbereich3]
var artefakte = [artefakt1, artefakt2, artefakt3]
var projekt_aufgabenbereiche = [pa1,pa2,pa3,pa4]
var projekt_artefakt = [pArt1,pArt2,pArt3,pArt4,pArt5,pArt6]


// TESTAUSGABE


console.log("---------------------------------------------")
console.log("Aufgabe 1")
console.log("---------------------------------------------")
console.log("Projekt 1: " + projekt_laufzeit_berechnen(projekt1.id))
console.log("Projekt 2: " + projekt_laufzeit_berechnen(projekt2.id))
console.log("Projekt 3: " + projekt_laufzeit_berechnen(projekt3.id))
console.log("---------------------------------------------")
console.log("Aufgabe 2")
console.log("---------------------------------------------")
console.log(new Projekt_Sortierer(projects).anfangsdatum())
console.log(new Projekt_Sortierer(projects).laufzeit())
console.log("---------------------------------------------")