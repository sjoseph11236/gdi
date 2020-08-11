// Select the Elements 
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
// Why this const uppercase and not the others?
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variable
let LIST = [];
let id = 0;

// let LIST,id; 

// // get item from localstorage
// let data = localStorage.getItem("TODO");


// // Check if data is note empty
// if(data) {
//   LIST = JSON.parse(data);
//   id = LIST.length;
//   console.log(LIST)
//   loadList(LIST);
// }
// else { 
//   LIST = [];
//   id = 0;
// }

// // Load items to the user's interface
// function loadList(array) { 
//   array.forEach(item => addToDo(item.name, item.id, item.done, item.trash));
// }

// Show todays date
const options = { weekday: "long", month: "short", day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Add to do function
function addToDo (toDo, id, done, trash) { 
  if(trash) return; 

  const DONE = done ? CHECK : UNCHECK; 
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
                  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                  <p class="text ${LINE}">${toDo}</p>
                  <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
                </li>
                `;
  const position = "beforeend";
  // What is the difference between insertAdjacentElement
  list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", (evt) => { 
  if(evt.keyCode == 13) {  
    const toDo = input.value; 

    if(toDo) addToDo(toDo, id, false, false);

    LIST.push({ 
      name: toDo, 
      id, 
      done: false, 
      trash: false
    })

    // // add item to localstorage (This has to appear ever where we add an item to the array).
    // localStorage.setItem("TODO", JSON.stringify(LIST));
    id++;
    input.value = "";
  }
})


// Complete to do 
const completeToDo = (element) => {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
const removeToDo = (element) => { 
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener("click", evt => {
  const element = evt.target; 
  const elementJob = element.attributes.job.value; 

  if(elementJob == "complete") {
    completeToDo(element);
  }
  else if( elementJob == "delete") {
    removeToDo(element);
  }

  // // add item to localstorage (This has to appear ever where we add an item to the array).
  // localStorage.setItem("TODO", JSON.stringify(LIST));
})

// refresh the todolist
clear.addEventListener("click", evt => { 

  /* START HERE */
  // check if the parent node has firstChild.
  while(list.firstChild) {
    // remove ever firstChild
    list.removeChild(list.firstChild)
  }
  // Clear the LIST. 
  LIST =[];

  // localStorage.clear();
  // location.reload();
})