const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Uncomment following code for connecting MySQL database
/*var connection  = mysql.createConnection({
    host: 'localhost',
    // port: 8889,
    // socketPath: '/tmp/mysql.sock', // '/Applications/MAMP/tmp/mysql/mysql.sock',
    user: 'root',
    password: 'password',
    database: 'ta_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('You are now connected...')
});*/


const students = [
  {id: 1, name: "John johansson", gpa: "3.6", interest: 5}, {id: 2, name: "Jane zuckerberg johansson", gpa: "3.1", interest: 2}, {id: 3, name: "Nicolaus Copernicus",gpa: "3.6", interest: 5}, {id: 4, name: "Cecilia Payne-Gaposchkin ",gpa: "3.6", interest: 3},
  {id: 5, name: "Anna K. Behrensmeyer", gpa: "3.5", interest: 4}, {id: 6, name: "Frieda Robscheit-Robbins", gpa: "3.2", interest: 4}, {id: 7, name: "Lene Vestergaard Hau", gpa: "3.8", interest: 3}, {id: 8, name: "Mildred S. Dresselhaus", gpa: "3.7", interest: 5}, {id: 9, name: "Patricia S. Goldman-Rakic", gpa: "3.7", interest: 4}, {id: 10, name: "Richard Phillips Feynman", gpa: "3.6", interest: 5}, {id: 11, name: "Werner Karl Heisenberg", gpa: "3.8", interest: 4.5}, {id: 12, name: "Sir Ernest Rutherford", gpa: "3.9", interest: 4.9},
  {id: 13, name: "Rita Levi-Montalcini", gpa: "3.4", interest: 2}, {id: 14, name: "Jake", gpa: "3.4", interest: 5}];


const profs = [{id:1, "name": "Alin Dobra"}, {id:2, "name": "Beverly Sanders"}, {id:3, "name": "Alper Ungor"}];
const profCourses = [{"id":1,
                      "name": "Alin Dobra",
                      "courses": [
                          {"name":"COP5615: Distributed Operating Systems",
                              "announcements": ["TA1 has released the grades for exam1", "TA2 is not taking office hours this week", "TA1 has is working on the evaluation of assignment 2"],
                              "messages": [{"from": "Manager X", "message": "Please send the list of TAs. I would have to assign TAs till tomorrow"},
                                            {"from": "TA2", "message": "Professor can you please provide the details for Grade policy for this subject ?"},
                                            {"from": "TA1", "message": "Please have a look into the list of students who want to retake the exam 2"}
                                          ]
                          },
                          {"name": "CEN5035: Software Engineering",
                              "announcements": ["TA1 has released the grades for exam1", "TA2 is not taking office hours this week", "TA1 has is working on the evaluation of assignment 2"],
                              "messages": [{"from": "Manager X", "message": "Please send the list of TAs. I would have to assign TAs till tomorrow"},
                                  {"from": "TA2", "message": "Professor can you please provide the details for Grade policy for this subject ?"},
                                  {"from": "TA1", "message": "Please have a look into the list of students who want to retake the exam 2"}
                              ]
                          },
                          {"name": "CIS6930: Database Implementation",
                              "announcements": ["TA1 has released the grades for exam1", "TA2 is not taking office hours this week", "TA1 has is working on the evaluation of assignment 2"],
                              "messages": [{"from": "Manager X", "message": "Please send the list of TAs. I would have to assign TAs till tomorrow"},
                                  {"from": "TA2", "message": "Professor can you please provide the details for Grade policy for this subject ?"},
                                  {"from": "TA1", "message": "Please have a look into the list of students who want to retake the exam 2"}
                              ]
                          }
                              ]},
                     {"id": 2,
                     "name": "Beverly Sanders",
                     "courses":
                          ["COP5556: Programming Language Principles",
                            "CIS6930: Concurrent Programming"]}
                    ];

const courseAnnouncements = {
    "COP5615: Distributed Operating Systems": {"announcements": ["TA1 has released the grade of exam1", "TA2 is not taking office hours this week", "TA1 has is working on the evaluation of assignment 2"]},
    "CEN5035: Software Engineering": {"announcements": ["TA1 has released the grade of exam1", "TA2 is not taking office hours this week", "TA1 has is working on the evaluation of assignment 2"]},
    "CIS6930: Database Implementation": {"announcements": ["TA1 has released the grade of exam1", "TA2 is not taking office hours this week", "TA1 has is working on the evaluation of assignment 2"]},
};


var getCourses = function (profName) {
  var prof;
  for (var index in profCourses){
    prof = profCourses[index];
    if (prof.name === profName)
          return prof.courses;
  }

  return [];
};

router.get('/students', (req, res) => {
    res.json(students);
});

router.get('/prof-courses', (req, res) => {
  res.json( getCourses(req.query.prof));
});

router.get('/course-announcements', (req, res) => {
    res.json(courseAnnouncements[req.query.course]);
});


module.exports = router;
