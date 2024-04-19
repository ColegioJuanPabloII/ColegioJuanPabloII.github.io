firebase.initializeApp({
    apiKey: "AIzaSyBccl7W-LF13zEgtosIfE5mRnn9hYTYYyo",
    authDomain: "colegiojp-555a0.firebaseapp.com",
    projectId: "colegiojp-555a0",
    storageBucket: "colegiojp-555a0.appspot.com",
    messagingSenderId: "708564417465",
    appId: "1:708564417465:web:268fe17501fea1df8d9468",
    measurementId: "G-5FM43TFTG0"
});

var db = firebase.firestore()


// Función para leer el contenido de un archivo
function leerArchivo(archivo, callback) {
    var lector = new FileReader();

    lector.onload = function(evento) {
        callback(null, evento.target.result);
    };

    lector.onerror = function(evento) {
        callback(evento.target.error, null);
    };

    lector.readAsText(archivo);
}

// Función para escribir en un archivo
function escribirArchivo(contenido, nombreArchivo) {
    var blob = new Blob([contenido], { type: 'application/json' });
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Ejemplo de uso para leer un archivo
var input = document.createElement('input');
input.type = 'file';
input.accept = 'application/json';

input.onchange = function(evento) {
    var archivo = evento.target.files[0];
    
    leerArchivo(archivo, function(error, contenido) {
        if (error) {
            console.error('Error al leer el archivo:', error);
        } else {
            console.log('Contenido del archivo:', contenido);
        }
    });
};

document.body.appendChild(input);

