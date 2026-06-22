var projects = []
var aufgabenbereiche = []
var artefakte = []
var projekt_aufgabenbereiche = []
var projekt_artefakt = []

// AUFGABE 1+2

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

    console.log(projectsResponse)
    
    // AUFGABE 3
    
    for (proj of projectsResponse) {
        projects.push(new Projekt(proj.id, proj.name, proj.shortdesc, proj.logourl, proj.start))
    }
    
    let count = 1
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

    let bufferItem = JSON.parse(localStorage.getItem("buffer") ?? "{}")

    if (!bufferItem) {
        projectSend = bufferItem[0]
        aufgabenbereicheSend = bufferItem[0]
        artefakteSend = bufferItem[0]
    } else {
        projectSend = projects[0]
        aufgabenbereicheSend = aufgabenbereiche[0]
        artefakteSend = artefakte[0]
    }

    fetch("https://scl.fh-bielefeld.de/WBA/projectsAPI", {
                method: 'POST',
                body: 
                    JSON.stringify([projectSend, aufgabenbereicheSend, artefakteSend])
            })
            .then((response) => {
                if (response.ok) {
                    localStorage.removeItem("buffer")
                    return response.json()
                }
                localStorage.setItem("buffer", JSON.stringify([projectSend, aufgabenbereicheSend, artefakteSend]))
            })

    // AUFGABE 5

            .catch(() => {
                localStorage.setItem("buffer", JSON.stringify([projectSend, aufgabenbereicheSend, artefakteSend]))
            })
})
