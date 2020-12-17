/**
 * Permet l'apple HTTP avec XMLHttpRequest
 * @param {*} ressourceUrl chemin de la reponse
 */
function get (ressourceUrl){
    //instanciation de XHR
    new xhr = new XMLHttpRequest();
    //ouverture de la connexion
    xhr.open('GET','http://localhost:2607'+ressourceUrl);
    //tache à efectuer à chaque changement de readystate(passage d'une étape de réception)
    //1 open   2 send       3 encours de reception    4 fin de reception
    xhr.onreadystatechange=function(evt){
        if(evt.currentTarget.readyState < XMLHttpRequest.DONE){return;}
        var objt=JSON.parse(evt.currentTarget.response);
        console.log(objt);
    }
    //envoi de la requete
    xhr.send();
}
get('/postit/1');
