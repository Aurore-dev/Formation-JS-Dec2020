// const moment = require("moment");
addEventListener('load', function (evt) {
    initialisationJS();
    document.querySelector('form').addEventListener('submit', formSubmitted);
    // document.forms['editor-form']['date'].value=(new Date()).toISOString().substring.substring(0,10);
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
        datetime: monFormulaire["date"].value + 'T' + monFormulaire["time"].value,
        description: monFormulaire["description"].value
    };
    if (monFormulaire["id"].value !== '') {
        postit.id = monFormulaire["id"].value;
    };
    (new Crud(BASE_URL)).envoiRessource('/postit', postit, function (objSaved) {
        if (undefined!==postit.id){
            document.querySelector('#postit-'+postit.id).remove();
        }
        createPostItByObject(objSaved);
   });
   
};

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
    postIt.addEventListener('dblclick', putinformclickedpostit);

    postIt.innerHTML = '<div class="close"><img src="/img/croixVerte.png"/></div>\
    <div class="postit-titre">'+ postitInput.titre + '</div>\
    date : <span class="datetime postit-date">'+ postitInput.datetime.substring(0, 10) + '</span> heure : <span class="datetime postit-heure">' + postitInput.datetime.substring(11) + '</span>\
    <h2>Description</h2><div class="postit-description">'+ postitInput.description + '</div>';

    postIt.querySelector('.close img').addEventListener('click', deletePostIt);

    var liste = document.querySelector('#list');

    liste.append(postIt);
};

/**
 * Fonction de suppression du post it
 * @param {*} evt 
 */
function deletePostIt(evt) {
    //permet de ne pas faire l'evt click sur div postit qui est derriere car click si dblclick sur post it cela ne seert à rien
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
    console.log(document.querySelector('.postit'));
    var dompostit = evt.currentTarget;
    console.log(
        dompostit.id.substring(7),
        dompostit.querySelector('.postit-titre').innerText,
        dompostit.querySelector('.postit-date').innerText,
        dompostit.querySelector('.postit-heure').innerText,
        dompostit.querySelector('.postit-description').innerText
    );
    console.log(document.forms['editor-form']);
    document.forms['editor-form']['id'].value = dompostit.id.substring(7);
    document.forms['editor-form']['title'].value = dompostit.querySelector('.postit-titre').innerText;
    document.forms['editor-form']['date'].value = dompostit.querySelector('.postit-date').innerText;
    document.forms['editor-form']['time'].value = dompostit.querySelector('.postit-heure').innerText;
    document.forms['editor-form']['description'].value = dompostit.querySelector('.postit-description').innerText;

}
