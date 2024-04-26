import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { User } from "./client";

export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(user as User);
      navigate("/Kanbas/Account/Profile");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred during signup.");
      }
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <input
        className="form-control mb-1"
        placeholder="Username"
        value={user.username}
        onChange={(e) =>
          setUser({
            ...user,
            username: e.target.value,
          })
        }
      />
      <input
        className="form-control mb-3"
        placeholder="Password"
        value={user.password}
        onChange={(e) =>
          setUser({
            ...user,
            password: e.target.value,
          })
        }
      />
      <button className="btn btn-danger me-2" onClick={signup}>
        Signup
      </button>
      <button
        className="btn btn-danger"
        onClick={() => navigate("/Kanbas/Account/Signin")}
      >
        Swtich to Sign In
      </button>
    </div>
  );
}
