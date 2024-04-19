
firebase.initializeApp({
    apiKey: "AIzaSyBccl7W-LF13zEgtosIfE5mRnn9hYTYYyo",
    authDomain: "colegiojp-555a0.firebaseapp.com",
    projectId: "colegiojp-555a0",
    storageBucket: "colegiojp-555a0.appspot.com",
    messagingSenderId: "708564417465",
    appId: "1:708564417465:web:268fe17501fea1df8d9468",
    measurementId: "G-5FM43TFTG0"
});

// Obtener una referencia a la base de datos Firestore


var db = firebase.firestore();
var tabla = document.getElementById(`tabla`);

db
    .collection("fechas")
    .onSnapshot((querySnapshot) => {
        tabla.innerHTML = ``;
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().dia}`);
            tabla.innerHTML += `
            <tr class="bg-light">
           <th scope="row">${doc
                .data()
                .descripcion}</th>
<td>${doc
                .data()
                .fecha}</td>
<td>
    <img src="${doc
                .data()
                .url}" alt="imagen" style="width:90px"></td>
   
    <td>
    <button onclick="eliminar('${doc
                .id}')" style="border: none; background: none; padding: 0;">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
        
    </button>
</td>
       
    <td>
    <button id="btnEditar" onclick="editar(
                '${doc.id}'
                ,'${doc.data().descripcion}',
                '${doc.data().fecha}')"
                 style="border: none; background: none; padding: 0;"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>
    </button>
</td>
    </tr>
        `;
        });
    });

//borrar documentos
function eliminar(id) {
    db
        .collection("fechas")
        .doc(id)
        .delete()
        .then(function () {
            console.log("Document successfully deleted!");
        })
        .catch(function (error) {
            console.error("Error removing document:", error);
        });
}


function editar(id, descripcion, fecha) {
    // Llenar el formulario modal con los datos actuales
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('fecha').value = fecha;

    // Abrir el modal
    var modal = new bootstrap.Modal(document.getElementById('MyModal'));
    modal.show();

    // Función para manejar el clic en el botón para guardar los cambios
    var botonGuardar = document.getElementById('guardar');
    botonGuardar.onclick = function() {
        // Obtener los nuevos datos del formulario modal
        var nuevaDescripcion = document.getElementById('descripcion').value;
        var nuevaFecha = document.getElementById('fecha').value;

        // Actualizar el documento en Firestore con los nuevos datos
        var documentoRef = db.collection("fechas").doc(id);
        return documentoRef.update({
            descripcion: nuevaDescripcion,
            fecha: nuevaFecha
        })
        .then(function() {
            console.log("Documento actualizado exitosamente!");
            // Limpiar el formulario modal después de guardar los cambios
            document.getElementById('descripcion').value = '';
            document.getElementById('fecha').value = '';
            // Cerrar el modal
            modal.hide();
        })
        .catch(function(error) {
            console.error("Error actualizando documento: ", error);
        });
    }
}