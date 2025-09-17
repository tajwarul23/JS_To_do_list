document.addEventListener("DOMContentLoaded", () => {
  //grabbing element
  let input = document.querySelector("#todo-input");
  let addBtn = document.querySelector("#add-task-btn");
  let list = document.querySelector("#todo-list");

  //storing tasks
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  //rendering each task
  tasks.forEach((task) => renderTask(task));

  //adding task to the task list
  addBtn.addEventListener("click", () => {
    //taking input text
    let taskText = input.value.trim();
    if (taskText === "") return;

    //creating an object
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    //pushing newTask object to tasks array
    tasks.push(newTask);
    saveTasks(tasks);
    renderTask(newTask);
    input.value = "";
    // console.log(newTask);
  });

  //showing tasks to UI from local storage
  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    li.innerHTML = `
     <li
          class="text-center mt-5 bg-gray-700 py-3 rounded-xl flex justify-around items-center px-4 cursor-pointer"
        >
          <span>${task.text}</span>
          <button
            id="delete-task-btn"
            class="bg-red-600 text-white font-bold px-2 py-1 rounded-sm cursor-pointer"
          >
            Delete
          </button>
        </li>
    `;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("line-through");
      saveTasks();
    });
    let dltBtn = li.querySelector("button");
    dltBtn.addEventListener("click", (e) => {
      e.stopPropagation(); //prevent toggle from firing
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    list.appendChild(li);
  }

  //Storing to local storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
