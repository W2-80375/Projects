import React,{useState} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import "./signup.css"

function SignUp() {

  const navigate = useNavigate();
  const [fname , setFname] = useState("");
  const [lname, setLname] = useState("");
  const [date, setDate] = useState("");
  const [pnum, setPnum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notifyError=(msg)=>toast.error(msg);
  const notifySuccess=(msg)=>toast.success(msg);

// use Regex for valid email or password 
const emailRegex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex=/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;


 const postData=()=>{
//  check Email
if(!emailRegex.test(email)){
  notifyError("Enter valid email");
  return
}else if(!passwordRegex.test(password)){
  notifyError("Please Enter Strong Password, one lowercase letters, one uppercase letters, alphanumeric characters, one Special character #,@,?");
  return

}
   // sending data to server we using fetch
   fetch("http://localhost:4000/user", { 
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        first_name:fname,
        last_name:lname,
        date_of_birth:date,
        mob_no:pnum,
        email_id:email,
        password:password
      })
    }).then(res =>{
      // console.log(res.status)
      // console.log(res.ok)
      return  res.json()
    })//return response callback function 
      .then(data => {
        if (data.error) {
          notifyError(data.error) //show alert
        } else {
          notifySuccess(data.message)
          navigate("/signin")
        }
        console.log(data)
      })
  }

   
  return (
    <div className='signup'>
    <div className='form-container'>
    <div className='form'>
          <p className='para'> Registration Here</p>
          <div>
            <input type='text' name='fname' id='fname' placeholder='Enter Your First Name' value={fname} onChange={(e)=>{setFname(e.target.value)}} />
          </div>
          <div>
            <input type='text' name='lname' id='lname' placeholder='Enter Your Last Name' value={lname} onChange={(e)=>{setLname(e.target.value)}} />
          </div>
          <div>
            <input type='date' name='date' id='date' placeholder='Enter Your date of birth' value={date} onChange={(e)=>{setDate(e.target.value)}} />
          </div>
          <div>
            <input type='number' name='phone' id='phone' placeholder='Enter Your phone Number' value={pnum} onChange={(e)=>{setPnum(e.target.value)}}/>
          </div>
          <div>
            <input type='email' name='email' id='email' placeholder='Enter Your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <div>
            <input type='password' name='password' id='password' placeholder='Enter Your password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
          </div>

        <p className='loginPara' style={{fontSize: '14px' , margin: "3px 0px"}}>By signing up, you agree to out terms, <br />privacy policy and cookies policy.</p>
        <input type="submit" id='submit-btn' value="Sign Up" onClick={()=>{postData()}} />
        </div>
        <div className='form2' >
            Already have an account ? 
            <Link to='/signin'>
            <span style={{color: 'blue', cursor: 'pointer'}}> SignIn.</span>
            </Link>
           
        </div>

    </div>
    </div>
  )
}

export default SignUp
