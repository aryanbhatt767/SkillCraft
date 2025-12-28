const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
  const text = taskInput.value.trim();
  const dateTime = dateInput.value;

  if (text === "") return;

  const li = document.createElement("li");
  li.className = "task";

  li.innerHTML = `
    <div class="task-info">
      <strong>${text}</strong>
      <small>${dateTime ? new Date(dateTime).toLocaleString() : ""}</small>
    </div>
    <div class="task-actions">
      <button class="complete-btn">✔</button>
      <button class="edit-btn">✎</button>
      <button class="delete-btn">✖</button>
    </div>
  `;

  // Complete
  li.querySelector(".complete-btn").onclick = () => {
    li.classList.toggle("completed");
  };

  // Edit
  li.querySelector(".edit-btn").onclick = () => {
    const newText = prompt("Edit task:", text);
    if (newText) {
      li.querySelector("strong").innerText = newText;
    }
  };

  // Delete
  li.querySelector(".delete-btn").onclick = () => {
    li.remove();
  };

  taskList.appendChild(li);
  taskInput.value = "";
  dateInput.value = "";
}
