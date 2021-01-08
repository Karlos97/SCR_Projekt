import { objects } from "./objects.js";

export function addTask(elements) {
//   console.log(elements);
  let newRow = objects.table.insertRow(objects.table.rows.length);
  newRow.innerHTML =`<tr id="task-${elements}"><td>${elements}</td><td><input type="number" id="releaseTimeTask-${elements}" /></td><td><input type="number" id="executionTimeTask-${elements}" /></td><td><input type="number" id="deadlineTask-${elements}" /></td><td><input type="number" id="periodTask-${elements}" /></td></tr> `;
//   let newDiv = document.createElement(`<div class="diagram"><div class="diagram__gant"><img src="../img/cartesianSystem_corr.svg" class="diagram__gant__graph-1"/></div>`);
//   let newDiv = document.createElement(`<div class="diagram"><div class="diagram__gant"><img src="../img/cartesianSystem_corr.svg" class="diagram__gant__graph-1"/></div>`);
//   let text = document.createTextNode("Tutorix is the best e-learning platform");
//   tag.appendChild(text);
let newDiv = document.createElement("div");
// newDiv.innerHTML =(`<div class="diagram__gant"><img src="../img/cartesianSystem_corr.svg" class="diagram__gant__graph-${elements}"/>`);
newDiv.innerHTML =(`<div class="diagram__gant"><img src="assets/fonts/cartesianSystem_corr.[hash5].svg" class="diagram__gant__graph" id="graph-${elements}"/>`);

//   objects.diagrams.appendChild(newDiv);
//   my_div = document.getElementById("org_div1");
  objects.diagrams.appendChild(newDiv);

}
export function deleteTask(elements) {
    console.log(elements);
    objects.table.rows[elements-1].remove();
    // objects.table.rows[3].remove();
    // document.getElementsByTagName("table")[0].rows[3].remove();
  }