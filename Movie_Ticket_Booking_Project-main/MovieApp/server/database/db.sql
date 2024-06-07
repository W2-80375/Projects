CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT, 
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    date_of_birth DATE,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(20), 
    mobile CHAR(10));

INSERT INTO users VALUES(DEFAULT,"test","test","1997/10/10","test@gmail.com","test","1234567890");

CREATE TABLE movies(
    movie_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50),
    image VARCHAR(100),
    release_date DATE,
    rating float,
    description VARCHAR(512),
    duration TIME,
    language VARCHAR(20),
    review VARCHAR(150)
);


-- INSERT INTO movies VALUES(DEFAULT, 'Animal','animal.jpeg','2022-01-02',4, 'Ranvijay "Vijay" Singh is the son of Balbir Singh, a Delhi-based business magnate who heads the generational steel company called "Swastik Steels".','02:02:12','Hindi');
-- INSERT INTO movies VALUES(DEFAULT, 'Guntur Karam','gunturKaram.jpeg','2020-01-02',6, 'Follows Guntur Karam, the king of the underworld of Guntur city, as he falls in love with a journalist working to expose the illegal activities in the city.','02:12:02','Telugu');
-- INSERT INTO movies VALUES(DEFAULT, 'Joker', 'joker.jpg','02:12:02',2,'It is based on the 2019 eponymous non-fiction book by Anurag Pathak about Manoj Kumar Sharma, who overcame extreme poverty to become an Indian Police Service officer.','02:02:12','Hindi','2022-01-02','12thFail');


INSERT INTO movies(title,image,release_date,rating,description,duration,language,review) VALUES 
('Lagaan', 'lagaan.jpeg', '2001-06-15',4, 'A sports drama set during the British Raj, focusing on a cricket match.', '03:02:12', 'Hindi','cinematic masterpiece'),
('Queen', 'queen.jpg', '2013-03-07', 3, "A woman's journey of self-discovery after her wedding gets canceled.", '02:26:01', 'Hindi','heartwarming and relatable tale that resonates with audiences'),
('3 Idiots', '3idiot.jpeg', '2009-12-25',6, 'A comedy-drama about three friends navigating college life.', '02:50:20', 'Hindi','celebration of friendship and learning'),
('Andhadhun', 'andha.jpeg', '2018-10-05', 5, 'A dark comedy-thriller about a blind pianist caught in a web of crime.', '02:50:20', 'Hindi','thrilling rollercoaster of suspense and dark humor');

CREATE TABLE screens
      (screen_id INT PRIMARY KEY AUTO_INCREMENT,
      screen_name VARCHAR(100),
      status VARCHAR(15)
     );

     INSERT INTO screens VALUES(DEFAULT, 'Audi-1', 'Available');
     INSERT INTO screens VALUES(DEFAULT, 'Audi-2', 'Available');

CREATE TABLE theaters
(theatre_id INT PRIMARY KEY AUTO_INCREMENT,
theatre_name VARCHAR(100),
movie_id INT,
address VARCHAR(150),
rating INT,
total_seats INT,
FOREIGN KEY(movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO theaters VALUES(DEFAULT, 'PVR',6,'Pune',5, 20);
INSERT INTO theaters VALUES(DEFAULT, 'INOX', 7,'Pune',4, 20,);
INSERT INTO theaters VALUES(DEFAULT, 'Victory',8 ,'Pune',4.0, 20);
INSERT INTO theaters VALUES(DEFAULT, 'Abhiruchi',9 ,'Pune',4.2, 20);

select t.theatre_name,t.address,t.total_seats,m.title from theaters t inner join movies m where t.movie_id = m.movie_id;


CREATE TABLE shows
(show_id INT AUTO_INCREMENT,
date DATE,
start_time TIME,
screen_id INT,
theatre_id INT,
movie_id INT,
PRIMARY KEY(show_id),
FOREIGN KEY(screen_id) REFERENCES screens(screen_id),
FOREIGN KEY(theatre_id) REFERENCES theaters(theatre_id),
FOREIGN KEY(movie_id) REFERENCES movies(movie_id)
);

INSERT INTO shows VALUES(DEFAULT, '2024-01-01', '12:10:00', 1, 2, 6);



CREATE TABLE booking
(booking_id INT AUTO_INCREMENT,
number_of_seats INT,
timestamp DATETIME,
id INT,
show_id INT,
PRIMARY KEY(booking_id),
FOREIGN KEY(id) REFERENCES users(id),
FOREIGN KEY(show_id) REFERENCES shows(show_id)
);
INSERT INTO booking VALUES(DEFAULT,30,'2024-01-01 12:30:00', 1, 2);


CREATE TABLE show_seat
(show_seat_id INT AUTO_INCREMENT,
theatre_id INT,
status INT,
price FLOAT,
show_id INT,
booking_id INT,
seat_no INT,
PRIMARY KEY(show_seat_id),
FOREIGN KEY(theatre_id) REFERENCES theaters(theatre_id),
FOREIGN KEY(show_id) REFERENCES shows(show_id),
FOREIGN KEY(booking_id) REFERENCES booking(booking_id)
);

INSERT INTO show_seat VALUES(DEFAULT,2,1,'200.0',2,3,20);


-- CREATE TABLE reviews(
--     review_id INT PRIMARY KEY AUTO_INCREMENT,
--     movie_id INT, 
--     review TEXT, 
--     rating INT, 
--     id INT, 
--     FOREIGN KEY(movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
--     FOREIGN KEY(id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
--     UNIQUE(movie_id,id)
-- );

-- CREATE TABLE shares(
--     reviewid INT,
--     userid INT,
--     FOREIGN KEY(reviewid) REFERENCES reviews(id) ON DELETE CASCADE ON UPDATE CASCADE,
--     FOREIGN KEY(userid) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
--     UNIQUE(reviewid,userid)
-- );