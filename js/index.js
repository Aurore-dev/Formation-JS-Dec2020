// const moment = require("moment");

addEventListener('load',function(evt){
    initialisationJS();
    document.querySelector('form').addEventListener('submit',formSubmitted);
});

function initialisationJS(){
    var jsload = document.querySelector('#jsload');
    jsload.innerHTML='mon <span style="font-weight:900">JS</span> est chargé !';
    jsload.style.backgroundColor='LIME';
}


function formSubmitted(evt){
    evt.preventDefault();
    console.log('mon formulaire est submit');
    console.log(evt.target[0].value)
    console.log(evt.target[1].value)
    console.log(evt.target[2].value)
    console.log(evt.target[3].value)
 
    var monFormulaire = document.forms['editor-form'];
    //var dateFormat=moment(monFormulaire['date'].value,'DD MM YYYY')
    createPostIt(
        monFormulaire['title'].value,
        monFormulaire['date'].value,
        monFormulaire['time'].value,
        monFormulaire['description'].value
    );
}


/**
 * Fonction de création d'un post it ajoutdans la balise #list
 * @param {string} titre titre de la note
 * @param {string} date date de la note
 * @param {string} heure heure de la note
 * @param {string} description description de la note
 */
function createPostIt(titre,date,heure,description){
    var postIt = document.createElement('div');

    postIt.classList.add('postit');

    postIt.innerHTML='<div class="close"><img src="/img/croixVerte.png"/></div>\
    <div class="postit-titre">'+titre+'</div>\
    date : <span class="datetime">'+date+'</span> heure : <span class="datetime">'+heure+'</span>\
    <h2>Description</h2>'+description;

    postIt.querySelector('.close img').addEventListener('click',deletePostIt);

    var liste= document.querySelector('#list');

    liste.append(postIt);
}

function deletePostIt (params){
    console.log('evenement lié à la suppression');
    
}
