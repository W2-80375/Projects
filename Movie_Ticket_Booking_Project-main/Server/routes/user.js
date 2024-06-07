const config=require('config');
const mysql=require('mysql');
const cors=require('cors');
const express=require('express');
const app =  express.Router();


app.use(express.json());
app.use(cors());


let connectionDetails={
    host: config.get("SERVER"),
    database: config.get("DATABASE"),
    user: config.get("USER"),
    password: config.get("PASSWORD"),
}
app.get("/",(req,res)=>{
    let connection=mysql.createConnection(connectionDetails);
    let statement = 'select * from users';
    connection.query(statement,(error,result)=>{
        if(error == null){
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify(result));
            connection.end();
            res.end();
        }else{
            res.setHeader("Content-Type","application/json");
            res.write(JSON.stringify(error));
            console.log(error);
            connection.end();
            res.end();
        }
    })
})
app.get("/:user_id", (request, response) => {
    const userid = request.params.user_id;
    let connection = mysql.createConnection(connectionDetails);
  
    const statement = "SELECT * FROM users WHERE user_id = ?";
  
    connection.query(statement, [userid], (error, result) => {
      if (error == null) {
        response.setHeader("Content-Type", "application/json");
        response.send(JSON.stringify(result));
      } else {
        response.setHeader("Content-Type", "application/json");
        response.send(JSON.stringify(error));
      }
  
      connection.end();
    });
  });


app.post('/', (req, res) => {
  const { email, password } = req.body;

  connectionDetails.query(
      'SELECT user_id, first_name, last_name, role FROM users WHERE email_id = ? AND password = ?',
      [email, password],
      (err, results) => {
          if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
              return;
          }

          if (results.length === 1) {
              const user = results[0];

              if (user.role === 'user') {
                  // Generate a JWT token
                  const token = jwt.sign({ user_id: user.user_id, role: user.role }, config.get('jwtSecret'), {
                      expiresIn: '1h'  // Token expiration time, adjust as needed
                  });

                  // Return user details and token upon successful login
                  res.status(200).json({
                      user_id: user.user_id,
                      first_name: user.first_name,
                      last_name: user.last_name,
                      role: user.role,
                      token: token
                  });
              } else if (user.role === 'admin') {
                  res.status(200).json({
                      user_id: user.user_id,
                      first_name: user.first_name,
                      last_name: user.last_name,
                      role: user.role
                      // token: token
                  });
              } else {
                  // Incorrect credentials
                  res.status(401).send('Invalid email or password');
              }
          }
      }
  );
});


app.put("/:user_id", (req, res) => {
  const userid = req.params.user_id;
const { first_name, last_name, email_id, password, mob_no, date_of_birth } = req.body;


const formattedDateOfBirth = date_of_birth ? date_of_birth.substring(0, 10) : null;

// console.log('Received update request for user:', req.body);

let connection = mysql.createConnection(connectionDetails);
const statement = "UPDATE users SET first_name=?, last_name=?, email_id=?, password=?, mob_no=?, date_of_birth=? WHERE user_id=?";

connection.query(statement, [first_name, last_name, email_id, password, mob_no, formattedDateOfBirth, userid], (error, results) => {
  if (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    // console.log('User details updated successfully:', results);
    res.json({ success: true, message: 'User details updated successfully' });
  }

  connection.end();
});

});



module.exports =app;