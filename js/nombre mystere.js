let ocompare = document.getElementById("compare")
let oTexte = document.getElementById("texte")
let oReset = document.getElementById("reset")



let nombreRandom = Math.round(Math.random() * 101)
let vie = 0
let data = [nombreRandom, vie]

ocompare.addEventListener("click", jeu)
oReset.addEventListener("click", reset)





function reset() {
    nombreRandom = Math.round(Math.random() * 101)
    vie = 0
    data = [nombreRandom, vie]
    oTexte.innerText = "Vous pouvez rejouer."
    document.getElementById("input").value = ""

    return data
}


function jeu() {

    saisie = document.getElementById("input").value
    if (saisie > 100) {

        oTexte.innerText = "CHOISISSEZ ENTRE 0 ET 100 COMPRIS."
        return data
    }

    if (saisie < 0) {

        oTexte.innerText = "CHOISISSEZ ENTRE 0 ET 100 COMPRIS."
        return data
    }
    if (isNaN(saisie)) {

        oTexte.innerText = "CHOISISSEZ UN NOMBRE ENTRE 0 ET 100 COMPRIS."
        return data
    }


    data[1] += 1
    vie = data[1]

    nombreRandom = data[0]
    console.log(nombreRandom)




    if (saisie != nombreRandom) {
        if (saisie < nombreRandom) {
            console.log("trop bas")
            oTexte.innerText = "Trop bas."

        }
        if (saisie > nombreRandom) {

            console.log("trop élevé")
            oTexte.innerText = "Trop élevé."
        }

        // input à mettre
    }
    if (saisie == nombreRandom) {
        if (vie == 1) {
            console.log("Bravo tu as trouvé du premier coup.")
            oTexte.innerText = "Bravo tu as trouvé du premier coup. Le nombre mystère était " + nombreRandom
        }
        else {
            console.log("Bravo tu as trouvé en ", vie, "coups")

            oTexte.innerText = "Bravo tu as trouvé en " + vie + " coups. Le nombre mystère était " + nombreRandom
        }

    }

}