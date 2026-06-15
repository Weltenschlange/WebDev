class Projekt {
    constructor(id,titel,kurzbeschreibung,logo,startdatum){
        this.id = id
        this.titel = titel
        this.kurzbeschreibung = kurzbeschreibung
        this.logo = logo
        this.startdatum = Date(startdatum)
    }

    get kurzbeschreibung(){return this.kurzbeschreibung}
    set kurzbeschreibung(s){
        str = String(s)
        if(str.lengh > 255){
            throw new Error("String to long")
        }
        this.kurzbeschreibung = str
    }
}

class Aufgabenbereich {
    constructor(id, titel, kurzbeschreibung){
        this.id = id
        this.titel = titel;
        this.kurzbeschreibung = kurzbeschreibung;
    }
    
    get kurzbeschreibung(){return this.kurzbeschreibung}
    set kurzbeschreibung(s){
        str = String(s)
        if(str.lengh > 255){
            throw new Error("String to long")
        }
        this.kurzbeschreibung = str
    }
}

class Artefakt {
    constructor(id, titel, kurzbeschreibung, aufgabenbereichsID, zeitaufwand){
        this.id = id
        this.titel = titel
        this.kurzbeschreibung = kurzbeschreibung
        this.aufgabenbereichsID = aufgabenbereichsID
        this.zeitaufwand = zeitaufwand
    }
    
    get kurzbeschreibung(){return this.kurzbeschreibung}
    set kurzbeschreibung(s){
        str = String(s)
        if(str.lengh > 255){
            throw new Error("String to long")
        }
        this.kurzbeschreibung = str
    }
}

class Projekt_Aufgabenbereich{
    constructor(id, projektID, aufgabenbereichsID){
        this.id = id
        this.projektID = projektID
        this.aufgabenbereichsID = aufgabenbereichsID
    }
}

class Projekt_Artefakt{
    constructor(id, projekt_id, artefakt_id, arbeits_zeit){
        this.id = id
        this.projekt_id = projekt_id
        this.artefakt_id = artefakt_id
        this.arbeits_zeit = arbeits_zeit
    }
}

// Aufgabe 3
class Projekt_Sortierer{
    constructor(projekte){
        this.projekte = projekte
    }

    anfangsdatum(){
        return this.projekte.sort((a,b) => {
            return a.startdatum - b.startdatum
        })
    }

    laufzeit(){
        return this.projekte.sort((a,b) => {
            return projekt_laufzeit_berechnen(a.id) - projekt_laufzeit_berechnen(b.id)
        })
    }
}