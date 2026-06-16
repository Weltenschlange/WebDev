function projekt_laufzeit_berechnen(projekt_id){
    let sum = 0
    for(let pArt of projekt_artefakt) {
        // Alle passenden Projekt-Artefakte
        if(pArt.projekt_id != projekt_id) {
            continue
        }

        // Alle entsprechenden Artefaktzeiten
        for(art of artefakte){
            if(art.id == pArt.artefakt_id) {
                sum += art.zeitaufwand
            }
        }
    }

    return sum
}