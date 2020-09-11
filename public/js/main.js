window.addEventListener('load', ()=> {
    let long;
    let lat;

    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureSection = document.querySelector(".temperature")
    const temperatureSpan = document.querySelector(".temperature span")



    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
           long = position.coords.longitude;
           lat = position.coords.latitude;
           //GeoLocationPosition.coords.longitude
           
            const proxy = "https://cors-anywhere.herokuapp.com/";

           const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            
           fetch(api)
           .then(response =>{
                   return response.json();
           })
           .then(data => {
               console.log(data);
               const {temperature, summary} = data.currently;
                temperatureDegree.textContent = temperature;
                locationTimezone.textContent = data.timezone;
                temperatureDescription.textContent = summary;
           });
        });
    }
    //else?
});

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);


function addTodo(event){
    //prevent form submit
    event.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
//make list
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value; //let input user input
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); //div with an li
//add to local storage
    saveLocalTodos(todoInput.value);

//checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class= "fas fa-check"> </i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
//trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class= "fas fa-trash"> </i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
//append to list
    todoList.appendChild(todoDiv);
    //clear the value from pervious userinput
    todoInput.value = "";
}

function deleteCheck(e){
    const item = (e.target);
    if (item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //falling animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();

        })
    }

    if (item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed") ;
    }
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos = [];

    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos = [];

    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
    //make list
        const newTodo = document.createElement('li');
        newTodo.innerText = todo; //let input user input
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo); //div with an li
    //checkmark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class= "fas fa-check"> </i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
    //trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class= "fas fa-trash"> </i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    //append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];

    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1 );
    localStorage.setItem('todos', JSON.stringify(todos));
}



function realtimeClock() {
    var timeClock = new Date();
    
    var hours = timeClock.getHours();
    var minutes = timeClock.getMinutes();
    var seconds = timeClock.getSeconds();

    var ampm = (hours < 12) ? "AM" : "PM";
    //making sure 12 hour format
    hours = (hours > 12) ? hours - 12 : hours;

    //adding leading 0's when needed

    hours = ("0" + hours).slice(-2);
    
    minutes = ("0" + minutes).slice(-2);
    
    seconds = ("0" + seconds).slice(-2);

    document.getElementById('time').innerHTML =
        hours + ":" + minutes + ":" + seconds + " " + ampm;
    
        var time = setTimeout(realtimeClock, 500);
}
