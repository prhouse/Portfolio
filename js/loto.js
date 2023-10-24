function grille() {

    oInfo = document.getElementById("info")
    oChiffre = []
    for (i = 0; i < 6; i++) {
        oChiffre[i] = Math.round(Math.random() * 8 + 1)
    }
    for (i = 0; i < 5; i++) {
        for (j = i + 1; j < 6; j++) {
            if (oChiffre[i] == oChiffre[j]) {
                oChiffre[j] = Math.round(Math.random() * 8 + 1)
                i = 0
                j = 0
            }
        }
    }
    for (i = 0; i < 6; i++) {
        document.getElementById("chiffre" + (i + 1)).value = oChiffre[i]
    }
    tirage()
}

function initialisation() {

    for (i = 0; i < 6; i++) {                       //éfface les cases remplis par le programme
        document.getElementById("tirage" + (i + 1)).value = ""
    }
    oInfo = document.getElementById("info")
    oChiffre = []
    for (i = 0; i < 6; i++) {
        oChiffre[i] = document.getElementById("chiffre" + (i + 1)).value
    }
    verification()
}

function verification() {

    for (i = 0; i < 6; i++) {
        if (oChiffre[i] == "") {        //vérifie si toutes les cases ont été remplis
            oInfo.innerText = "Vous avez oublié de remplir la case " + (i + 1)
            return
        }
        if (isNaN(oChiffre[i])) {       //vérifie si c'est bien des chiffre qui ont été entré dans les cases
            oInfo.innerText = "Veuillez entrez un chiffre en 1 et 9 compris dans la case " + (i + 1)
            return
        }
        for (j = i + 1; j < 6; j++) {
            if (oChiffre[i] == oChiffre[j]) {       //vérifie qu'aucun doublons n'a été rentré dans les cases
                oInfo.innerText = "Vous avez entré la même valeur dans la case " + (i + 1) + " que dans la case " + (j + 1) + " veuillez ne pas entrez de doublons"
                return

            }

        }
        if (oChiffre[i] < 1 || oChiffre[i] > 9) {       //vérifie que les chiffres entrés sont compris entre 1 et 9
            oInfo.innerText = "Veuillez entrez un chiffre en 1 et 9 compris dans la case " + (i + 1)
            return
        }
    }
    oInfo.innerText = ""
    tirage()
}

function tirage() {

    tiraje = []


    for (i = 0; i < 6; i++) {           //initialise les chiffres du loto
        tiraje[i] = Math.round(Math.random() * 8 + 1)
    }

    i = 0
    j = 1
    while (i < 5) {
        j = i + 1
        while (j < 6) {
            if (tiraje[i] == tiraje[j]) {       //si il y à un doublon dans les chiffres du loto cela relance un nouveau chiffre random dans un des doublons concernés
                tiraje[j] = Math.round(Math.random() * 8 + 1)
                i = 0
                j = 0
            }
            j += 1
        }
        i += 1
    }
    for (i = 0; i < 6; i++) {           //fait apparaitre les chiffres du loto à leur case respective
        document.getElementById("tirage" + (i + 1)).value = tiraje[i]
    }

    couleur()
}

function couleur() {

    for (i = 0; i < 6; i++) {
        if (oChiffre[i] == tiraje[i]) {             //si l'utilisateur a trouvé le bon chiffre au bon emplacement, ça change la classe du chiffre de l'utilisateur afin que le fond soit coloré en vert
            document.getElementById("chiffre" + (i + 1)).className = "true"

        }
        if (oChiffre[i] != tiraje[i]) {                                      //sinon en rouge
            document.getElementById("chiffre" + (i + 1)).className = "false"

        }
    }
    for (i = 0; i < 6; i++) {
        for (j = 0; j < 6; j++) {
            if (i == j) {
                j = j + 1
            }
            if (oChiffre[i] == tiraje[j]) {

                document.getElementById("chiffre" + (i + 1)).className = "confirmation"
                break
            }
        }


    }
    win()
}

function win() {

    rouge = 0
    vert = 0
    orange = 0

    for (i = 0; i < 6; i++) {                        //vérifie si l'utilisateur à gagner ou non en vérifiant s'il y a une class "false"

        if (document.getElementById("chiffre" + (i + 1)).className == "false") {
            rouge = rouge + 1
        }
        if (document.getElementById("chiffre" + (i + 1)).className == "confirmation") {
            orange = orange + 1
        }
        if (document.getElementById("chiffre" + (i + 1)).className == "true") {
            vert = vert + 1
        }
    }
    if (rouge > 0 || orange > 0) {
        console.log(vert)
        console.log(orange)
        console.log(rouge)
        if (vert == 1 && orange != 1 && rouge != 1) {
            oInfo.innerText = "Perdu, vous avez trouvé " + vert + " chiffre à la bonne place, " + orange + " chiffres tirés mais pas à la bonne place et " + rouge + " chiffres n'étaient pas dans le tirage."
        }
        if (vert != 1 && orange == 1 && rouge != 1) {
            oInfo.innerText = "Perdu, vous avez trouvé " + vert + " chiffres à la bonne place, " + orange + " chiffre tiré mais pas à la bonne place et " + rouge + " chiffres n'étaient pas dans le tirage."
        }
        if (vert != 1 && orange != 1 && rouge == 1) {
            oInfo.innerText = "Perdu, vous avez trouvé " + vert + " chiffres à la bonne place, " + orange + " chiffres tirés mais pas à la bonne place et " + rouge + " chiffre n'été pas dans le tirage."
        }
        if (vert == 1 && orange == 1 && rouge != 1) {
            oInfo.innerText = "Perdu, vous avez trouvé " + vert + " chiffre à la bonne place, " + orange + " chiffre tiré mais pas à la bonne place et " + rouge + " chiffres n'etaient pas dans le tirage."
        }
        if (vert == 1 && orange != 1 && rouge == 1) {
            oInfo.innerText = "Perdu, vous avez trouvé " + vert + " chiffre à la bonne place, " + orange + " chiffres tirés mais pas à la bonne place et " + rouge + " chiffre n'été pas dans le tirage."
        }
        if (vert != 1 && orange == 1 && rouge == 1) {
            oInfo.innerText = "Perdu, vous avez trouvé " + vert + " chiffres à la bonne place, " + orange + " chiffre tiré mais pas à la bonne place et " + rouge + " chiffre n'été pas dans le tirage."
        }
        if (vert != 1 && orange != 1 && rouge != 1) {
            oInfo.innerText = "Perdu, vous avez trouvé " + vert + " chiffres à la bonne place, " + orange + " chiffres tirés mais pas à la bonne place et " + rouge + " chiffres n'étaient pas dans le tirage."
        }
    }
    if (vert == 6)
        oInfo.innerText = "Bravo, vous avez gagné, vous aviez 1 chance sur 60 480 de gagner (dommage qu'il n'y ai pas de récompenses)."
}
function reset() {

    for (i = 0; i < 6; i++) {                       //remet les classes à leur état d'origine et efface les cases remplis par l'utilisateur et le programme

        document.getElementById("chiffre" + (i + 1)).className = "enAttente"
        document.getElementById("chiffre" + (i + 1)).value = ""
        document.getElementById("tirage" + (i + 1)).value = ""
        oInfo.innerText = ""

    }
}