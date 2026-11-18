const tasks = [];
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const summary = document.querySelector("#summary");

function renderTasks() {
  list.replaceChildren();
  emptyState.hidden = tasks.length > 0;
  summary.hidden = tasks.length === 0;

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task-item";

    const text = document.createElement("span");
    text.className = `task-text${task.completed ? " completed" : ""}`;
    text.textContent = task.text;
    text.tabIndex = 0;
    text.setAttribute("role", "button");
    text.setAttribute("aria-pressed", String(task.completed));
    text.setAttribute("aria-label", `${task.text} (${task.completed ? "completed" : "not completed"})`);

    function toggleTask() {
      task.completed = !task.completed;
      renderTasks();
    }

    text.addEventListener("click", toggleTask);
    text.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleTask();
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${task.text}`);
    deleteButton.addEventListener("click", () => {
      const taskIndex = tasks.indexOf(task);
      tasks.splice(taskIndex, 1);
      renderTasks();
    });

    item.append(text, deleteButton);
    list.append(item);
  });

  const remaining = tasks.filter((task) => !task.completed).length;
  summary.textContent = `${remaining} of ${tasks.length} tasks remaining`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    return;
  }

  tasks.push({ text, completed: false });
  input.value = "";
  renderTasks();
  input.focus();
});

renderTasks();
