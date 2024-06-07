import React,{useState,useEffect} from 'react';
import { Link,useParams } from 'react-router-dom';
import "./Profile.css"

const Profile = () => {
  const { user_id } = useParams();
    const [user, setUser] = useState([]);
   

    useEffect(() => {
        fetch(`http://localhost:4000/user/${user_id}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Fetched movie details:', data);
    
            const selectedUser = data[0];
    
            setUser(selectedUser);
          })
          .catch(error => console.error('Error fetching movie details:', error));
      }, [user_id]);

  return (
    <div className='account'>
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
        <div className="card profile-card">
            <div className="card-header">
              <h3>Profile</h3>
            </div>
            <div className="card-body">
          
        <div className="user-details">
          <p><strong>First Name :</strong> {user.first_name}</p>
          <p><strong>Last Name :</strong> {user.last_name} </p>
          <p><strong>Email :</strong> {user.email_id}</p>
          <p><strong>Date of Birth :</strong> {user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString('en-CA') : null}</p>
          <p><strong>Mobile no :</strong> {user.mob_no}</p>
          <p><strong>Role :</strong> {user.role}</p>
        </div>

              <div className='loginform'>
            want to Update  ?
            <Link to={`/editAccount/${user.user_id}`}>
              <span style={{color: "blue", cursor:"pointer"}} >Edit Profile</span>
            </Link>
            </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
