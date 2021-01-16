var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function() {
  event.preventDefault();
  //get information for task
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  //confirm there is input
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }
  //reset
  formEl.reset();
  //package data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };
  //send to next function to format
  createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
  //create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //add task id
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  //create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  //add html content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  //add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  //increase task counter
  taskIdCounter++;
};

var createTaskActions = function(taskId) {
  //create div for edit/delete
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  //create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);

  //create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);

  //dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i=0; i < statusChoices.length; i++) {
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  
    actionContainerEl.appendChild(statusSelectEl);
  }

  return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};

var editTask = function(taskId) {
  console.log("editing task #" + taskId);

  //get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
  //get task input/select to edit
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  //save task edit
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);
};

var taskButtonHandler = function(event) {
  var targetEl = event.target;

  //if edit button clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = event.target.getAttribute("data-task-id");
    editTask(taskId);
  }

  //if delete button clicked
  else if (event.target.matches(".delete-btn")) {
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  };
};

pageContentEl.addEventListener("click", taskButtonHandler);