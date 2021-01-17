import { objects } from "./objects.js";

//Task addition
export function addTask(elements) {
  let newRow = objects.table.insertRow(objects.table.rows.length);
  elements += 1;
  newRow.innerHTML = `<tr id="task-${elements}"><td>${elements}</td></td><td><input type="number" id="executionTimeTask-${elements}" /></td><td><input type="number" id="deadLineTask-${elements}" /></td><td><input type="number" id="periodTask-${elements}" /></td><td><input type="number" id="priorityTask-${elements}" /></td></tr> `;
  addGraph(elements);
}
export function addGraph(id) {
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `<div class="diagram__gant" id="graph-${id}" ><img src="assets/fonts/cartesianSystem_corr.[hash5].svg" class="diagram__gant__graph"  />`;
  // newDiv.innerHTML = `<div class="diagram__gant" id="graph-${id}" ><img src="assets/fonts/cartesianSystem_corr.svg" class="diagram__gant__graph"  />`;
  // newDiv.innerHTML = `<div class="diagram__gant" id="graph-${id}" ><img src="../../../img/cartesianSystem_corr.svg" class="diagram__gant__graph"  />`;
  objects.diagrams.appendChild(newDiv);
}
//Deleting task
export function deleteTask(elements) {
  objects.table.rows[elements - 1].remove();
  objects.diagramsList[elements - 1].remove();
}
export function resetGraphs() {
  for (let i = 0; i < objects.table.rows.length; i++) {
    objects.diagramsList[0].remove();
  }
  for (let i = 1; i <= objects.table.rows.length; i++) {
    addGraph(i);
  }
}
//Placing block in diagram
export function addProcess(graphId, type) {
  let newDiv = document.createElement("div");
  if (type === "process") newDiv.className = "diagram__gant__process";
  if (type === "gap") newDiv.className = "diagram__gant__process-gap";
  if (type === "flat") newDiv.className = "diagram__gant__process-flat";
  if (type === "arrowUp") newDiv.className = "long-arrow-right-1";
  if (type === "arrowDown") newDiv.className = "long-arrow-right-2";
  document.getElementById(`graph-${graphId}`).appendChild(newDiv);
}
export function algorithmParameters() {
  let taskParameters = [];

  let correctParameters = true;
  for (let i = 1; i <= objects.table.rows.length; i++) {
    taskParameters[i - 1] = new Array(7);
    let execTime = parseInt(
      document.getElementById(`executionTimeTask-${i}`).value
    );
    let deadline = parseInt(document.getElementById(`deadLineTask-${i}`).value);
    let period = parseInt(document.getElementById(`periodTask-${i}`).value);
    let priority = parseInt(document.getElementById(`priorityTask-${i}`).value);
    if (
      execTime > 0 &&
      execTime < deadline &&
      deadline <= period &&
      priority > 0 &&
      correctParameters
    ) {
      taskParameters[i - 1] = {
        execTime: execTime,
        periodBase: period,
        period: period,
        priority: priority,
        deadline: deadline,
        done: false,
        id: i,
      };
    } else {
      if (execTime <= 0) {
        alert(" Execution time is not correct.");
        document.getElementById(`executionTimeTask-${i}`).style.color = "red";
      }
      if (deadline <= 0) {
        alert(" Deadline is not correct.");
        document.getElementById(`deadLineTask-${i}`).style.color = "red";
      }
      if (period <= 0) {
        alert(" Period is not correct.");
        document.getElementById(`periodTask-${i}`).style.color = "red";
      }
      if (priority <= 0) {
        alert("Priority must be bigger than 0.");
        document.getElementById(`priorityTask-${i}`).style.color = "red";
      }
      if (execTime >= deadline && deadline > 0) {
        alert("Execution time must be lesser than deadline.");
        document.getElementById(`executionTimeTask-${i}`).style.color = "red";
      }
      if (deadline > period && period > 0) {
        alert("Deadline must be equal or smaller than period.");
        document.getElementById(`deadLineTask-${i}`).style.color = "red";
      }
      correctParameters = false;
      break;
    }
    document.getElementById(`executionTimeTask-${i}`).style.color = "black";
    document.getElementById(`deadLineTask-${i}`).style.color = "black";
    document.getElementById(`periodTask-${i}`).style.color = "black";
    document.getElementById(`priorityTask-${i}`).style.color = "black";
  }
  if (correctParameters) return taskParameters;
}

export function hyperPeriod(parameters) {
  let arrPeriods = [];
  let multiplication = 1;
  let lcmVal;
  for (let i = 0; i < parameters.length; i++) {
    arrPeriods.push(parameters[i].period);
    multiplication = multiplication * parameters[i].period;
  }
  function lcm(x, y) {
    let c = x * y;
    while (y) {
      let t = y;
      y = x % y;
      x = t;
    }
    return c / x;
  }
  for (let i = 1; i < parameters.length; i++) {
    if (i === 1) lcmVal = lcm(arrPeriods[i - 1], arrPeriods[i]);
    if (i === 2) lcmVal = lcm(lcmVal, arrPeriods[i]);
    if (i === 3) lcmVal = lcm(lcmVal, arrPeriods[i]);
  }
  objects.hyperPeriod.innerHTML = lcmVal;
}

// export function processorUsage(parameters) {
//   let hyperPeriod = parseInt(objects.hyperPeriod.innerHTML)

// ( HIPEROKRES / OKRES ZADANIA1= e1
//   e1 * CZAS PRZETWARZANIA ZDANIA1 = KWANTY ZADANIA1
//   KWANT ZADANIA1 + KWANT ZADANIAPOPRZEDNIEGO = KWANTY ) 
  
//   TO W NAWIASIE TRZEBA W PĘTLI DLA LICZBY ZADAŃ
  
//   KWANTY / HIPEROKRES = ZUŻYCIE PROCKA





// }
// export function hyperPeriod(parameters) {
//   let arrPeriods = []
//   let r1 = 0, r2 = 0;
//   let l;
//   let multiplication = 1;
// for(let i=0; i< parameters.length; i++ ){
//   arrPeriods.push(parameters[i].period)
//   multiplication = multiplication * parameters[i].period

// }
// l = arrPeriods.length;
// for( let i=0;i<l;i++) {
// r1 = arrPeriods[i] % arrPeriods[i + 1];
// if(r1 === 0) {
//   arrPeriods[i + 1] = (arrPeriods[i] * arrPeriods[i+1]) / arrPeriods[i + 1];
// }
// else {
//     r2 = arrPeriods[i + 1] % r1;
//     if(r2 === 0) {
//       arrPeriods[i + 1] = (arrPeriods[i] * arrPeriods[i + 1]) / r1;
//     }
//     else {
//       arrPeriods[i+1] = (arrPeriods[i] * arrPeriods[i + 1]) / r2;
//     }
// }
// }
// if (arrPeriods[l - 1] % 1 !==0) arrPeriods[l - 1] = multiplication;
// console.log(`multipl ${multiplication} dzielnik: ${arrPeriods[l-1]}`)
// return arrPeriods[l - 1];
// }

export function showSchedule(type, parameters) {
  //problematyczny układ danych
  //  let tasks = [
  //   { execTime: 3, periodBase: 5, period: 5, priority: 3, deadline: 5, done: false, id: 1 },
  //   { execTime: 3, periodBase: 9, period: 9, priority: 5, deadline: 9, done: false, id: 2 },
  //   { execTime: 5, periodBase: 5, period: 5, priority: 3, deadline: 5, done: false, id: 3 },
  // ];
  let tasksFollowingArr = _.cloneDeep(parameters);

  for (let i = 1; i <= 55; i++) {
    // console.log(`krok ${i}`);
    // Algorytm EDF
    if (type === "EDF") {
      for (let j = 0; j < parameters.length; j++) {
        if ((i - 1) % parameters[j].period === 0 && i - 1 != 0) {
          addProcess(parameters[j].id, "arrowUp");
        }
      }
      for (let j = 0; j < parameters.length; j++) {
        if (
          ((i - 1) % parameters[j].deadline === 0 &&
            i - 1 != 0 &&
            i < parameters[j].period) ||
          ((i - 1) % (parameters[j].deadline + parameters[j].period) === 0 &&
            i - 1 != 0 &&
            !tasksFollowingArr[j].done)
        ) {
          addProcess(parameters[j].id, "arrowDown");
        }
      }
      tasksFollowingArr.sort((x, y) => x.deadline - y.deadline);
      tasksFollowingArr.sort((x, y) => x.done - y.done);
      if (tasksFollowingArr[0].done)
        tasksFollowingArr.sort((x, y) => y.deadline - x.deadline);

      console.table(tasksFollowingArr);

      //stworzenie procesu dla najwyższego priorytetu oraz odjęcie dla niego 1 execTime
      if (!tasksFollowingArr[0].done) {
        addProcess(tasksFollowingArr[0].id, "process");
        //  tasksFollowingArr[0].period -= 1;
        tasksFollowingArr[0].execTime -= 1;
      } else addProcess(tasksFollowingArr[0].id, "gap");

      if (tasksFollowingArr[0].execTime === 0) tasksFollowingArr[0].done = true;

      //dodanie bloczków odpowiednio dla pozostałych funkcji
      for (let j = 1; j < tasksFollowingArr.length; j++) {
        if (
          tasksFollowingArr[j].execTime !==
            parameters[tasksFollowingArr[j].id - 1].execTime &&
          tasksFollowingArr[j].execTime > 0 &&
          tasksFollowingArr[j].execTime %
            parameters[tasksFollowingArr[j].id - 1].execTime
        ) {
          addProcess(tasksFollowingArr[j].id, "flat");
        } else addProcess(tasksFollowingArr[j].id, "gap");
      }
      for (let j = 0; j < tasksFollowingArr.length; j++) {
        tasksFollowingArr[j].period -= 1;
        // tasksFollowingArr[j].deadline -= 1;
        if (tasksFollowingArr[j].execTime > 0)
          tasksFollowingArr[j].deadline -= 1;
        if (tasksFollowingArr[j].period === 0) {
          tasksFollowingArr[j].done = false;
          tasksFollowingArr[j].period =
            parameters[tasksFollowingArr[j].id - 1].period;
          tasksFollowingArr[j].execTime +=
            parameters[tasksFollowingArr[j].id - 1].execTime;

          if (tasksFollowingArr[j].deadline < 0) {
            tasksFollowingArr[j].deadline +=
              parameters[tasksFollowingArr[j].id - 1].deadline;
          } else {
            tasksFollowingArr[j].deadline =
              parameters[tasksFollowingArr[j].id - 1].deadline;
          }
        }
      }
      console.table(tasksFollowingArr);
    }

    // Algorytm RMS
    if (type === "RMS") {
      for (let j = 0; j < parameters.length; j++) {
        if ((i - 1) % parameters[j].period === 0 && i - 1 != 0) {
          addProcess(parameters[j].id, "arrowUp");
        }
      }

      tasksFollowingArr.sort((x, y) => x.periodBase - y.periodBase);
      tasksFollowingArr.sort((x, y) => x.done - y.done);
      if (tasksFollowingArr[0].done)
        tasksFollowingArr.sort((x, y) => y.periodBase - x.periodBase);

      if (!tasksFollowingArr[0].done) {
        addProcess(tasksFollowingArr[0].id, "process");
        tasksFollowingArr[0].execTime -= 1;
      } else addProcess(tasksFollowingArr[0].id, "gap");

      if (tasksFollowingArr[0].execTime === 0) tasksFollowingArr[0].done = true;

      for (let j = 1; j < tasksFollowingArr.length; j++) {
        if (
          tasksFollowingArr[j].execTime !==
            parameters[tasksFollowingArr[j].id - 1].execTime &&
          tasksFollowingArr[j].execTime > 0 &&
          tasksFollowingArr[j].execTime %
            parameters[tasksFollowingArr[j].id - 1].execTime
        ) {
          addProcess(tasksFollowingArr[j].id, "flat");
        } else addProcess(tasksFollowingArr[j].id, "gap");
      }
      for (let j = 0; j < tasksFollowingArr.length; j++) {
        tasksFollowingArr[j].period -= 1;
        if (tasksFollowingArr[j].period === 0) {
          tasksFollowingArr[j].done = false;
          tasksFollowingArr[j].period =
            parameters[tasksFollowingArr[j].id - 1].period;
          tasksFollowingArr[j].execTime +=
            parameters[tasksFollowingArr[j].id - 1].execTime;
        }
      }
    }

    if (type === "Priority") {
      for (let j = 0; j < parameters.length; j++) {
        if ((i - 1) % parameters[j].period === 0 && i - 1 != 0) {
          addProcess(parameters[j].id, "arrowUp");
        }
      }

      tasksFollowingArr.sort((x, y) => y.priority - x.priority);
      tasksFollowingArr.sort((x, y) => x.done - y.done);
      if (tasksFollowingArr[0].done)
        tasksFollowingArr.sort((x, y) => x.priority - y.priority);

      if (!tasksFollowingArr[0].done) {
        addProcess(tasksFollowingArr[0].id, "process");
        tasksFollowingArr[0].execTime -= 1;
      } else addProcess(tasksFollowingArr[0].id, "gap");
      if (tasksFollowingArr[0].execTime === 0) tasksFollowingArr[0].done = true;
      for (let j = 1; j < tasksFollowingArr.length; j++) {
        if (
          tasksFollowingArr[j].execTime !==
            parameters[tasksFollowingArr[j].id - 1].execTime &&
          tasksFollowingArr[j].execTime > 0 &&
          tasksFollowingArr[j].execTime %
            parameters[tasksFollowingArr[j].id - 1].execTime
        ) {
          addProcess(tasksFollowingArr[j].id, "flat");
        } else addProcess(tasksFollowingArr[j].id, "gap");
      }
      for (let j = 0; j < tasksFollowingArr.length; j++) {
        tasksFollowingArr[j].period -= 1;
        if (tasksFollowingArr[j].period === 0) {
          tasksFollowingArr[j].done = false;
          tasksFollowingArr[j].period =
            parameters[tasksFollowingArr[j].id - 1].period;
          tasksFollowingArr[j].execTime +=
            parameters[tasksFollowingArr[j].id - 1].execTime;
        }
      }
    }
  }
}
