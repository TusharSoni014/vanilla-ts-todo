import "./style.css";

interface Todo {
  title: string;
  readonly id: string;
}

const todos: Array<Todo> = [];

const todosContainer = <HTMLElement>document.querySelector(".__my_tasks");
const todoInput = <HTMLInputElement>(
  document.querySelector("#myForm .__input_box")
);
const myForm = <HTMLFormElement>document.querySelector("#myForm");

const generateTodo = (title: string, id: string) => {
  const todoElement = <HTMLElement>document.createElement("div");
  todoElement.className = "__todo p-3 rounded bg-slate-800 flex gap-3";
  const paragraph = <HTMLParagraphElement>document.createElement("p");
  paragraph.innerText = title;
  const deleteBtn = <HTMLButtonElement>document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "bg-red-500 p-3 rounded h-fit ml-auto";
  deleteBtn.onclick = () => {
    handleDelete(id);
  };
  todoElement.appendChild(paragraph);
  todoElement.appendChild(deleteBtn);
  return todoElement;
};

const renderTodos = () => {
  todosContainer.innerHTML = "";
  todos.forEach((todo: Todo) => {
    const generatedTodoElement = generateTodo(todo.title, todo.id);
    todosContainer.appendChild(generatedTodoElement);
  });
};

const handleDelete = (id: string) => {
  const taskIndex = todos.findIndex((todo) => todo.id === id);
  todos.splice(taskIndex, 1);
  renderTodos();
};

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  try {
    console.log(todoInput.value);
    const todo: Todo = {
      title: todoInput.value,
      id: String(Math.random()).split(".")[1],
    };
    todos.push(todo);
    renderTodos();
    todoInput.value = "";
  } catch (error) {
    alert("Something went wrong!");
  }
};
