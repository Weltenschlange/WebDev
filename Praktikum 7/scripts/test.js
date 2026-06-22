var projects = []
var aufgabenbereiche = []
var artefakte = []
var projekt_aufgabenbereiche = []
var projekt_artefakt = []

// AUFGABE 1+2

async function getJsons()
{
    // projectsResponse = fetch("https://scl.fh-bielefeld.de/WBA/projects.json")
    const projectsResponse = await fetch("assets/projects.json")
    .then(response => response.json())
    .catch(error => {
        console.error(error) 
        return []
    })

    // tasksResponse = fetch("https://scl.fh-bielefeld.de/WBA/tasks.json")
    const tasksResponse = await fetch("assets/tasks.json")
    .then(response => response.json())
    .catch(error => {
        console.error(error) 
        return []
    })

    // artefactsResponse = fetch("https://scl.fh-bielefeld.de/WBA/artefacts.json")
    const artefactsResponse = await fetch("assets/artefacts.json")
    .then(response => response.json())
    .catch(error => {
        console.error(error) 
        return []
    })

    return [projectsResponse, tasksResponse, artefactsResponse]
}

const jsons = getJsons()
projectsResponse = jsons[0]
tasksResponse = jsons[1]
artefactsResponse = jsons[2]

console.log(projectsResponse)

// AUFGABE 3

for (proj of projectsResponse) {
    projects.push(new Projekt(proj.id, proj.name, proj.shortdesc, proj.logourl, proj.start))
}

count = 1
for (task of tasksResponse) {
    aufgabenbereiche.push(task.id, task.name, task.shortdesc)
    projekt_aufgabenbereiche.push(count, task.project, task.id)
    count++
}

count = 1
for (arti of artefactsResponse) {
    artefakte.push(arti.id, arti.name, arti.shortdesc, arti.taskid, arti.planedtime)
    count++
    
    for (proj_aufg of projekt_aufgabenbereiche) {
        if (proj_aufg.id == arti.taskid) {
            projekt_artefakt.push(count, proj_aufg.projektID, arti.id, arti.realtime)
        }
    }
}

// AUFGABE 4

fetch("https://scl.fh-bielefeld.de/WBA/projectsAPI", {
            method: 'POST',
            body: 
                JSON.stringify([projects[0], aufgabenbereiche[0], artefakte[0]])
        })
        .then(response => response.json())