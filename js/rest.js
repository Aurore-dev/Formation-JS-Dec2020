var BASE_URL='http://localhost:2607';

var Crud = function (baseUrl){

   /**
     * Zone d'exposition des fonctions en public
     * pour acces depuis l'exterieur de l'isntance
     */
    this.recuperer=_get;  
    this.creer=_post;  
    this.mettreAJour=_put;  
    this.supprimer=_remove; 

    /**
     * Permet l'apple HTTP avec XMLHttpRequest
     * @param {*} ressourceUrl chemin de la reponse
     */
    function _get (ressourceUrl,callback){
        //instanciation de XHR
        var xhr = new XMLHttpRequest();
        //ouverture de la connexion
        xhr.open('GET',baseUrl+ressourceUrl);
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
     * @param {function} callback  fonction de callback avec injection du retour
     */
    function _post(ressourceUrl,ressource,callback){
        var xhr = new XMLHttpRequest();
        xhr.open('POST',baseUrl+ressourceUrl);
        //specfication du type de contenu
        xhr.setRequestHeader('Content-Type','application/json');
        //specification de ce qui est attendu en retour
        xhr.setRequestHeader('Accept','application/json');
        xhr.onreadystatechange=function(evt){
            if(xhr.readyState < 4 || xhr.status!= 201){return;}
            console.log(JSON.parse(xhr.response));
            callback(JSON.parse(xhr.response));
        }
        //transformation en JSON des données
        xhr.send(JSON.stringify(ressource));
    }

    /**
     * Suppression d'une ressource sur ressource URL
     * @param {Uri} ressourceUrl
     * @param {fucntion} clbk fonction à executer à la fin de la suppression
     */
    function _remove(ressourceUrl,clbk){
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE',baseUrl+ressourceUrl);
        xhr.onreadystatechange=function(evt){
            if(xhr.readyState<4 || xhr.status != 200 ){return;}
            console.log(JSON.parse(xhr.response));
            clbk();
        } ;
        xhr.send();
    }

    /**
     * Permet l'updated'une ressource sur l'a ressourceUrl
     * @param {Uri} ressourceUrl chemin du post
     * @param {Object} ressource  data à envoyer
     */
    function _put(ressourceUrl,ressource){
        var xhr = new XMLHttpRequest();
        xhr.open('PUT',baseUrl+ressourceUrl);
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

  
}
