var lastID = 0;
// var descripteurDInterval;

// const moment = require("moment");
addEventListener('load', function (evt) {
    initialisationJS();
    document.querySelector('form').addEventListener('submit', formSubmitted);
    document.querySelector('form').addEventListener('reset', formReset);
    document.forms['editor-form']['date'].value = (new Date()).toISOString().substring(0, 10);
    document.forms['editor-form']['time'].value = (new Date()).toISOString().substring(11);
    // pullingFunction();
    // descripteurDInterval=setInterval(pullingFunction,5000);
    (new Crud(BASE_URL)).recuperer('/postit', function (mesPostIts) {
        console.log('jai fini de recevoir mes postit et voici la liste :', mesPostIts);
        mesPostIts.forEach(function (postit) {
            if (lastID < postit.id) {
                lastID = postit.id;
            }
            console.log(postit);
            createPostItByObject(postit);
        })

    });
    //suppression avant car maintenant rechergement tous les 5secondes si notes ajouter

});

function initialisationJS() {
    var jsload = document.querySelector('#jsload');
    jsload.innerHTML = 'mon <span style="font-weight:900">JS</span> est chargé !';
    jsload.style.backgroundColor = 'LIME';
}

//var formReset=function(evt){...}
/**
 * reinitialiser meme l'id 
 * @param {*} evt 
 */
const formReset = (evt) => {
    const form = document.forms['editor-form'];
    // evt.currentTarget["id"].value="";
    for (let i = 0; i < form.length; i++) {
        if (form[i].type !== 'reset' && form[i].type !== 'submit') {
            form[i].value = '';
        }
    }
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
        if (undefined !== postit.id) {
            document.querySelector('#postit-' + postit.id).remove();
        }
        createPostItByObject(objSaved);
        monFormulaire.reset();
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
    // if(lastID<postit.id){lastID=postitInput.id}
    var postIt = document.createElement('div');
    postIt.id = "postit-" + postitInput.id;
    postIt.classList.add('postit');
    postIt.addEventListener('click', putinformclickedpostit);

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

};

// function pullingFunction(){
//     const lastIDPlus1=lastID+1;
//     // (new Crud(BASE_URL)).recuperer('postit?id_gte='+(lastID+1),)
//      (new Crud(BASE_URL)).recuperer('postit?id_gte='+lastIDPlus1,function listeDesPostit(){
//          listeDesPostit.map((element,index,function listeOrigine1(){
//              lastID=(lastId<element.id?element.id:lastID);
//              createPostItByObject(element);
//          }))

//      }
// };
/**
 * Fonction pour recuperer les notes à partir de la valeur d'un id lastid
 */

//  function getLastIdInDom(){
//      lastID=-1;
//      const listeChildren=document.querySelector('#liste').children;
//      for(domPostit in listeChildren){
//          if(lastID<parseInt(domPostit.id.substring(7))){
//              lastID=domPostit.id.substring(7);
//          }
//      }
//  };
// const pullingFunction = () => {
//     getLastIdInDom();    
//     const lastIdPlus1 = lastID + 1;
//     (new Crud(BASE_URL)).recuperer('/postit?id_gte=' + lastIdPlus1, (listeDesPostIt) => {
//         listeDesPostIt.map((element) => {
//             lastID = (lastID < element.id ? element.id : lastID);
//             createPostitByObject(element);
//         });
//     });
// }
