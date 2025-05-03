import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TodoList.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/action';
import { fetchAllData, createTask, updateTask, deleteTask } from '../../services/tasksService';
import { useSelector } from 'react-redux';

function TodoList() {

  const [todos, setTodos] = useState([]);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const data=useSelector((state)=>state.data);

  const fetchTodos = async () => {
    const tasks = await fetchAllData(token);
    const result = await tasks.json();
    setTodos(result.data);
  };

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const AddNewTask = async (e) => {
    e.preventDefault();
    if (!newTitle) return;
    await createTask({ title: newTitle,description:newDesc,dueDate:newDueDate }, token);
    setNewTitle("");
    setNewDesc("");
    setNewDueDate("");
    fetchTodos();
  };

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
    setEditDesc(todo.description);
    setEditDueDate(
      todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
    );
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDesc("");
    setEditDueDate("");
  };

  const handleUpdate = async (id) => {
    if (!editTitle) return;
    await updateTask(id, { title: editTitle,description:editDesc,dueDate:editDueDate }, token);
    cancelEdit();
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTask(id, token);
    fetchTodos();
  };

  const handleToggle = async (todo) => {
    try {
      const newStatus = todo.status === 'pending' ? 'completed' : 'pending';
      console.log('Toggling task', todo._id, 'to', newStatus);
      const res = await updateTask(todo._id, { status: newStatus }, token);
      if (!res.ok) {
        const errText = await res.text();
        console.error('Toggle failed:', errText);
      } else {
        console.log('Toggle success');
        fetchTodos();
      }
    } catch (err) {
      console.error('Toggle error:', err);
    }
  };

  const appearTasks = todos.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || todo.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container">
    
      <div className="navbar">
        <h2>hello {data.name}</h2>
        <button className="button-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="content">
      <form className="add-task" onSubmit={AddNewTask}>
        <input
          type="text"
          required
          placeholder="title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="description"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <input
          type="date"
          required
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
        <div className="filter-search">
          <input
            type="text"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">all</option>
            <option value="pending">pending</option>
            <option value="completed">completed</option>
          </select>
        </div>
        <ul className="todo-list">
          {appearTasks.map((todo) => (
            <li key={todo._id}>
              {editingId === todo._id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                  />
                  <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(todo._id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                
                  <input
                    type="checkbox"
                    checked={todo.status === "completed"}
                    onChange={() => handleToggle(todo)}
                  />
                  <span className={todo.status === "completed" ? "completed" : ""}>
                    {todo.title}
                  </span>
                  <span className={todo.status === "completed" ? "completed" : ""}>{todo.description}</span>
                  <span className={todo.status === "completed" ? "completed" : ""}>
                    {todo.dueDate
                      ? new Date(todo.dueDate).toISOString().split('T')[0]
                      : ''}
                  </span>

                  <button onClick={() => startEdit(todo)}>Edit</button>
                  <button onClick={() => handleDelete(todo._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
