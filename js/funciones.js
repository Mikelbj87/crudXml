
//hasta que no carga el fichero html no se ejecuta esto
onload = function () {
    //funcion cargarXml, para que se visualicen objetos guardados en el archivo datos.js, si no la llamamos, el 
    //registro de empresas del arary datos estara vacio
    cargarXml();
    //evento de cuando clicamos en el boton siguiente de una forma
    document.getElementById("bSiguiente").addEventListener("click", registroSiguiente, false);
    //evento de cuando clicamos el registro anterior de manera distinta
    bAnterior.addEventListener("click", registroAnterior, false);
    //evento para cuando clicamos el boton modificar
    document.getElementById("bModificar").addEventListener("click", registroModificar, false);
    //evento para cuando clicamos el boton grabar
    document.getElementById("bGrabar").addEventListener("click", registroGrabar, false);
    //evento para cuando clicamos el boton borrar 
    document.getElementById("bBorrar").addEventListener("click", registroBorrar, false);
    //evento para cuando clicamos el boton tabla
    document.getElementById("bTabla").addEventListener("click", visualizaTabla, false);
    //inicializamos la funcion inicio
    inicio();
    //mandamos mensaje al usuario al entrar en la pagina
    alert("Gestion de Empresas de Aranda");
}
//nuevo array datos aqui guardamos objetos de tipos datos libro
let datos = new Array();
//posicion iniciada a 0 (la del array)
let posicion = 0;

//funcion constructor de objeto empresa
function datosEmpresa(Nombre, Direccion, Telefono, Localidad, latitud_longitud) {
    //propiaedades del objeto empresa
    this.Nombre = Nombre;
    this.Direccion = Direccion;
    this.Telefono = Telefono;
    this.Localidad = Localidad;
    this.latitud_longitud = latitud_longitud;
    //llamamos a la funcion guardar datos para pasarselos a la propiedad guarda, para que cada vez que registremos
    //una empresa nueva se guarden los datos automaticamente
    this.guarda = guardarDatos;
}

//funcion guardarDatos, sirve para guardar los datos de la empresa en el array datos
function guardarDatos() {
    //para guardar los las propiedades de cada registro datosEmpresa en el array datos utilizamos el metodo push
    //propia de los arrays
    datos.push(this);
}

//funcion cargarXml, para que se visualicen objetos guardados en el archivo datos.js
function cargarXml() {
    //creamos la variable codigo, y llamamos a DOMparser, para que transforme un documento XML a HTML
    let codigo = new DOMParser();
    //primero en la variable myXml metemos mediante el metodo parseFromString al que le damos la variable datosFichero
    //que se encuentra en el archivo datos.js y le decimos que es de tipo xml-texto
    let myXml = codigo.parseFromString(datosFichero, "text/xml")
    //creamos un array para cada campo de registro
    let anombre = new Array();
    let atelefono = new Array();
    let adireccion = new Array();
    let alocalidad = new Array();
    let alatitud_longitud = new Array();
    //separamos cada parte de cada array mediante la funcion getElementsByTagName, ya que en el texto de datos.js los
    //registros estan separados con etiquetas de cada campo y almacenamos todos los registros de cada tipo en cada
    //arrayd e su tipo
    anombre = myXml.getElementsByTagName("Nombre");
    atelefono = myXml.getElementsByTagName("Telefono");
    adireccion = myXml.getElementsByTagName("Direccion");
    alocalidad = myXml.getElementsByTagName("Localidad");
    alatitud_longitud = myXml.getElementsByTagName("latitud_longitud");

    //bucle for para recorrer todos los registros de cada array
    for (let i = 0; i < anombre.length; i++) {
        //evariable dato, en la que creamos un nuevo registro por cada posiscion de i
        let dato = new datosEmpresa(
            //extraemos cada registro de cada array que se encuentre en la posicion i y se lo añadimos a dato al final
            anombre.item(i).firstChild.nodeValue,
            adireccion.item(i).firstChild.nodeValue,
            atelefono.item(i).firstChild.nodeValue,
            alocalidad.item(i).firstChild.nodeValue,
            alatitud_longitud.item(i).firstChild.nodeValue,)
            //llamamos a la propiedad guarda del objeto datosEmpresa para que, mediante el metodo push guarde un nuevo registro
            //de empresa, y asi hasta que acabe con todos los datos del archivo datos.js
        dato.guarda();
    }
    //pasamos la posicion a 0
    posicion = 0;
    //llamamos a la funcion visualiza para que se visualice el objeto creado en las cajas en la posicion en la que estamos
    visualiza(datos[0]);
    //llamamos a la funcion notificar que esta en el archivo notificaciones.js, para que nada mas se cargue la pagina
    //nos pregunte si queremos que nos envie notificaciones
    notificar()
}

//funcion registroSiguiente, para ir visualizando la siguiente empresa del array datos
function registroSiguiente() {
    //aumentamos la posicion en 1
    posicion++;
    //condicional if en donde preguntamos que si la posicion es mayor a la longitud del array menos 1 para que nunca
    //sea mayor, vuelva  ala posicion 0, asi saltara del ultimo al primero
    if (posicion > datos.length - 1) { posicion = 0; }
    //capturamos la posible exception de superar la longitud del array y llamamos a la funcion visualiza a la que
    //damos el array datos en la posicion en la que nos encontremos
    try {
        visualiza(datos[posicion]);
        //capturando exception de array, mandamos unmensaje al pie de pagina de error
    } catch (Exception) {
        document.querySelector("footer p").innerHTML = "<b> Tabla sin registros </b>";
    }
}

//funcion registrro anterior, es igual que la de registroSiguiente pero funciona al revés
function registroAnterior() {
    //disminuimos la posicion en 1
    posicion--;
    //si la posicion es menor a 0 volvemos al ultimo registro, para que no de error, ya que un array
    //no tiene posicion -1
    if (posicion < 0) { posicion = datos.length - 1; }
    //llamamos a la funcion visualiza y le damos el array datos en la posicion en la que nos encontremos
    visualiza(datos[posicion]);
}

//funcion modificar, para poder modificar registros ya guardados en el array
function registroModificar() {
    //guardamos en la variable registro el array datos con la posicion en la que nos encontramos
    let registro = datos[posicion];
    //en este nuevo objeto registro, que es de tipo datos empresa le damos el nuevo valor que queramos en cada campo
    registro.Nombre = iNombre.value;
    registro.Telefono = Telefono.value;
    registro.Direccion = Direccion.value;
    registro.Localidad = Localidad.value;
    registro.latitud_longitud = latitud_longitud.value;
    //por ultimo guardamos registro en el array datos, en la posicion en la que estamos para que se superpongan los datos 
    //de ahora sobre los datos de antes
    datos[posicion] = registro;
}

//funcion registroGrabar, en la que guardamos los datos de un nuevo registro
function registroGrabar() {
    //en la variable tituloBoton colocamos el id bGrabar 
    let tituloBoton = document.getElementById("bGrabar");
    //si el texto del boton bGrabar es nuevo se borran los datos que contengan todas las cajas de los campos
    if (tituloBoton.innerText == "Nuevo") {
        //borro la informacion de las cajas de texto
        iNombre.value = "";
        Telefono.value = "";
        Direccion.value = "";
        Localidad.value = "";
        latitud_longitud.value = "";
        //cuando le damos a nuevo nos lleva directamente a la caja de texto del Nombre con la funcion focus
        iNombre.focus();
        //despues mediante la funcion innerText metemos el texto Grabar en el texto del boton bGrabar
        //para que en el botón en vez de poner nuevo, ponga grabar
        tituloBoton.innerText = "Grabar";
        //si en el boton no pone nuevo y ya pone grabar
    } else {
        //grabar el registro nuevo en el objeto dato, que es de tipo datosEmpresa
        let dato = new datosEmpresa(
            iNombre.value,
            Telefono.value,
            Direccion.value,
            Localidad.value,
            latitud_longitud.value,)
        //llamamos a la funcion guarda y le damos el objeto nuevo dato, que sera un nuevo registro
        // al final del array datos
        dato.guarda();
        //despues de guardar el nuevo registro el boton vuelve a mostrarse como nuevo en vez de grabar
        tituloBoton.innerText = "Nuevo";
    }
}

//funcion registroBorrar que sirve para borrar un registro del array datos
function registroBorrar() {
    //borramos el registro en el que nos encontremos del array, mediante la funcion splice, a la que pasamos
    //la posicion en la que nos encontramos y el numero de elementos del array que queremos borrar, en este caso
    //uno, en el que nos encontramos
    try {
        var datos2 = datos.splice(posicion, 1);
        //capturamos la posible exception en caso de que no se pueda borrar un registro
    } catch (Exception) {
        //mandaremos un mensaje de error de borrado al pie de texto de los comentarios y volveremos mediante return
        document.querySelector("footer p").innerText = "Error de borrado";
        return;
    }
    //si el registro es borrado correctamente mandaremos el mensaje de exito al pie de texto de los comentarios
    document.querySelector("footer p").innerText = "Registro borrado con exito";
    //llamamos a la funcion registroSiguiente para que en pantalla se visualice el seguiente registro al que
    //hemos borrado
    registroSiguiente();
}

//funcion visualizar para que se visualicen en las cajas los campos del registro en el que estemos
function visualiza(registro) {
    iNombre.value = registro.Nombre;
    Telefono.value = registro.Telefono;
    Direccion.value = registro.Direccion;
    Localidad.value = registro.Localidad;
    latitud_longitud.value = registro.latitud_longitud;
}

//funcion visualizar tabla, para que en la parte inferior aparezca una tabla con los registros de las empresas que tenemos
function visualizaTabla() {
    //inicializamos una constante datatable el la que instanciamos un nuevo objeto de tipo table(tabla) que se llama
    //datatable tambien en el archivo HTML
    const datatable = new DataTable("#datatable", {
        //al objeto datatable le decimos los parametros para que se genere el tipo de tabla que nosotros necesitamos
        columns: [{
            name: "Nombre",
            id: "Nombre",
            editable: true,
            resizable: false,
            sortable: true,
            focusable: false,
            dropdown: false,
            width: 15,
            format: (value) => {
                return "<input type= 'text'  value=" + value + "><button>"
            }
            //le pasamos los camposque queremos que salgan en la tabla
        }, 'Telefono', 'Direccion', 'Localidad', 'latitud_longitud'],
        //le decimos a la tabla que los datos les saque del array datos, en donde tenemos guardados los registros
        data: datos
    });

}

//Aqui empieza la parte relacionada con google maps

//Creamos una variable map, y una longitud y latitud que son las del centro de Aranda de Duero
let map;
let latitud = 41.67140557977592;
let longitud = -3.6887980705687906;
//variable ll en la que introducimos un objeto Google Maps y a la que pasamos la latitud y longitud de Aranda
var ll = new google.maps.LatLng(latitud, longitud);
//llamamos a la funcion leeDireccion, a la que pasamos la variable ll con el mapa
leeDireccion(ll);
//funcion inicio que carga el mapa de google maps y genera el evento de hacer clic en el mapa
function inicio() {
    //creamos un objeto mapa dentro de la variable map y mediante la funcion Map le damos las caracteristicas al 
    //mapa que nosostros queramos
    map = new google.maps.Map(
        //buscamos el id map_canvas del HTML
        document.getElementById('map_canvas'), {
        // En el mapa se visualiza Aranda
        center: new google.maps.LatLng(latitud, longitud),
        // Zoom del mapa
        zoom: 17,
        // forma del cursor
        draggableCursor: 'auto', 
        draggingCursor: 'crosshair',
        // tipo de mapa
        mapTypeId: google.maps.MapTypeId.SATELLITE 
    });

    //evento para cuando hacemos click en una posicion del mapa
    google.maps.event.addListener(map, 'click', function (event) {
        //Me devuelve latitud y longitud
        datolatitud_longitud = event.latLng.toString();
        //esta linea nos copia la latitud/longitud en la caja
        latitud_longitud.value = datolatitud_longitud;
        //aqui clavamos la direccion en la caja de Direccion, llamando a la funcion leeDireccion
        leeDireccion(event.latLng);
        //variable icono a la que le damos las caracteristicas que nosostros queramos, tamaño y
        //seleccionamos la imagen de imagenes que queremos que se muestre como marcador
        var icono = {
            url: "./imagenes/Logo.png", // url
            scaledSize: new google.maps.Size(25, 25), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0) // ancho
        };
        //creamos la variable marker, que es un nuevo marcador de google maps, y le damos caracteristicas
        //le damos como icon el icono previamente creado, le damos el mapa map y de nombre pepino
        marker = new google.maps.Marker({
            position: event.latLng,
            icon: icono,
            map: map,
            nombre: 'Pepino'
        });
        //evento al hacer click en el icono del marcador
        google.maps.event.addListener(marker, 'click', function () {
            //recibimos un mensaje tipo alert que nos informa de la direccion en la que hemos hecho click
            alert(Direccion.value);
        });
        //llamamos a la funcion leeDireccion a la que pasamos la longitud y latitud
        leeDireccion(event.latLng);
    });
}

//funcion leeDireccion que llama a funciones de google que nos devuelven la posicion del click
function leeDireccion(latlng) {
    //creamos una variable geocoder y la asignamos un nuevo objeto geocoder de google maps
    geocoder = new google.maps.Geocoder();
    //Si la latitud y la longitud no son null
    if (latlng != null) {
        //el objeto geocoder tiene funciones que devuelven la latitud y la longitud y las devuelven en un objeto
        //tipo array
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    //llamamos a la funcion muestraDireccion
                    MuestraDireccion(latlng, results[0].formatted_address)
                    //en caso de no encontrar resultados
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    }
}

//funcion muestraDireccion a la que pasamos el evento de clicar y nos muestra la direccion y las cooredenadas en sus
//correspondientes cajas
function MuestraDireccion(latlng, direccion) {
    //guardamos la direccion en la caja de direccion y las coordenadas en la caja de las coordenadas separadas por coma
    Direccion.value = direccion;
    latitud_longitud.value = latlng.lat() + "," + latlng.lng();
}





