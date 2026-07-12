// Aufgabe 1 - Login-Logut Switch

document.addEventListener("DOMContentLoaded",() => {
    const loginForm = document.getElementById("login-form")
    const logoutForm = document.getElementById("logout-form")

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault()
        loginForm.style.display = "none"
        logoutForm.style.display = "inline"
    })
    
    logoutForm.addEventListener("submit", function(event) {
        loginForm.style.display = "inline"
        logoutForm.style.display = "none"
    })
})