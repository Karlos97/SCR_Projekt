import { objects } from "./objects.js";
//dodawanie zadania
export function addTask(elements) {
  let newRow = objects.table.insertRow(objects.table.rows.length);
  newRow.innerHTML = `<tr id="task-${elements}"><td>${elements}</td></td><td><input type="number" id="executionTimeTask-${elements}" /></td><td><input type="number" id="deadlineTask-${elements}" /></td><td><input type="number" id="periodTask-${elements}" /></td></tr> `;
  // newRow.addEventListener("change", (e) =>  {
    //   removeData(chart, remDescr, remVal);
    //   item.remove();
    //   totalValue();
    // console.log(e.value)
    // });
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `<div class="diagram__gant" id="graph-${elements}" ><img src="assets/fonts/cartesianSystem_corr.[hash5].svg" class="diagram__gant__graph"  />`;
  objects.diagrams.appendChild(newDiv);
  // addProcess(1, "process");
  // addProcess(1, "arrowUp");
  // addProcess(1, "gap");
  // addProcess(1, "flat");
  // addProcess(1, "arrowUp");
  // addProcess(1, "arrowDown");
  // let itemX = document.createElement("div");
  // itemX.className = "expenses__input__item--delete";
  // let itemXContent = document.createTextNode("x");
  // itemX.appendChild(itemXContent);

  // let remDescr = this.descr;
  // let remVal = this.val;
  // itemX.addEventListener("click", function () {
  //   removeData(chart, remDescr, remVal);
  //   item.remove();
  //   totalValue();
  // });
}
//usuwanie zadania
export function deleteTask(elements) {
  objects.table.rows[elements - 2].remove();
  objects.diagramsList[elements - 2].remove();
}
//dodwanie odpowiedniego bloczku do wykresu
export function addProcess(graphId, type) {
  let newDiv = document.createElement("div");
  if (type === "process") newDiv.className = "diagram__gant__process";
  if (type === "gap") newDiv.className = "diagram__gant__process-gap";
  if (type === "flat") newDiv.className = "diagram__gant__process-flat";
  if (type === "arrowUp") newDiv.className = "long-arrow-right-1";
  if (type === "arrowDown") newDiv.className = "long-arrow-right-2";
  document.getElementById(`graph-${graphId}`).appendChild(newDiv);
}
export function algorithmParams(table) {
  let params = new Array();
  for (let i = 0; i < 3; i++) {
    params[i] = new Array();
    for (let j = 1; j <= table.rows.length; j++) {
      switch (i) {
        case 0:
          params[i].push(
            document.getElementById(`executionTimeTask-${j}`).value
          );
          break;
        case 1:
          params[i].push(document.getElementById(`deadlineTask-${j}`).value);
          break;
        case 2:
          params[i].push(document.getElementById(`periodTask-${j}`).value);
          break;
      }
    }
  }
  return params;
}


