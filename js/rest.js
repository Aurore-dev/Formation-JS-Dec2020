var BASE_URL='http://localhost:2607';

var Crud = function (baseurl){

    /**
     * Permet l'apple HTTP avec XMLHttpRequest
     * @param {*} ressourceUrl chemin de la reponse
     */
    function get (ressourceUrl,callback){
        //instanciation de XHR
        var xhr = new XMLHttpRequest();
        //ouverture de la connexion
        xhr.open('GET',baseurl+ressourceUrl);
        //tache à efectuer à chaque changement de readystate(passage d'une étape de réception)
        //1 open   2 send       3 encours de reception    4 fin de reception
        xhr.onreadystatechange=function(evt){
            if(evt.currentTarget.readyState < XMLHttpRequest.DONE){return;}
            var objt=JSON.parse(evt.currentTarget.response);
            console.log(objt);
            callback(objt);
        }
        //envoi de la requete
        xhr.send();
    }

    /**
     * Permet l'envoi en post d'une ressource sur l'a ressourceUrl
     * @param {Uri} ressourceUrl chemin du post
     * @param {Object} ressource  data à envoyer
     */
    function post(ressourceUrl,ressource){
        var xhr = new XMLHttpRequest();
        xhr.open('POST',baseurl+ressourceUrl);
        //specfication du type de contenu
        xhr.setRequestHeader('Content-Type','application/json');
        //specification de ce qui est attendu en retour
        xhr.setRequestHeader('Accept','application/json');
        xhr.onreadystatechange=function(evt){
            if(xhr.readyState < 4){return;}
            console.log(JSON.parse(xhr.response));
        }
        //transformation en JSON des données
        xhr.send(JSON.stringify(ressource));
    }

    /**
     * Suppression d'une ressource sur ressource URL
     * @param {*} ressourceUrl 
     */
    function remove(ressourceUrl){
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE',baseurl+ressourceUrl);
        xhr.onreadystatechange=function(evt){
            if(xhr.readyState<4){return;}
            console.log(JSON.parse(xhr.response));
            xhr.send();
        }
    }

    /**
     * Permet l'updated'une ressource sur l'a ressourceUrl
     * @param {Uri} ressourceUrl chemin du post
     * @param {Object} ressource  data à envoyer
     */
    function put(ressourceUrl,ressource){
        var xhr = new XMLHttpRequest();
        xhr.open('PUT',baseurl+ressourceUrl);
        //specfication du type de contenu
        xhr.setRequestHeader('Content-Type','application/json');
        //specification de ce qui est attendu en retour
        xhr.setRequestHeader('Accept','application/json');
        xhr.onreadystatechange=function(evt){
            if(xhr.readyState<4){return;}
            console.log(JSON.parse(xhr.response));
        }
        //transformation en JSON des données
        xhr.send(JSON.stringify(ressource));
    }

    /**
     * Zone d'exposition des focntions en public
     * pour acces depuis l'exterieur de l'isntance
     */
    this.recuperer=get;  
    this.creer=post;  
    this.mettreAJour=put;  
    this.supprimer=remove;  
}
