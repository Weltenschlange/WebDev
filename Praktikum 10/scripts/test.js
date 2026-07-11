var projects = []
var aufgabenbereiche = []
var artefakte = []
var projekt_aufgabenbereiche = []
var projekt_artefakt = []

function getJsons()
{
    // projectsResponse = fetch("https://scl.fh-bielefeld.de/WBA/projects.json")
    const projectsResponse = fetch("assets/projects.json")
    .then(response => response.json())
    .catch(error => {
        console.error(error) 
        return []
    })

    // tasksResponse = fetch("https://scl.fh-bielefeld.de/WBA/tasks.json")
    const tasksResponse = fetch("assets/tasks.json")
    .then(response => response.json())
    .catch(error => {
        console.error(error) 
        return []
    })

    // artefactsResponse = fetch("https://scl.fh-bielefeld.de/WBA/artefacts.json")
    const artefactsResponse = fetch("assets/artefacts.json")
    .then(response => response.json())
    .catch(error => {
        console.error(error) 
        return []
    })

    return Promise.all([projectsResponse, tasksResponse, artefactsResponse])
}

getJsons().then(jsons => {
    projectsResponse = jsons[0]
    tasksResponse = jsons[1]
    artefactsResponse = jsons[2]
    
    for (proj of projectsResponse) {
        projects.push(new Projekt(proj.id, proj.name, proj.shortdesc, proj.logourl, proj.start))
    }
    
    let count = 1
    for (task of tasksResponse) {
        aufgabenbereiche.push(new Aufgabenbereich(task.id, task.name, task.shortdesc))
        projekt_aufgabenbereiche.push(new Projekt_Aufgabenbereich(count, task.project, task.id))
        count++
    }
    
    count = 1
    for (arti of artefactsResponse) {
        artefakte.push(new Artefakt(arti.id, arti.name, arti.shortdesc, arti.taskid, arti.planedtime))
        
        for (proj_aufg of projekt_aufgabenbereiche) {
            if (proj_aufg.id == arti.taskid) {
                projekt_artefakt.push(new Projekt_Artefakt(count, proj_aufg.projektID, arti.id, arti.realtime))
                count++
            }
        }
    }

    // AUFGABE 2

    project1 = projects[0]

    fetch("http://localhost:8080/app/api/db/minmaxspan/Artefakt/zeitaufwand")
    .then(response => response.json())
    .then(minmaxspan => {
        // min, max, span in Projekt eintragen
        project1.min = minmaxspan.min
        project1.max = minmaxspan.max
        project1.span = minmaxspan.span

        // Projektlaufzeit
        project1.projektlaufzeit = projekt_laufzeit_berechnen(project1.id)

        console.log(project1)
    })
    .catch(error => {
        console.error(error) 
        return []
    })

    
})
