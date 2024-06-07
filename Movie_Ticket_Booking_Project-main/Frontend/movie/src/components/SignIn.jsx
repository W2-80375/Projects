import React,{useState} from 'react';

import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'; 
import "./signin.css"



function SignIn() {
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const notifyError=(msg)=>toast.error(msg);
const notifySuccess=(msg)=>toast.success(msg);


// const postData = () => {
//   fetch("http://localhost:4000/login", {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password
//     })
//   })
//     .then(res => {
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);

//       if (data.error) {
//         notifyError(data.error);
//       } else {
//         notifySuccess(data.message);
//         localStorage.setItem("jwt", data.token);
//         localStorage.setItem("userDetails", (data.user_id));
//         navigate("/")

//       }
//     })
//     .catch(error => {
//       console.error("Error during fetch:", error);
//       notifyError("An error occurred during the login process.");
//     });
// };

const postData = () => {
  fetch("http://localhost:4000/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log(data);

      if (data.error) {
        notifyError(data.error);
      } else {
        notifySuccess(data.message);

        if (data.role === 'admin') {
          localStorage.setItem("adminToken", data.token);
          localStorage.setItem("userDetails", (data.user_id));
          navigate('/adminhome');
        } else {
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("userDetails", (data.user_id));
          navigate('/');
        }
      }
    })
    .catch(error => {
      console.error("Error during fetch:", error);
      notifyError("An error occurred during the login process.");
    });
};


  return (
    <div className='signin'>
      <div className='from-container'>
        <div className='loginForm'>
          <h3>LogIn Here</h3>
          <div>
            <input type='email' 
            name='email' 
            id='email' 
            placeholder='Enter Your Email' 
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div>
            <input type='password'
             name='password'
              id='password'
              placeholder='Enter Your Password'
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}} 
              />
          </div>
          <input type='submit'
           id='login'
           onClick={()=>{postData()}}
             />
          <div className='loginform'>
            Don't have account ?
            <Link to='/signup'>
              <span style={{color: "blue", cursor:"pointer"}}> SignUp</span>
            </Link>

          </div>
        </div>

      </div>
      
    </div>
  )
}

export default SignIn
