// import userExpensesInput from "./models/userExpensesInput.js";
// import { chart } from "./views/chart.js";
import { cloneDeep } from "lodash";
import { objects } from "./models/objects.js";
import {
  addTask,
  resetGraphs,
  deleteTask,
  algorithmParameters,
  showSchedule,
  hyperPeriod,
} from "./models/functions.js";

function graphView() {
  let parameters = algorithmParameters();
  if (parameters) {
    resetGraphs();
    showSchedule(objects.algorithmTypeInput.value, parameters);
  }
}

objects.btnDeleteTask.addEventListener("click", function () {
  if (objects.table.rows.length) deleteTask(objects.table.rows.length);
  resetGraphs();
});
objects.btnAddTask.addEventListener("click", function () {
  if (objects.table.rows.length < 4) {
    addTask(objects.table.rows.length);
    resetGraphs();
  }
});

objects.btnRandomTask.addEventListener("click", function () {
  let parameters;
  let max = 20;
  if (objects.table.rows.length >= 1) {
    for (let i = 1; i <= objects.table.rows.length; i++) {
      let execTime = Math.floor(Math.random() * (max - 1)) + 1;
      let deadline = Math.floor(Math.random() * (max - 1)) + 1;
      let period = Math.floor(Math.random() * (max - 1)) + 1;
      let priority = Math.floor(Math.random() * (max - 1)) + 1;

      period <= 2 ? (period = 5) : false;
      deadline === 1 ? (deadline = 2) : false;
      deadline >= period ? (deadline = period - 1) : false;
      execTime >= deadline ? (execTime = deadline - 1) : false;
      priority <= 0 ? (priority = 1) : false;
      execTime <= 0 ? (execTime = 1) : false;
      deadline <= 0 ? (deadline = 1) : false;
      document.getElementById(`executionTimeTask-${i}`).value = execTime;
      document.getElementById(`deadLineTask-${i}`).value = deadline;
      document.getElementById(`periodTask-${i}`).value = period;
      document.getElementById(`priorityTask-${i}`).value = priority;
    }
    parameters = algorithmParameters();
    graphView();
    hyperPeriod(parameters);
  }
});

objects.algorithmTypeInput.addEventListener("change", () => {
  graphView();
});

document.getElementsByTagName("tbody")[0].addEventListener("change", () => {
  let parameters = algorithmParameters();
  graphView();
  hyperPeriod(parameters);
});

// document.getElementById("btn-test").addEventListener("click", function () {
//   let parameters = algorithmParameters();
//   hyperPeriod(parameters);

// })
