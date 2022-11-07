
//evento de cuando se carga la pagina esto es igual al window.onload
document.addEventListener("DOMContentLoad",function(){
    //si no permite las notificaciones el navegador con el que se abre el archivo
    if(!Notification){
        alert("No soportado Notificaciones en eeste navegador")
        return;
    }
    //si no da permiso el usuario para dar la notificacion
    if(Notification.permission !=="granted")
    {
        Notification.requestPermission();
    }
}
,false);
//funcion de notificar, que notifica al usuario que el sitio quere enviarle notificaciones, y si quiere aceptarlas,
//al principio de la pagina
function notificar(){
    //si aun no a dado permiso se le vuelve a pedir que si quiere activarlas
    if(Notification.permission !=="granted"){
        Notification.requestPermission();
    }
    //si a dado permiso enviamos la notificacion y se la enviamos con el mismo icono que el marker
    else{
      var notificacion= new Notification ("TITULO NOTIFICACION",{
        icon: icono,
        body:"Mensaje de la notificación",
      });
      //si abrimos la notificacion nos llevara a la pagina de informatica de fernando
      notificacion.onclick=function(){
        open("http://www.informaticasc2.com/Gyncana/");
      }
    }
}
