// import userExpensesInput from "./models/userExpensesInput.js";
// import { chart } from "./views/chart.js";
import { objects } from "./models/objects.js";
import {
  addTask,
  addProcess,
  deleteTask,
  algorithmParams,
} from "./models/functions.js";

// import userExpensesInput from "./models/userExpensesInput.js";
// import { objects } from "./models/objects.js";
// import { cleanInput, init, storeData, deleteCookie, clearData, totalValue } from "./models/functions.js";
// import list from "./views/list.js";
// import { chart } from "./views/chart.js";

// let cookieList = init();
// // console.log(cookieList)

// objects.inputDescr.addEventListener("keyup", function (onEnterEventHandler) {
//   if (onEnterEventHandler.key === "Enter") {
//     for (let i = 0; i < objects.item.length; i++) {
//       if (objects.item[i].id !== `exp-${i}`) {
//         objects.item[i].id = `exp-${i}`;
//       }
//       objects.id = i + 1;
//     }
//     userExpensesInput();
//     cleanInput();
//     objects.historyInput.value = "Now";
//   }
// });
// console.log(1);
// objects.algorithmChoice.addEventListener("click", function () {
//   objects.algorithmChoice.value = "";
// });
objects.btnDeleteTask.addEventListener("click", function () {
  if (objects.table.rows.length) deleteTask(objects.table.rows.length + 1);
});
objects.btnAddTask.addEventListener("click", function () {
  if (objects.table.rows.length < 4) addTask(objects.table.rows.length + 1);

  let cells = document.querySelectorAll("td");
  for (let cell of cells) {
    cell.addEventListener("change", () => {
      // console.log(document.getElementById(cell.children[0].id).value);
      let params = algorithmParams(objects.table);
      // console.log(params)
      for (let i = 0; i < objects.table.rows; i++) {
        console.log(params[0][i]);
        if (params[0][i] > params[2][i]) console.log("exec time too big");
      }
      // params.forEach(el => {
      //   console.log(el)
      //   el.forEach(el1 => {
      //     // console.log(el1)
      //       }      )})
    });
  }
});
//exec time to ile jeden kwadracik zajmuje jednostek czasu
//period to ile jednostek czasu zajmuje caly process, period nie moze byc mniejszy niz deadline
//deadline to w ilu jednostkach czasu ma sie zamknac proces
objects.btnRandomTask.addEventListener("click", function () {
  let max = 20;
  if (objects.table.rows.length >= 1) {
    for (let i = 1; i <= objects.table.rows.length; i++) {
      let execTime = Math.floor(Math.random() * (max - 1)) + 1;
      let deadline = Math.floor(Math.random() * (max - 1)) + 1;
      let period = Math.floor(Math.random() * (max - 1)) + 1;
      if (deadline > period) deadline = period - 1;
      if (execTime > deadline) execTime = deadline - 1;
      execTime ? 0 : (execTime = 1);
      deadline ? 0 : (deadline = 1);
      period ? 0 : (period = 1);
      document.getElementById(`executionTimeTask-${i}`).value = execTime;
      document.getElementById(`deadlineTask-${i}`).value = deadline;
      document.getElementById(`periodTask-${i}`).value = period;
    }
    let params = algorithmParams(objects.table);
    // console.log(params);
  }
  // executionTimeTask-
  // deadlineTask-
  // periodTask-
});

// co wywołuje funkcje
// czy stopniowo w każdym przyporządkowywać, tzn 1 klocek diragram 1->2->3->4, czy
//najpierw cały diagram 1 i później kolejny

document.getElementById("btn-test").addEventListener("click", function () {
  //execTime, deadline(termin), period(okres)
  let arr = [
    [1, 4, 8],
    [3, 4, 6],
    [2, 2, 4],
  ];
  let arrFollowing = [
    [1, 4, 8],
    [3, 4, 6],
    [2, 2, 4],
  ];
  // let arr = [
  //   [1, 2, 2],
  //   [4, 9, 9],
  //   [6, 8, 8],
  // ];
  // let arrFollowing = [
  //   [1, 2, 2],
  //   [4, 9, 9],
  //   [6, 8, 8],
  // ];
  // let firstProcessDeadline,
  //   secondProcessDeadline = 0;
  let processFlag = [false, false, false, false];
  let priority = 0;
  // let globalTime = 0;

  for (let i = 1; i <= 55; i++) {
    priority = 0; //priorytet musi być wybierany od nowa co obieg pętli
    //zaznaczanie terminu
    for (let j = 1; j <= arr.length; j++) {
      if ((i - 1) % arr[j - 1][1] === 0 && i - 1 != 0)
        addProcess(j, "arrowDown");
    }
    //zaznaczanie okresu
    for (let j = 1; j <= arr.length; j++) {
      if ((i - 1) % arr[j - 1][2] === 0 && i - 1 != 0) addProcess(j, "arrowUp");
    }

    ////// w terminie funkcja musi się zmieścić, ale górny limit to okres!

    if (i < 55) {
      console.log(`czas globalny:${i}`);
      // //jeżeli wszystkie procesy poza jednym zostały zbudowane to zbuduj ostatni
      //       processFlag.forEach((el) => {
      //         let id,
      //           counter = 0;
      //         if (el === true) {
      //           counter += 1;
      //         } else{
      //           id = el.id;
      //           console.log(`el:${el} id:${id}`)
      //         }

      //         if (counter === processFlag.length - 1) priority = id;
      //       });
      //wyłonienie funkcji o największym priorytecie
      let priorityPassed = false; //czy priorytet został już nadany
      for (let j = 0; j < arrFollowing.length; j++) {
        // console.log(
        //   `arrFollowing[j][1]:${arrFollowing[j][1]} <= arrFollowing[priority][1]:${arrFollowing[priority][1]}`
        // );

        // //reset okresu
        // if(arrFollowing[j][2]<=0){
        //   arrFollowing[j][2] = arr[j][2];
        //   console.log(`reset okresu procesu: ${j}`)
        // }

        //problem priorytetu, budując wszystkie klocki termin na procesie 0 jest najmniejszy, więc priorytet się nie nadpisuje
        if (
          arrFollowing[j][1] <= arrFollowing[priority][1] && !processFlag[j]
        ) {
          priority = j;
          priorityPassed = true;
          // console.log(`priority = ${j};`)
        }
        //  else if (
        //   arrFollowing[j][1] <= arrFollowing[priority][1] &&
        //   processFlag[j] &&
        //   j < arrFollowing.length - 1 &&
        //   !priorityPassed
        // ) {
        //   priority = j + 1;
        //   console.log(`priority = ${j}+1;`)
        // }



        // jeżeli przez całą pętlę priorytet nie został przyporządkwoany, to weź poprawkę i działaj od 1wszego elementu
        if( !priorityPassed && j === arrFollowing.length-1){
          priority = 1;
        for (let g = 0; g < arrFollowing.length; g++) {
          if (
            arrFollowing[g][1] <= arrFollowing[priority][1] && !processFlag[g]
          ) {
            priority = g;
          }
        }
      }
      }
      console.log(
        ` proces ${priority} ma najwyższy priorytet, termin:${arrFollowing[priority][1]}, procesy wykonane: ${processFlag} `
      );

      //dodanie bloczka dla tej funkcji
      for (let j = 0; j < arrFollowing.length; j++) {
        if (!processFlag[j]) {
          addProcess(priority + 1, "process");
          //zmniejszenie wartości bloczków jakie jeszcze trzeba dodać
          arrFollowing[priority][0] -= 1;
          break;
        }
      }

      //dodanie bloczków odpowiednio dla pozostałych funkcji
      for (let j = 0; j < arrFollowing.length; j++) {
        if (j !== priority) addProcess(j + 1, "gap");
      }
      //zmniejszenie okresu o jeden dla wszystkich funkcji(postępowanie pętli w czasie)
      for (let j = 0; j < arrFollowing.length; j++) {
        arrFollowing[j][2] -= 1;
        //termin jest odejmowany tylko temu procesowi, który się nie ukończył i jego okres nie został przekroczony
        if (!processFlag[j] && arrFollowing[j][2] > 0) {
          arrFollowing[j][1] -= 1;
        }
      }
      //jeżeli execution time jest równy = 0 -> czyli proces wykonał się w pełni
      for (let j = 0; j <= arrFollowing.length - 1; j++) {
        if (arrFollowing[j][0] === 0) {
          processFlag[j] = true;
          console.log(`proces ${j} wykonał się w pełni`);
          // jeżeli proces się wykonał, upłynął termin i upłynął okres
          if (arrFollowing[j][1] <= 0 && arrFollowing[j][2] <= 0) {
            arrFollowing[j][0] = arr[j][0];
            arrFollowing[j][2] = arr[j][2];
            arrFollowing[j][1] += arr[j][1];

            processFlag[j] = false;
            console.log(
              `procesowi(licząc od 0) ${j} został dodany bazowy exec time i został zresetowany okres`
            );
          }
        }
      }
      console.log(
        `tablica arrFollowing: ${arrFollowing},  procesy wykonane: ${processFlag} `
      );
      console.log(`///////////////////////////////////////`);
    }
  }
});

//spr priorytetu
// for (let i = 0; i < arr.length - 1; i++) {
//   if (arr[i][1] > arr[i + 1][1]);
//   priority = i + 1;
//   console.log(i);
// }
// console.log(` proces ${priority} ma wyższy priorytet`);

// addProcess(priority+1, "process");

// for (let i = 0; i < arr.length; i++) {
//   if (i !== priority) addProcess(i+1, "flat");
// }

// for (let i = 0; i < arr.length - 1; i++) {
// arr[i][1] -=1;
// }

// globalTime+=1;
// console.log(arr)
// addProcess(1, "arrowUp");
// addProcess(1, "gap");
// addProcess(1, "flat");
// addProcess(1, "arrowUp");
// addProcess(1, "arrowDown");
// objects.historyInput.addEventListener("click", function () {
//   objects.historyInput.value = "";
// });

// objects.historyInput.addEventListener("change", function () {
//   clearData(objects.item,chart)
//   cookieList.forEach((el) => {
//     if (el[0] === this.value) {

//       let expensesList = el[1][0];
//       for (let i = 0; i < expensesList.length; i++) {
//         let readList = new list(expensesList[i][0], expensesList[i][1], i);
//         readList.addingNewItem();
//       }
//     }
//   });
// });

// objects.btnDelete.addEventListener("click", function () {
//   deleteCookie(objects.historyInput.value)
//   clearData(objects.item,chart)
//   totalValue()
//   location.reload();
//   // window.location.reload(true)
//   // window.location.reload(false);
// });

// objects.btnSave.addEventListener("click", function () {
//   if (objects.item.length) {
//     let now = new Date().toString().split(" ").splice(1, 4).join("-");
//     let length = objects.item.length;
//     let list = [];
//     let sameList = false;
//     for (let i = 0; i < length; i++) {
//       list[i] = [
//         objects.item[i].childNodes[1].textContent,
//         objects.item[i].childNodes[2].textContent,
//       ];
//     }
// // cookieList.forEach( el=>{
// //   if(el[1][0] = list){
// //     console.log(`lista ${el[1][0]} jest taka sama jak lista ${list}`)
// //     sameList = true;
// //   }else sameList = false;
// // })
// // if(!sameList){
//     objects.historyList.innerHTML += `<option value=${now} />`;
//     objects.historyInput.value = "Now";
//     storeData(list, now, 365);
//     sameList = false;
//     location.reload();

// }
//   // }

// });

// //now:
// // choosing we delete list and prepare like for init
// // now shows up after typing new expenses when we have not opened history log

// //after adding new element to the list history change on "now"
// // after creating new list (making new id)
// // create save option, change history - add option NOW
// // if we already opened a save from history, we can overwrite it by pressing save
// // we can delete everything
// // choosing date from history will load expenses from that time

// // let date = new Date(Date.now() + 86400e3);
// // date = date.toUTCString();
// // document.cookie = "user=John; expires=" + date dodać 12 miesiecy;
// // document.cookie = "user=John; max-age=3600"; mozna tutaj w sekundachw rzucic 12 miesiecy

// //READ

// // function showCookie(name) {
// //   if (document.cookie !== "") {
// //       const cookies = document.cookie.split(/; */);

// //       for (let i=0; i<cookies.length; i++) {
// //           const cookiePart = cookies[i].split("=");
// //           const cookieName = cookiesPart[0];
// //           const cookieVal = cookiesPart[1];
// //           if (cookieName === decodeURIComponent(name)) {
// //               return decodeURIComponent(cookieVal);
// //           }
// //       }
// //   }
// //   return false;
// // }

// // DELTE
