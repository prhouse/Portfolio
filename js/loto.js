"use strict"
/*Loto national réalisé par Lachater joé


v1.0    Code fonctionnel en attente des retours de Mr Roumanet

v0.8    Il ne reste plus que le rang à afficher et le code me parait bon a rendre

v0.7    J'ai trouvé une technique pour parer le probleme de v0.6 chaque simulation fais 4900 boucles, cela oblige 
        l'utilisateur a recliquer entre chaque simulations mais c'est la meilleure solution que j'ai trouvé ligne 498
        à modifier selon les naviguateurs.

v0.6    La partie simulation de durée pour obtenir une combinaison gagnante fonctionne egalement mais je suis limité
        par les naviguateurs qui refusent de dépasser un certain nombre d'itteration

v0.5    La partie tirage du loto et fonctionnelle il ne reste plus qu'à faire en sorte d'afficher un texte pour que
        l'utilisateur sache quel rang vaut son tirage

v0.4    Je me suis aperçu que des checkboxs ne seraient pas customisables comme je le veux je les ai donc remplacées
        par des boutons qui offrent plus de customisations. J'ai du rechanger un peu le code un peu partout mais les
        fonctions m'ont bien aidé à m'y retrouver.

v0.3    La base visible par l'utilisateur est terminé, maintenant il ne reste plus que la partie calcule à intégrer.


v0.2    En m'inspirant du simulateur de loto de la FDJ je me suis dis que ce serait mieux de 
        désactiver le bouton tant que 5 cases ne sont pas cochés et d'afficher un texte 
        dynamique en fonction des cases cochés.

v0.1    J'ai d'abord pensé à écrire une phrase quand 5 cases ne sont pas coché par l'utilisateur
        lorsqu'il clique sur le bouton pour lancer le tirage.
*/

let k = 1                    //compteur pour la fonction simulationTemps
let bouton = document.querySelector("#lancerTirage")
let boutonTemps = document.querySelector("#lancerSimulation")
let reset = document.querySelector("#reset")
let affichage = document.querySelector("#resultat")
let instructionNombre = document.querySelector("#instructionNombre")
let instructionChance = document.querySelector("#instructionChance")

document.querySelector("#tableauACocher").innerHTML = tableauNombre()
document.querySelector("#chanceACocher").innerHTML = tableauChance()
listenNombre()
listenNombreChance()

//début partie interface
//Initialise les boutons "numeros" en html dans une variable "tableau" et la retourne
function tableauNombre() {
    let tableau = "<table><tr>"

    for (let i = 1; i < 50; i++) {
        // sert à revenir à la ligne
        if ((i - 1) % 10 == 0) {
            tableau += "</tr><tr><td><button class='checkboxNum' id='numeros" + i + "'>" + i + "</button></td>"
        } else {
            tableau += "<td><button class='checkboxNum' id='numeros" + i + "'>" + i + "</button></td>"
        }
    }
    tableau += "</tr></table>"
    return tableau
}

//Initialise les boutons "chance" en html dans une variable "chance" et la retourne
function tableauChance() {
    let chance = "<table><tr>"

    for (let i = 1; i < 11; i++) {
        //sert à revenir à la ligne
        if ((i - 1) % 3 == 0) {
            chance += "</tr><tr><td><button class='checkboxCha' id='chance" + i + "'>" + i + "</button></td>"
        } else {
            chance += "<td><button class='checkboxCha' id='chance" + i + "'>" + i + "</button></td>"
        }
    }
    chance += "</tr></table>"
    return chance
}

//Stock les ID des boutons "numeros" dans une variable "nombre" et la retourne
function stockIdNumeros() {
    let nombre = []

    for (let i = 1; i < 50; i++) {
        nombre[i] = document.querySelector("#numeros" + i)

    }
    return nombre
}

//Stock les ID des boutons "chance" dans une variable "nombreChance" et la retourne
function stockIdChance() {
    let nombreChance = []

    for (let i = 1; i < 11; i++) {
        nombreChance[i] = document.querySelector("#chance" + i)
    }
    return nombreChance
}

/*
 Cette fonction est lancé des qu'une bouton avec une "id="numerosX"" est cliqué ou décliqué,
 elle verifie combien de bouton sont cliqués ou non et elle prend comme paramettre toutes
 les id des bouton id="numeros"
 */
function verificationNombre(nombre) {
    let compteur = 0

    // affecte une checkbox i+1 à un nombre[i] afin de vérifier si elles sont coché ou non
    for (let i = 1; i < 50; i++) {
        if (nombre[i].className == "checkboxNumClick") {
            compteur += 1
        }
    }
    return compteur
}

/*
 Cette fonction est lancé des qu'une bouton avec une "id="chanceX"" est cliqué ou décliqué,
 elle verifie combien de bouton sont cliqués ou non et elle prend comme paramettre toutes
 les id des bouton id="chance"
 */
function verificationChance(nombre) {
    let compteur = 0


    // regarde quel(s) numéro(s) chance est(sont) sélectionné(s) par l'utilisateur
    for (let i = 1; i < 11; i++) {
        if (nombre[i].className == "checkboxChaClick") {
            compteur += 1
        }
    }
    return compteur
}

// Renvoie un texte en fonction du nombres de bouton avec une "id="nombreX"" cliqué ou non
function texteDynamiqueNombre(compteur) {
    let texte = ""

    if (compteur < 5 && compteur != 4 && compteur != 0) {
        texte = "Cochez encore " + (5 - compteur) + " numéros. "
    }
    else if (compteur == 0) {
        texte = "Cochez 5 numéros."
    }
    else if (compteur == 4) {
        texte = "Cochez encore " + (5 - compteur) + " numéro. "
    }
    else if (compteur > 5 && compteur != 6) {
        texte = "Décochez " + (compteur - 5) + " numéros. "
    }
    else if (compteur == 6) {
        texte = "Décochez " + (compteur - 5) + " numéro. "
    }

    return texte
}

// Renvoie un texte en fonction du nombres de bouton avec une "id="chanceX"" cliqué ou non
function texteDynamiqueChance(compteur) {
    let texte = ""

    if (compteur < 1) {
        texte = "Cochez 1 numéro chance."
    }
    else if (compteur > 1 && compteur != 2) {
        texte = "Décochez " + (compteur - 1) + " numéros chance."
    }
    else if (compteur == 2) {
        texte = "Décochez 1 numéro."
    }

    return texte
}

// initialise l'ecoute des boutons avec l'id "numerosX" et change la className des boutons cliqués
function listenNombre() {
    let nombre = stockIdNumeros()

    for (let i = 1; i < 50; i++) {
        nombre[i].addEventListener("click", function () {
            if (nombre[i].className == "checkboxNum") {

                nombre[i].className = "checkboxNumClick"
            } else {
                nombre[i].className = "checkboxNum"

            }

            let compteurNombre = verificationNombre(nombre)
            instructionNombre.innerHTML = texteDynamiqueNombre(compteurNombre)
            activerBouton()
        })
    }
}


// initialise l'ecoute des boutons avec l'id "chanceX" et change la className des boutons cliqués
function listenNombreChance() {
    let nombreChance = stockIdChance()

    for (let i = 1; i < 11; i++) {
        nombreChance[i].addEventListener("click", function () {
            if (nombreChance[i].className == "checkboxCha") {

                nombreChance[i].className = "checkboxChaClick"
            } else {
                nombreChance[i].className = "checkboxCha"

            }
            let compteurChance = verificationChance(nombreChance)
            instructionChance.innerHTML = texteDynamiqueChance(compteurChance)
            activerBouton()
        })
    }
}

//rend le bouton utilisable pour l'utilisateur
function activerBouton() {
    let nombre = stockIdNumeros()
    let nombreChance = stockIdChance()
    let compteurNombre = verificationNombre(nombre)
    let compteurChance = verificationChance(nombreChance)

    if (compteurNombre == 5 && compteurChance == 1) {
        bouton.disabled = false
        boutonTemps.disabled = false
    } else {
        bouton.disabled = true
        boutonTemps.disabled = true
        affichage.innerHTML = "" //au cas ou l'utilisateur à déjà joué et qu'il déclique un nombre cela fait disparaitre le resultat
    }
    if (compteurNombre == 0 && compteurChance == 0) {
        reset.disabled = true
    } else {
        reset.disabled = false
    }
}

function resetAll() {
    let nombre = stockIdNumeros()
    let nombreChance = stockIdChance()

    for (let i = 1; i < 50; i++) {
        nombre[i].className = "checkboxNum"
        if (i < 11) {
            nombreChance[i].className = "checkboxCha"
        }
    }
    bouton.disabled = true
    boutonTemps.disabled = true
    reset.disabled = true
    affichage.innerHTML = ""
    instructionNombre.innerHTML = "Cochez 5 numéros."
    instructionChance.innerHTML = "Cochez 1 numéro chance"

}
// fin partie interface
//Coeur du programme
function initialisationLoto() {


    let saisieNombre = saisieUtilisateurNombre()
    let saisieChance = saisieUtilisateurChance()
    let tirageNombre = tirageLoto()
    let tirageChance = tirageChanceLoto()
    let tableauNombre = comparaisonNombre(saisieNombre, tirageNombre)
    let tableauChance = comparaisonChance(saisieChance, tirageChance)
    let texteNombre = tableauNombreloto(tableauNombre, tirageNombre)
    let texteChance = tableauChanceloto(tableauChance, tirageChance)
    let txtRang = texteRang(tableauNombre, tableauChance)
    let resultat = texteNombre + texteChance + txtRang

    affichage.innerHTML = resultat
}

// tire les nombres du loto sans le numéro chance
function tirageLoto() {
    let tirage = []

    for (let i = 1; i < 6; i++) {           //initialise les chiffres du loto
        tirage[i] = Math.floor(Math.random() * Math.floor(49) + 1)
    }
    if (!verifTirage(tirage)) {
        return tirageLoto()
    }
    return tirage
}

// tire le numéro chance
function tirageChanceLoto() {
    let chance = Math.floor(Math.random() * Math.floor(10) + 1)

    return chance
}

// vérifie s'il y à un doublon dans le tirage du loto
function verifTirage(tirage) {
    for (let i = 1; i < 5; i++) {

        for (let j = i + 1; j < 6; j++) {

            if (tirage[i] == tirage[j]) {

                return false
            }
        }
    }
    return true
}

// identifie et stock dans une variable les nombres choisis par l'utilisateur dans la grille du loto
function saisieUtilisateurNombre() {
    let j = 1
    let nombre = stockIdNumeros()
    let saisieNombre = []

    for (let i = 1; i < 50; i++) {
        if (nombre[i].className == "checkboxNumClick") {
            saisieNombre[j] = i
            j += 1
        }
    }
    return saisieNombre
}

// identifie et stock dans une variable le numero choisis par l'utilisateur dans la grille du numéro chance
function saisieUtilisateurChance() {
    let chance = stockIdChance()
    let saisieChance

    for (let i = 1; i < 11; i++) {
        if (chance[i].className == "checkboxChaClick") {
            saisieChance = i
            return saisieChance
        }
    }
}

// compare le tirage du loto avec les nombres saisies par l'utilisateur
function comparaisonNombre(saisieNombre, tirageNombre) {
    let resultat = []

    for (let i = 1; i < 6; i++) {
        resultat[i] = 0
    }

    for (let i = 1; i < 6; i++) {
        for (let j = 1; j < 6; j++) {
            if (saisieNombre[i] == tirageNombre[j]) {
                resultat[j] = 1
            }
        }
    }
    return resultat

}

// compare le tirage du numéro chance avec le numéro chance saisie par l'utilisateur
function comparaisonChance(saisieChance, tirageChance) {
    let resultat = 0

    for (let i = 1; i < 11; i++) {
        if (saisieChance == tirageChance) {
            resultat = 1
            return resultat
        }
    }
    return resultat
}

// initialise le tableau de réponse pour l'utilisateur en affichant le tirage du loto et grise les numéros du loto qu'il n'a pas trouvé et laisse en claire les numeros du loto qu'il a trouvé
function tableauNombreloto(tableauNombre, tirage) {
    let texteNombre = "<p class='text'>Voici le tirage de la semaine.</p><table><tr>"

    for (let i = 1; i < 6; i++) {
        if (tableauNombre[i] == 1) {
            texteNombre += "<td><button class='resultatNumClair' id='resultatNum" + i + "'>" + tirage[i] + "</button></td>" //changement de classe 
        } else {
            texteNombre += "<td><button class='resultatNumGris' id='resultatNum" + i + "'>" + tirage[i] + "</button></td>" //changement de classe
        }
    }
    return texteNombre
}

// ajoute le numero chance dans le tableau de réponse pour l'utilisateur, grisé ou non en fonction de la saisie de l'utilisateur 
function tableauChanceloto(tableauChance, tirage) {
    let texteChance = ""

    if (tableauChance == 1) {
        texteChance = "<td><button class='resultatChaClair' id='resultatCha'>" + tirage + "</button></td>" //changement de classe
    } else {
        texteChance = "<td><button class='resultatChaGris' id='resultatCha'>" + tirage + "</button></td>" //changement de classe
    }
    texteChance += "</tr></table>"
    return texteChance
}

// Ecris le rang du tirage du loto
function texteRang(tableauNombre, tableauChance) {
    let txtRang = "<div id='rang'><p>"
    let nombreGagnant = 0
    let chanceGagnant = 0

    for (let i = 1; i < 6; i++) {
        if (tableauNombre[i] == 1) {
            nombreGagnant += 1
        }
    }
    if (tableauChance == 1) {
        chanceGagnant = 1
    }
    if ((nombreGagnant == 0 || nombreGagnant == 1) && chanceGagnant == 0) {
        txtRang += "Perdus."
    }
    if ((nombreGagnant == 0 || nombreGagnant == 1) && chanceGagnant == 1) {
        txtRang += "Vous auriez eu un tirage de rang 9."
    }
    if (nombreGagnant == 2 && chanceGagnant == 0) {
        txtRang += "Vous auriez eu un tirage de rang 8."
    }
    if (nombreGagnant == 2 && chanceGagnant == 1) {
        txtRang += "Vous auriez eu un tirage de rang 7."
    }
    if (nombreGagnant == 3 && chanceGagnant == 0) {
        txtRang += "Vous auriez eu un tirage de rang 6."
    }
    if (nombreGagnant == 3 && chanceGagnant == 1) {
        txtRang += "Vous auriez eu un tirage de rang 5."
    }
    if (nombreGagnant == 4 && chanceGagnant == 0) {
        txtRang += "Vous auriez eu un tirage de rang 4."
    }
    if (nombreGagnant == 4 && chanceGagnant == 1) {
        txtRang += "Vous auriez eu un tirage de rang 3."
    }
    if (nombreGagnant == 5 && chanceGagnant == 0) {
        txtRang += "Vous auriez eu un tirage de rang 2."
    }
    if (nombreGagnant == 5 && chanceGagnant == 1) {
        txtRang += "Bravo vous auriez eu un tirage de rang 1."
    }
    txtRang += "</p ></div >"
    return txtRang
}
//coeur de la simulation du temps total
function simulationTemps() {
    affichage.innerHTML = ""
    let saisieNombre = saisieUtilisateurNombre()
    let tirageNombre = tirageLoto()
    let tableauNombre = comparaisonNombre(saisieNombre, tirageNombre)

    while (!isgagnant(tableauNombre)) {
        k++
        tirageNombre = tirageLoto()
        tableauNombre = comparaisonNombre(saisieNombre, tirageNombre)
    }
    let saisieChance = saisieUtilisateurChance()
    let tirageChance = tirageChanceLoto()
    let tableauChance = comparaisonChance(saisieChance, tirageChance)
    let texteNombre = tableauNombrelotoSimulation(tableauNombre, tirageNombre, k)
    let texteChance = tableauChancelotoSimulation(tableauChance, tirageChance)
    let resultat = texteNombre + texteChance
    affichage.innerHTML = resultat
    k = 1
}

//control si le joueur à gagné ou non
function isgagnant(tableauNombre) {

    for (let i = 1; i < 6; i++) {
        if (tableauNombre[i] != 1) {
            return false
        }
    }
    return true
}

//construit l'html de réponse de la reponse pour l'utilisateur en fonction des nombres choisis par l'utilisateur
function tableauNombrelotoSimulation(tableau, tirage, k) {

    let texteNombre = "<p class='text'>A raison d'un tirage par semaine, votre combinaison est sortie après " + k + " semaines soit environ " + Math.floor(k / 52) + " ans.</p><div id='testz'><table><tr>"

    for (let i = 1; i < 6; i++) {
        if (tableau[i] == 1) {
            texteNombre += "<td><button class='resultatNumClair' id='resultatNum" + i + "'>" + tirage[i] + "</button></td>" //changement de classe 
        } else {
            texteNombre += "<td><button class='resultatNumGris' id='resultatNum" + i + "'>" + tirage[i] + "</button></td>" //changement de classe
        }
    }
    return texteNombre
}

//suite de l'html de réponse de la simulation pour l'utilisateur intégrant le numéro chance
function tableauChancelotoSimulation(tableau, tirage) {
    let texteChance = ""

    if (tableau == 1) {
        texteChance = "<td><button class='resultatChaClair' id='resultatCha'>" + tirage + "</button></td></tr></table></div><p class='text'>Vous auriez eu un tirage de rang 1.</p>" //changement de classe
    } else {
        texteChance = "<td><button class='resultatChaGris' id='resultatCha'>" + tirage + "</button></td></tr></table></div><p class='text'>Vous auriez eu un tirage de rang 2.</p>" //changement de classe
    }
    return texteChance
}

