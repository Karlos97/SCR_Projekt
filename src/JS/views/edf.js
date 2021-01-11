import { objects } from "./models/objects.js";
import { addProcess } from "./models/functions.js";

export default class edf {
  constructor(inputDescr, inputVal, id) {
    this.descr = inputDescr;
    this.val = inputVal;
    this.id = id;
  }

//   addingNewItem() {
//     addData(chart, this.descr, this.val, this.id);

//     let item = document.createElement("div");
//     item.className = "expenses__input__item";
//     item.id = `exp-${this.id}`;
//     let itemContent = document.createTextNode("");
//     item.appendChild(itemContent);

//     let itemDescr = document.createElement("div");
//     itemDescr.className = "expenses__input__item--description";
//     let itemDescrContent = document.createTextNode(this.descr);
//     itemDescr.appendChild(itemDescrContent);

//     let itemValue = document.createElement("div");
//     itemValue.className = "expenses__input__item--value";
//     let itemValueContent = document.createTextNode(this.val);
//     itemValue.appendChild(itemValueContent);

//     let itemX = document.createElement("div");
//     itemX.className = "expenses__input__item--delete";
//     let itemXContent = document.createTextNode("x");
//     itemX.appendChild(itemXContent);

//     let location = document.querySelector(".expenses__list");
//     location.insertAdjacentElement("beforeend", item);
//     document
//       .getElementById(item.id)
//       .insertAdjacentElement("beforeend", itemDescr);
//     document
//       .getElementById(item.id)
//       .insertAdjacentElement("beforeend", itemValue);

//     document.getElementById(item.id).insertAdjacentElement("beforeend", itemX);

//     totalValue();

//     let remDescr = this.descr;
//     let remVal = this.val;
//     itemX.addEventListener("click", function () {
//       removeData(chart, remDescr, remVal);
//       item.remove();
//       totalValue();
//     });
//   }
}
