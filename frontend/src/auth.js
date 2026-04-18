import React, { useState } from "react";
import { API } from "./api";  // 🔥 top lo undali

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 REGISTER
  const handleRegister = async () => {
    try {
      if (password.length < 6) {
        alert("Password must be at least 6 characters ❌");
        return;
      }

      const res = await fetch(`${API}/api/auth/register`, {  // ✅ correct API
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Registered Successfully ✅");
        window.location.reload(); // 🔥 auto login
      } else {
        alert(data.msg || "Register Failed ❌");
      }

    } catch (err) {
      console.error(err);
      alert("Error occurred ❌");
    }
  };

  // 🔹 LOGIN
  const login = async () => {
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.reload();
      } else {
        alert(data.msg || "Login failed ❌");
      }

    } catch (err) {
      console.log(err);
      alert("Error occurred ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow w-80">

        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* NAME only for register */}
        {!isLogin && (
          <input
            className="w-full border p-2 mb-3"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          className="w-full border p-2 mb-3"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {isLogin ? (
          <button
            type="button"   // 🔥 important
            onClick={login}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRegister}
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Register
          </button>
        )}

        <p
          className="text-center mt-3 text-sm text-blue-500 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New user? Register"
            : "Already have account? Login"}
        </p>

      </div>
    </div>
  );
}

export default Auth;