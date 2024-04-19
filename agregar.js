import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBccl7W-LF13zEgtosIfE5mRnn9hYTYYyo",
    authDomain: "colegiojp-555a0.firebaseapp.com",
    projectId: "colegiojp-555a0",
    storageBucket: "colegiojp-555a0.appspot.com",
    messagingSenderId: "708564417465",
    appId: "1:708564417465:web:268fe17501fea1df8d9468",
    measurementId: "G-5FM43TFTG0"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const firestore = getFirestore();
const imageList = document.getElementById('imageList');

// Obtén una referencia a la colección "fechas" en Firestore
const fotosCollection = collection(firestore, 'fechas');

document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    const tituloInput = document.getElementById('dia');
    const eventEndDateInput = document.getElementById('eventEndDate');
    const eventStartTimeInput = document.getElementById('eventStartTime');
    const eventEndTimeteInput = document.getElementById('eventEndTime');
    const eventLocationInput = document.getElementById('eventLocation');
    const uploadButton = document.getElementById('uploadButton');

    if (uploadButton) {
        uploadButton.addEventListener('click', subirImagen);
    }

    // Escucha cambios en la colección 'fechas' en tiempo real
    onSnapshot(fotosCollection, (snapshot) => {
        // Obtén los documentos de la colección 'fechas'
        const fechas = snapshot.docs.map(doc => doc.data());
        // Muestra todas las imágenes en la lista
        mostrarImagenesEnLista(fechas);
    });
});

async function subirImagen() {
    const fileInput = document.getElementById('fileInput');
    const tituloInput = document.getElementById('dia');
    const descripcionInput = document.getElementById('desc');
    const eventEndDateInput = document.getElementById('eventEndDate');
    const eventStartTimeInput = document.getElementById('eventStartTime');
    const eventEndTimeteInput = document.getElementById('eventEndTime');
    const eventLocationInput = document.getElementById('eventLocation');
    if (fileInput && fileInput.files.length > 0) {
        try {
            const file = fileInput.files[0];
            const fileName = file.name;
            const storageRef = ref(storage, `fechas/${fileName}`);
            await uploadBytes(storageRef, file);

            // Obtén la URL de descarga
            const downloadURL = await getDownloadURL(storageRef);

            // Agrega la URL y los datos asociados a la colección 'fechas' en Firestore
            await addDoc(fotosCollection, {
                url: downloadURL,
                fecha: tituloInput.value,
                descripcion: descripcionInput.value,
                fechacierre: eventEndDateInput.value,
                horainicio: eventStartTimeInput.value,
                horacierre: eventEndTimeteInput.value,
                lugar: eventLocationInput .value
            });

            // Limpiar los campos después de la carga
            fileInput.value = '';
            tituloInput.value = '';
            descripcionInput.value = '';
            eventEndDateInput.value = '';
            eventStartTimeInput.value = ''; 
            eventEndTimeteInput.value = '';
            eventLocationInput.value = '';
        
        
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            alert('Error al subir la imagen');
        }
    } else {
        alert('Por favor, selecciona una imagen');
    }
}

function mostrarImagenesEnLista(fechas) {
    const imageList = document.getElementById('imageList');

    if (imageList) {
        // Limpiar la lista antes de mostrar nuevas imágenes
        imageList.innerHTML = '';

        // Iterar sobre las imágenes y crear elementos de imagen, título y descripción
        fechas.forEach((foto) => {
            // Contenedor para cada elemento
            const container = document.createElement('div');
            container.classList.add('image-container');

            // Imagen
            const imgElement = document.createElement('img');
            imgElement.src = foto.url;
            imgElement.classList.add('uploaded-image');
            container.appendChild(imgElement);

            // fecha
            const tituloElement = document.createElement('p');
            tituloElement.textContent = `dia: ${foto.fecha}`;
            tituloElement.classList.add('image-title');
            container.appendChild(tituloElement);

            // Descripción
            const descripcionElement = document.createElement('p');
            descripcionElement.textContent = `desc: ${foto.descripcion}`;
            descripcionElement.classList.add('image-description');
            container.appendChild(descripcionElement);

                // fecha
                const cierreElement = document.createElement('p');
                cierreElement.textContent = `cierre: ${foto.cierre}`;
                cierreElement.classList.add('image-cierre');
                container.appendChild(cierreElement);
    
                // Descripción
                const horainicioElement = document.createElement('p');
                horainicioElement.textContent = `desc: ${foto.horainicio}`;
                horainicioElement.classList.add('image-horainicio');
                container.appendChild(horainicioElement);

                    // fecha
            const horafinElement = document.createElement('p');
            horafinElement.textContent = `dia: ${foto.horafin}`;
            horafinElement.classList.add('image-horafin');
            container.appendChild(horafinElement);

            // Descripción
            const lugarElement = document.createElement('p');
            lugarElement.textContent = `desc: ${foto.lugar}`;
            lugarElement.classList.add('image-lugar');
            container.appendChild(lugarElement);

            // Agregar el contenedor al imageList
            imageList.appendChild(container);
            container.appendChild(botonElement);
        });
    }
}
