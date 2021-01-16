import { objects } from "./objects.js";
//dodawanie zadania
export function addTask(elements) {
  let newRow = objects.table.insertRow(objects.table.rows.length);
  elements+=1;
  newRow.innerHTML = `<tr id="task-${elements}"><td>${elements}</td></td><td><input type="number" id="executionTimeTask-${elements}" /></td><td><input type="number" id="deadLineTask-${elements}" /></td><td><input type="number" id="periodTask-${elements}" /></td><td><input type="number" id="priorityTask-${elements}" /></td></tr> `;
  addGraph(elements);
}
export function addGraph(id){
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `<div class="diagram__gant" id="graph-${id}" ><img src="assets/fonts/cartesianSystem_corr.[hash5].svg" class="diagram__gant__graph"  />`;
  objects.diagrams.appendChild(newDiv);
}
//usuwanie zadania
export function deleteTask(elements) {
  objects.table.rows[elements - 1].remove();
  objects.diagramsList[elements - 1].remove();
}
export function resetGraphs(length) {
  for(let i = 0; i<objects.table.rows.length;i++){
    objects.diagramsList[0].remove();
    } 
      for(let i = 1; i<=objects.table.rows.length;i++){
        addGraph(i)
    }
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
// export function algorithmParams(table) {
//   let params = new Array();
//   for (let i = 0; i < 3; i++) {
//     params[i] = new Array();
//     for (let j = 1; j <= table.rows.length; j++) {
//       switch (i) {
//         case 0:
//           params[i].push(
//             document.getElementById(`executionTimeTask-${j}`).value
//           );
//           break;
//         case 1:
//           params[i].push(document.getElementById(`deadlineTask-${j}`).value);
//           break;
//         case 2:
//           params[i].push(document.getElementById(`periodTask-${j}`).value);
//           break;
//       }
//     }
//   }
//   return params;
// }

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
      console.log(`Elements in row ${i} are incorrect`);
      if (execTime < 0) {
        console.log(" Execution time is not correct.");
      }
      if (execTime >= deadline) {
        console.log("Execution time must be lesser than deadline.");
      }
      if (deadline > period) {
        console.log("Deadline must be equal or smaller than period.");
      }
      if (priority <= 0) {
        console.log("Priority must be bigger than 0.");
      }

      correctParameters = false;
      break;
    }
  }
  console.log(`Elements are correct`);
  if (correctParameters) return taskParameters;
  // else wyrzuć błąd
  // console.table(taskParameters)
}
export function showSchedule(type, parameters) {
  // let tasks = [
  //   { execTime: 2, periodBase: 10, period: 10, priority: 8, deadline: 10, done: false, id: 1 },
  //   { execTime: 3, periodBase: 11, period: 11, priority: 5, deadline: 11, done: false, id: 2 },
  //   { execTime: 2, periodBase: 5, period: 5, priority: 6, deadline: 5, done: false, id: 3 },
  // ];
  //problematyczny układ danych
  //  let tasks = [
  //   { execTime: 3, periodBase: 5, period: 5, priority: 3, deadline: 5, done: false, id: 1 },
  //   { execTime: 3, periodBase: 9, period: 9, priority: 5, deadline: 9, done: false, id: 2 },
  //   { execTime: 5, periodBase: 5, period: 5, priority: 3, deadline: 5, done: false, id: 3 },
  // ];
  let tasks = _.cloneDeep(parameters);
  let tasksFollowingArr = _.cloneDeep(parameters);
  let ograniczenieTestowe = 55;
  // console.table(tasks)
  // console.table(tasksFollowingArr)

  for (let i = 1; i <= 55; i++) {
    console.log(`algorytm ${type} czas globalny:${i}`);
    if (type === "EDF") {
      // let tasks = [
      //   { execTime: 3, period: 12, deadline: 6, done: false, id: 1 },
      //   { execTime: 9, period: 37, deadline: 15, done: false, id: 2 },
      //   { execTime: 3, period: 9, deadline: 5, done: false, id: 3 },
      // ];
      // let tasksFollowingArr = _.cloneDeep(tasks);

      //zaznaczanie terminu
      // for (let j = 1; j <= arr.length; j++) {
      //   if ((i - 1) % tasks[j-1].period === 0 && i - 1 != 0)
      //     addProcess(j, "arrowDown");
      // }
      //zaznaczanie okresu
      if (i < ograniczenieTestowe) {
        for (let j = 0; j < tasks.length; j++) {
          if ((i - 1) % tasks[j].period === 0 && i - 1 != 0) {
            addProcess(tasks[j].id, "arrowUp");
          }
        }
        for (let j = 0; j < tasks.length; j++) {
          if (
            ((i - 1) % tasks[j].deadline === 0 &&
              i - 1 != 0 &&
              i < tasks[j].period) ||
            ((i - 1) % (tasks[j].deadline + tasks[j].period) === 0 &&
              i - 1 != 0 &&
              !tasksFollowingArr[j].done)
          ) {
            addProcess(tasks[j].id, "arrowDown");
          }
        }
        ////poprawić termin, bo działa źle, pojawia się jak okres a powinien pojawiać się ileś czasu po okresie
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

        if (tasksFollowingArr[0].execTime === 0)
          tasksFollowingArr[0].done = true;

        //dodanie bloczków odpowiednio dla pozostałych funkcji
        for (let j = 1; j < tasksFollowingArr.length; j++) {
          if (
            tasksFollowingArr[j].execTime !==
              tasks[tasksFollowingArr[j].id - 1].execTime &&
            tasksFollowingArr[j].execTime > 0 &&
            tasksFollowingArr[j].execTime %
              tasks[tasksFollowingArr[j].id - 1].execTime
          ) {
            addProcess(tasksFollowingArr[j].id, "flat");
          } else addProcess(tasksFollowingArr[j].id, "gap");
        }
        // if(tasksFollowingArr[j-1].period!== tasks[tasksFollowingArr[j-1].id-1].period) addProcess(tasksFollowingArr[j].id, "gap");
        // else addProcess(tasksFollowingArr[j].id, "flat");
        //zmniejszenie okresu o jeden dla wszystkich funkcji(postępowanie pętli w czasie)
        for (let j = 0; j < tasksFollowingArr.length; j++) {
          tasksFollowingArr[j].period -= 1;
          // tasksFollowingArr[j].deadline -= 1;
          if (tasksFollowingArr[j].execTime > 0)
            tasksFollowingArr[j].deadline -= 1;
          if (tasksFollowingArr[j].period === 0) {
            tasksFollowingArr[j].done = false;
            tasksFollowingArr[j].period =
              tasks[tasksFollowingArr[j].id - 1].period;
            tasksFollowingArr[j].execTime +=
              tasks[tasksFollowingArr[j].id - 1].execTime;
            //  tasksFollowingArr[j].deadline += tasks[tasksFollowingArr[j].id-1].deadline;
            if (tasksFollowingArr[j].deadline < 0) {
              tasksFollowingArr[j].deadline +=
                tasks[tasksFollowingArr[j].id - 1].deadline;
            } else {
              tasksFollowingArr[j].deadline =
                tasks[tasksFollowingArr[j].id - 1].deadline;
            }
            console.log(
              `task ${tasksFollowingArr[j].id} dostaje od nowa okres ${
                tasks[tasksFollowingArr[j].id - 1].period
              } i termin: ${tasks[tasksFollowingArr[j].id - 1].deadline}`
            );
          }
        }
        console.log(`///////////////////////////////////////`);
      }
      // }
    }
    // Algorytm RMS
    if (type === "RMS") {
      // for (let i = 1; i <= 55; i++) {
      if (i < ograniczenieTestowe) {
        // console.log(`algorytm ${type} czas globalny:${i}`);

        for (let j = 0; j < tasks.length; j++) {
          if ((i - 1) % tasks[j].period === 0 && i - 1 != 0) {
            addProcess(tasks[j].id, "arrowUp");
          }
        }

        tasksFollowingArr.sort((x, y) => x.periodBase - y.periodBase);
        // tasksFollowingArr.sort((x, y) => x.period - y.period + x.periodBase - y.periodBase);
        tasksFollowingArr.sort((x, y) => x.done - y.done);
        if (tasksFollowingArr[0].done)
          tasksFollowingArr.sort((x, y) => y.periodBase - x.periodBase);

        console.table(tasksFollowingArr);

        //stworzenie procesu dla najwyższego priorytetu oraz odjęcie dla niego 1 execTime
        if (!tasksFollowingArr[0].done) {
          addProcess(tasksFollowingArr[0].id, "process");
          tasksFollowingArr[0].execTime -= 1;
        } else addProcess(tasksFollowingArr[0].id, "gap");

        if (tasksFollowingArr[0].execTime === 0)
          tasksFollowingArr[0].done = true;

        //dodanie bloczków odpowiednio dla pozostałych funkcji
        for (let j = 1; j < tasksFollowingArr.length; j++) {
          if (
            tasksFollowingArr[j].execTime !==
              tasks[tasksFollowingArr[j].id - 1].execTime &&
            tasksFollowingArr[j].execTime > 0 &&
            tasksFollowingArr[j].execTime %
              tasks[tasksFollowingArr[j].id - 1].execTime
          ) {
            addProcess(tasksFollowingArr[j].id, "flat");
          } else addProcess(tasksFollowingArr[j].id, "gap");
        }
        // if(tasksFollowingArr[j-1].period!== tasks[tasksFollowingArr[j-1].id-1].period) addProcess(tasksFollowingArr[j].id, "gap");
        // else addProcess(tasksFollowingArr[j].id, "flat");
        //zmniejszenie okresu o jeden dla wszystkich funkcji(postępowanie pętli w czasie)
        for (let j = 0; j < tasksFollowingArr.length; j++) {
          tasksFollowingArr[j].period -= 1;
          if (tasksFollowingArr[j].period === 0) {
            tasksFollowingArr[j].done = false;
            tasksFollowingArr[j].period =
              tasks[tasksFollowingArr[j].id - 1].period;
            tasksFollowingArr[j].execTime +=
              tasks[tasksFollowingArr[j].id - 1].execTime;

            console.log(
              `task ${tasksFollowingArr[j].id} dostaje od nowa okres ${
                tasks[tasksFollowingArr[j].id - 1].period
              }`
            );
          }
        }
        console.log(`///////////////////////////////////////`);
      }
    }

    // }
    //////////// Działający algorytm priorytetowy
    if (type === "Priority") {
      // let tasks = [
      //   { execTime: 3, period: 5, priority: 3, done: false, id: 1 },
      //   { execTime: 3, period: 9, priority: 4, done: false, id: 2 },
      //   { execTime: 5, period: 5, priority: 3, done: false, id: 3 },
      // ];
      // let tasksFollowingArr = _.cloneDeep(tasks);

      // for (let i = 1; i <= 55; i++) {
      //zaznaczanie terminu
      // for (let j = 1; j <= arr.length; j++) {
      //   if ((i - 1) % tasks[j-1].period === 0 && i - 1 != 0)
      //     addProcess(j, "arrowDown");
      // }
      //zaznaczanie okresu
      if (i < ograniczenieTestowe) {
        // console.log(`algorytm ${type} czas globalny:${i}`);

        for (let j = 0; j < tasks.length; j++) {
          if ((i - 1) % tasks[j].period === 0 && i - 1 != 0) {
            addProcess(tasks[j].id, "arrowUp");
          }
        }

        tasksFollowingArr.sort((x, y) => y.priority - x.priority);
        tasksFollowingArr.sort((x, y) => x.done - y.done);
        if (tasksFollowingArr[0].done)
          tasksFollowingArr.sort((x, y) => x.priority - y.priority);

        console.table(tasksFollowingArr);

        //stworzenie procesu dla najwyższego priorytetu oraz odjęcie dla niego 1 execTime
        if (!tasksFollowingArr[0].done) {
          addProcess(tasksFollowingArr[0].id, "process");
          tasksFollowingArr[0].execTime -= 1;
        } else addProcess(tasksFollowingArr[0].id, "gap");

        if (tasksFollowingArr[0].execTime === 0)
          tasksFollowingArr[0].done = true;

        //dodanie bloczków odpowiednio dla pozostałych funkcji
        for (let j = 1; j < tasksFollowingArr.length; j++) {
          if (
            tasksFollowingArr[j].execTime !==
              tasks[tasksFollowingArr[j].id - 1].execTime &&
            tasksFollowingArr[j].execTime > 0 &&
            tasksFollowingArr[j].execTime %
              tasks[tasksFollowingArr[j].id - 1].execTime
          ) {
            addProcess(tasksFollowingArr[j].id, "flat");
          } else addProcess(tasksFollowingArr[j].id, "gap");
        }
        // if(tasksFollowingArr[j-1].period!== tasks[tasksFollowingArr[j-1].id-1].period) addProcess(tasksFollowingArr[j].id, "gap");
        // else addProcess(tasksFollowingArr[j].id, "flat");
        //zmniejszenie okresu o jeden dla wszystkich funkcji(postępowanie pętli w czasie)
        for (let j = 0; j < tasksFollowingArr.length; j++) {
          tasksFollowingArr[j].period -= 1;
          if (tasksFollowingArr[j].period === 0) {
            tasksFollowingArr[j].done = false;
            tasksFollowingArr[j].period =
              tasks[tasksFollowingArr[j].id - 1].period;
            tasksFollowingArr[j].execTime +=
              tasks[tasksFollowingArr[j].id - 1].execTime;

            console.log(
              `task ${tasksFollowingArr[j].id} dostaje od nowa okres ${
                tasks[tasksFollowingArr[j].id - 1].period
              }`
            );
          }
        }
        console.log(`///////////////////////////////////////`);
      }
    }
  }
}
