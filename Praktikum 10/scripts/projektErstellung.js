document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("new-project-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        console.log("post")

        try {
            const logoFile = document.getElementById("Logo").files[0];
            const logoBase64 = logoFile ? await fileToBase64(logoFile) : null;

            const projectData = {
                titel: form.querySelector('[name="Projekttitel"]').value,
                logo: logoBase64,
                startdatum: form.querySelector('[name="Startdatum "]').value,
                enddatum: form.querySelector('[name="Enddatum"]').value,
                kurzbeschreibung: form.querySelector('[name="Kurzbeschreibung"]').value,
                langbeschreibung: form.querySelector('[name="Langbeschreibung"]').value,
                artefaktIDs: [] // aktuell keine Artefakt-Auswahl im Formular vorhanden
            };

            const response = await fetch("http://localhost:8080/app/api/db/NewProject", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(projectData)
            });

            if (!response.ok) {
                const error = await response.json();
                alert("Fehler beim Speichern: " + error.error);
                return;
            }

            const result = await response.json();
            window.location.href = "projektDetailSeite.html?id=" + result.id;

        } catch (err) {
            console.error("Fehler beim Erstellen des Projekts:", err);
            alert("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");
        }
    });
});

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // enthält "data:image/...;base64,...."
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}