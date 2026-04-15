import React, { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [attendance, setAttendance] = useState("");

  // 🔹 FETCH PROFILE
  useEffect(() => {
    fetch("https://smart-task-manager-27w3.onrender.com/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);

        setName(data.name || "");
        setCourse(data.course || "");
        setYear(data.year || "");
        setBranch(data.branch || "");
        setAttendance(data.attendance || "");
      });
  }, []);

  // 🔹 UPDATE PROFILE
  const updateProfile = async () => {
    const res = await fetch("https://smart-task-manager-27w3.onrender.com/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name,
        course,
        year,
        branch,
        attendance,
      }),
    });

    const data = await res.json();
    setUser(data);
    setEdit(false);
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        👤 Student Profile
      </h2>

      {!edit ? (
        <>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Course:</b> {user.course}</p>
          <p><b>Year:</b> {user.year}</p>
          <p><b>Branch:</b> {user.branch}</p>
          <p><b>Attendance:</b> {user.attendance}%</p>

          <button
            onClick={() => setEdit(true)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit Profile ✏️
          </button>
        </>
      ) : (
        <>
          <input
            className="border p-2 w-full mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            className="border p-2 w-full mb-2"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Course"
          />
          <input
            className="border p-2 w-full mb-2"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
          />
          <input
            className="border p-2 w-full mb-2"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="Branch"
          />
          <input
            className="border p-2 w-full mb-2"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            placeholder="Attendance %"
          />

          <button
            onClick={updateProfile}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save ✅
          </button>
        </>
      )}
    </div>
  );
}

export default Profile;