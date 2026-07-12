var translation = new Map()
translation.set("Project", ["Project", "Projekt"])
translation.set("New Project", ["New Project", "Neues Projekt"])
translation.set("Menu", ["Menu", "Menü"])
translation.set("Title", ["Title", "Titel"])
translation.set("Logo", ["Logo", "Wappen"])
translation.set("Short Description", ["Short Description", "Kurzbeschreibung"])
translation.set("Long Description", ["Long Description", "Lange Beschreibung"])
translation.set("Project Goals", ["Project Goals"," Projektziele"])
translation.set("Project Lead", ["Project Lead", "Projektleitung"])
translation.set("Comment", ["Comment", "Kommentar"])

var languages = new Map()
languages.set("en-US", 0)
languages.set("de", 1)

language = navigator.language
idx = languages.get(language)
console.log(language)

document.addEventListener("DOMContentLoaded",() => {
    document.getElementsByName("NavProject")[0].textContent = translation.get("Project")[idx]
    document.getElementsByName("NavNewProject")[0].textContent = translation.get("New Project")[idx]

    document.getElementsByName("linkLogo")[0].textContent = translation.get("Logo")[idx]
    document.getElementsByName("linkTitle")[0].textContent = translation.get("Title")[idx]
    document.getElementsByName("linkLeader")[0].textContent = translation.get("Project Lead")[idx]
    document.getElementsByName("linkShortDescription")[0].textContent = translation.get("Short Description")[idx]
    document.getElementsByName("linklongDescription")[0].textContent = translation.get("Long Description")[idx]
    document.getElementsByName("linkGoal")[0].textContent = translation.get("Project Goals")[idx]

})