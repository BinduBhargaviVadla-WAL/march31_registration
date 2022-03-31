import axios from "axios";
import React from "react";
import { useState } from "react";

export default function Users() {
  let [status, setStatus] = useState("");
  let [username, setUsername] = useState();
  let [email, setEmail] = useState();
  const checkUsername = () => {
    axios
      .get(`/users/checkusername/${username}`)
      .then((res) => {
        console.log(res.data.status);
        if (!res.data.status) {
          setStatus("User Exists");
        } else {
          setStatus("");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error while checking email");
      });
  };
  const checkEmail = () => {
    axios
      .get(`/users/checkemail/${email}`)
      .then((res) => {
        console.log(res.data.status);
        if (!res.data.status) {
          setStatus("User Exists");
        } else {
          setStatus("");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error while checking email");
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let userOb = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.value,
      dob: event.target.dob.value,
    };
    axios
      .post("/users", userOb)
      .then((res) => {
        if (!res.data.status) {
          setStatus(res.data.debug_data);
        } else {
          setStatus("");
          alert("Registered Successfully");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error while saving data");
      });
  };

  return (
    <div>
      <h1>Registration Form</h1>
      <h2 className='check-msg'>{status}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            name='username'
            placeholder='Enter Username'
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            required
          />
          <button onClick={checkUsername} className='check-btn'>
            Check UserName
          </button>
        </div>
        <div>
          <input
            type='email'
            name='email'
            placeholder='Enter Email'
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
          <button onClick={checkEmail} className='check-btn'>
            Check Email
          </button>
        </div>

        <input
          type='password'
          name='password'
          placeholder='Enter Password'
          required
        />
        <br />
        <div>
          <label>Date of Birth:</label>
          <input type='date' name='dob' className='date-input' required />
        </div>

        <br />
        <button>Register</button>
      </form>
    </div>
  );
}
