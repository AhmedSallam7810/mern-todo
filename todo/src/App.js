import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Register from "./component/register/register";
import Login from "./component/login/login";
import TodoList from "./component/todo/TodoList";
import ProtectedRoute from "./component/ProtectedRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><TodoList /></ProtectedRoute>}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
