let el, i;
let data = [
  { fecha: "06/01/2024", description: "Reunion de padres" },
  { fecha: "09/02/2024", description: "Convivio de bienvenida" },
  { fecha: "12/03/2024", description: "Excursión de primaria 6° A" },
  { fecha: "07/04/2024", description: "Graduacion de alumnos" }
];
let panel = document.querySelector("#panel");


function clearForm() {
  document.querySelector("#dia").value = "";
  document.querySelector("#desc").value = "";
}

function renderItem() {

  panel.textContent = "";
  data.forEach(x => {
    el = document.createElement("option");
    el.innerText = `${x.fecha} ${x.description}`;
    panel.append(el);
  });
}

function create() {
  let fn = document.querySelector("#dia").value;
  let ln = document.querySelector("#desc").value;
  data = [...data, { fecha: fn, description: ln }];
  clearForm();
  console.log(data)
  renderItem();
}
// #fname= dia   lname= desc
function panelClick() {
  i = panel.selectedIndex;
  document.querySelector("#dia").value = data[i].fecha;
  document.querySelector("#desc").value = data[i].description;
}

function update() {
  data[i].fecha = document.querySelector("#dia").value;
  data[i].description = document.querySelector("#desc").value;
  renderItem();
}

function deleteItem() {
  data.splice(i, 1);
  renderItem();
}

 renderItem();