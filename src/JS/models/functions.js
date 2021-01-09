import { objects } from "./objects.js";

export function addTask(elements) {
  let newRow = objects.table.insertRow(objects.table.rows.length);
  newRow.innerHTML = `<tr id="task-${elements}"><td>${elements}</td><td><input type="number" id="releaseTimeTask-${elements}" /></td><td><input type="number" id="executionTimeTask-${elements}" /></td><td><input type="number" id="deadlineTask-${elements}" /></td><td><input type="number" id="periodTask-${elements}" /></td></tr> `;
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `<div class="diagram__gant" id="graph-${elements}" ><img src="assets/fonts/cartesianSystem_corr.[hash5].svg" class="diagram__gant__graph"  />`;
  objects.diagrams.appendChild(newDiv);
  addProcess(1,"process");
  addProcess(1,"arrowUp");
  addProcess(1,"gap");
  addProcess(1,"flat");
  addProcess(1,"arrowUp");
  addProcess(1,"arrowDown");
}
export function deleteTask(elements) {
  objects.table.rows[elements - 1].remove();
  objects.diagramsList[elements - 2].remove();
}

export function addProcess(graphId,type) {
  let newDiv = document.createElement("div");
  if(type === "process" ) newDiv.className = "diagram__gant__process"
  if(type === "gap" ) newDiv.className = "diagram__gant__process-gap"
  if(type === "flat" ) newDiv.className = "diagram__gant__process-flat"
  if(type === "arrowUp" ) newDiv.className = "long-arrow-right-1"
  if(type === "arrowDown" ) newDiv.className = "long-arrow-right-2"
  document.getElementById(`graph-${graphId}`).appendChild(newDiv);
}


/*

<div class="diagram__gant__process-1"></div>
<div class="long-arrow-right-1"></div>
<div class="diagram__gant__process__gap-1"></div>
<div class="long-arrow-right-1"></div>
<div class="long-arrow-right-2"></div> */