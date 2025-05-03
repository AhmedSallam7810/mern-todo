const fetchAllData = async (token) => {
  const response = await fetch("http://localhost:5000/tasks", {
    method: "GET",
    headers: { "Content-Type": "application/json", "token": token },
  });
  return response;
};

const createTask = async (task, token) => {
  const response = await fetch("http://localhost:5000/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json", "token": token },
    body: JSON.stringify(task),
  });
  return response;
};

const updateTask = async (id, data, token) => {
  const response = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "token": token },
    body: JSON.stringify(data),
  });
  return response;
};

const deleteTask = async (id, token) => {
  const response = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "token": token },
  });
  return response;
};

export { fetchAllData, createTask, updateTask, deleteTask };