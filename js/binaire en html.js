let oButton = document.getElementById("press")
let oReponse = document.getElementById("reponse")



oButton.addEventListener("click", filtre)

function filtre() {
    valeur = document.getElementById("input").value

    if (isNaN(valeur)) {
        oReponse.innerText = "UN NOOOOOOOMBRE"
        return
    }
    if (valeur < 0) {
        oReponse.innerText = "UN ENTIER SUPERIEUR OU EGALE A 0"
        return
    }
    if (valeur == 1) {
        oReponse.innerText = 1
        return
    }
    if (valeur == 0) {
        oReponse.innerText = 0
        return
    }
    else {
        binaire()
    }
}

function binaire() {



    let resultat = 1
    let binairee = []
    let i = 0

    if (resultat != valeur) {

        while (resultat <= valeur) {
            if (resultat < valeur) {
                resultat = resultat * 2
                i = i + 1

            }
            if (resultat == valeur) {

                binairee.push(1)
                break
            }
            if (resultat > valeur) {

                carre = resultat / 2
                binairee.push(1)
                valeurSub = valeur - carre



                while (carre != 1) {

                    carre = carre / 2

                    if (carre > valeurSub) {
                        binairee.push(0)
                    }
                    if (carre <= valeurSub) {

                        binairee.push(1)
                        valeurSub = valeurSub - carre
                    }
                    i -= 1
                }
            }
        }
    }

    if (resultat == valeur || carre == valeurSub) {
        while (i != 0) {

            i = i - 1
            binairee.push(0)

        }
    }

    oReponse.innerText = binairee
    return
}