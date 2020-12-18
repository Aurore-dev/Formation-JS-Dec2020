// const moment = require("moment");
addEventListener('load', function (evt) {
    initialisationJS();
    document.querySelector('form').addEventListener('submit', formSubmitted);
    (new Crud(BASE_URL)).recuperer('/postit', function (mesPostIts) {
        console.log('jai fini de recevoir mes postit et voici la liste :', mesPostIts);
        mesPostIts.forEach(function (postit) {
            console.log(postit);
            createPostItByObject(postit);
        })

    });
});

function initialisationJS() {
    var jsload = document.querySelector('#jsload');
    jsload.innerHTML = 'mon <span style="font-weight:900">JS</span> est chargé !';
    jsload.style.backgroundColor = 'LIME';
}




function formSubmitted(evt) {
    evt.preventDefault();
    // console.log('mon formulaire est submit');
    // console.log(evt.target[0].value)
    // console.log(evt.target[1].value)
    // console.log(evt.target[2].value)
    // console.log(evt.target[3].value)

    var monFormulaire = document.forms['editor-form'];
    //var dateFormat=moment(monFormulaire['date'].value,'DD MM YYYY')

    var postit = {
        titre: monFormulaire["title"].value,
        datetime: evt.target[1].value + 'T' + evt.target[2].value,
        description: evt.target[3].value
    };
    console.log(postit);
    (new Crud(BASE_URL)).creer('/postit', postit, function (objSaved) {
        createPostItByObject(objSaved);
    });

}


/**
 * Fonction de création d'un post it ajoutdans la balise #list
 * @param {string} titre titre de la note
 * @param {string} date date de la note
 * @param {string} heure heure de la note
 * @param {string} description description de la note
 */
function createPostIt(titre, date, heure, description) {
    var postIt = document.createElement('div');

    postIt.classList.add('postit');

    postIt.innerHTML = '<div class="close"><img src="/img/croixVerte.png"/></div>\
    <div class="postit-titre">'+ titre + '</div>\
    date : <span class="datetime">'+ date + '</span> heure : <span class="datetime">' + heure + '</span>\
    <h2>Description</h2>'+ description;

    postIt.querySelector('.close img').addEventListener('click', deletePostIt);

    var liste = document.querySelector('#list');

    liste.append(postIt);
}

/**
 * Fonction de création d'un post it ajoutdans la balise #list par le biais d'un objet postit
 * @param {object} postitInput
 */
function createPostItByObject(postitInput) {
    var postIt = document.createElement('div');
    postIt.id = "postit-" + postitInput.id;
    postIt.classList.add('postit');
    postIt.addEventListener('click', putinformclickedpostit);

    postIt.innerHTML = '<div class="close"><img src="/img/croixVerte.png"/></div>\
    <div class="postit-titre">'+ postitInput.titre + '</div>\
    date : <span class="datetime">'+ postitInput.datetime.substring(0, 10) + '</span> heure : <span class="datetime">' + postitInput.datetime.substring(11) + '</span>\
    <h2>Description</h2>'+ postitInput.description;

    postIt.querySelector('.close img').addEventListener('click', deletePostIt);

    var liste = document.querySelector('#list');

    liste.append(postIt);
};

/**
 * Fonction de suppression du post it
 * @param {*} evt 
 */
function deletePostIt(evt) {
    //permet de ne pas faire l'evt click sur div postit qui est derriere
    evt.stopPropagation();
    // window.evt=evt;
    console.log('evenement lié à la suppression', evt);
    var domPostitId = evt.path[2].id.substring(7);
    (new Crud(BASE_URL)).supprimer('/postit/' + domPostitId, function () {
        evt.path[2].remove();
    });
    // Pouvait etre utiliser
    //  evt.path[2];
    // evt.currentTarget.parentElement.parentElement.remove();
};

function putinformclickedpostit(evt) {
    console.log('j\'ai double cliquer sur un postit', evt)

}
