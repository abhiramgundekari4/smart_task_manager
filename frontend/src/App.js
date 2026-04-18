import React, { useState, useEffect } from "react";
import Auth from "./Auth";
import Profile from "./Profile";
import { API, getToken } from "./api";

function App() {
  const token = localStorage.getItem("token");

  const [task, setTask] = useState("");
  const [type, setType] = useState("task");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);

  // 🔹 FETCH TASKS
  useEffect(() => {
    if (!token) return;

    fetch(`${API}/api/tasks`, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);
        }
      })
      .catch((err) => console.log(err));
  }, [token]);

  // 🔹 ADD TASK
  const addTask = async () => {
    if (!task) return;

    try {
      const res = await fetch(`${API}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
        body: JSON.stringify({
          title: task,
          type: type,
          dueDate: dueDate,
        }),
      });

      const data = await res.json();

      setTasks([...tasks, data]);
      setTask("");
      setDueDate("");

    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 DELETE TASK
  const deleteTask = async (id) => {
    await fetch(`${API}/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });

    setTasks(tasks.filter((t) => t._id !== id));
  };

  // 🔹 TOGGLE TASK
  const toggleTask = async (id) => {
    await fetch(`${API}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });

    setTasks(
      tasks.map((t) =>
        t._id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // 🔐 LOGIN CHECK
  if (!token) return <Auth />;

  const taskList = tasks.filter((t) => t.type !== "assignment");
  const assignmentList = tasks.filter((t) => t.type === "assignment");

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">🎓 Dashboard</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* PROFILE */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <Profile />
      </div>

      {/* ADD TASK */}
      <div className="bg-white p-4 rounded shadow mb-6 flex gap-3 flex-wrap">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
          className="flex-1 border p-2 rounded"
        />

        <select onChange={(e) => setType(e.target.value)} className="border p-2 rounded">
          <option value="task">Task</option>
          <option value="assignment">Assignment</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded"
        />

        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      {/* TASKS */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-3">Tasks</h2>

        {taskList.map((t) => (
          <div key={t._id} className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t._id)}
              />
              <div>
                <p className={t.completed ? "line-through text-gray-400" : ""}>
                  {t.title}
                </p>
                <small>
                  📅 {t.dueDate ? t.dueDate.split("T")[0] : "No deadline"}
                </small>
              </div>
            </div>

            <button onClick={() => deleteTask(t._id)} className="text-red-500">
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ASSIGNMENTS */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-3">Assignments</h2>

        {assignmentList.map((t) => (
          <div key={t._id} className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t._id)}
              />
              <div>
                <p className={t.completed ? "line-through text-gray-400" : ""}>
                  {t.title}
                </p>
                <small>
                  📅 {t.dueDate ? t.dueDate.split("T")[0] : "No deadline"}
                </small>
              </div>
            </div>

            <button onClick={() => deleteTask(t._id)} className="text-red-500">
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;