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
    console.log(tasksResponse)
    console.log(artefactsResponse)
    console.log("------------")
    
    // AUFGABE 3
    
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

    console.log("------------")
    console.log(projects)
    console.log(aufgabenbereiche)
    console.log(projekt_aufgabenbereiche)
    console.log(artefakte)
    console.log(projekt_artefakt)
    console.log("------------")

    // AUFGABE 4

    let bufferItem = JSON.parse(localStorage.getItem("buffer") ?? "{}")

    if (!bufferItem) {
        projectSend = bufferItem[0]
        aufgabenbereicheSend = bufferItem[1]
        artefakteSend = bufferItem[2]
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
