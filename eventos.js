
firebase.initializeApp({
    apiKey: "AIzaSyBccl7W-LF13zEgtosIfE5mRnn9hYTYYyo",
    authDomain: "colegiojp-555a0.firebaseapp.com",
    projectId: "colegiojp-555a0",
    storageBucket: "colegiojp-555a0.appspot.com",
    messagingSenderId: "708564417465",
    appId: "1:708564417465:web:268fe17501fea1df8d9468",
    measurementId: "G-5FM43TFTG0"
});

var db = firebase.firestore();
var tabla = document.getElementById(`tabla2`);
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
    </tr>
    `;
    });
});


