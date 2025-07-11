const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Course } = require('../SchemaModels/CourseModel');

const testCourses = [{
  Code: 'Test1',
  Name: 'TestCourse1',
  Sem: 'Fall2017',
  Department: 'CSE',
  CourseCredits: 3,
  ProfessorFullName: 'TestProf1',
  ProfessorEmail: 'TestProf1TestProf1@ufl.edu',
  CourseScheduleLink: 'courseScheduleTest1',
  CourseSyllabusLink: 'courseSyllabusTest1',
  MaxStudents: 50,
  TAs: ['17162351']
}, {
  Code: 'Test2',
  Name: 'TestCourse2',
  Sem: 'Fall2017',
  Department: 'CSE',
  CourseCredits: 3,
  ProfessorFullName: 'TestProf2',
  ProfessorEmail: 'TestProf2TestProf2@ufl.edu',
  CourseScheduleLink: 'courseScheduleTest2',
  CourseSyllabusLink: 'courseSyllabusTest2',
  MaxStudents: 50,
  TAs: ['17162351']
}];

// beforeEach((done) => {
//   Course.remove({}).then(() => done());
// });

beforeEach((done) => {
  Course.remove({}).then(() => {
    Course.insertMany(testCourses);
  }).then(() => done());
});

describe('POST /courses', () => {

  it('should create a new course', (done) => {
    var CourseTest = new Course({
      Code: 'Test123',
      Name: 'TestCourse',
      Sem: 'Fall2017',
      Department: 'CSE',
      CourseCredits: 3,
      ProfessorFullName: 'TestProf',
      ProfessorEmail: 'TestProfTestProf@ufl.edu',
      CourseScheduleLink: 'courseScheduleTest',
      CourseSyllabusLink: 'courseSyllabusTest',
      MaxStudents: 50,
      TAs: ['17162351']
    });
    request(app)
      .post('/api/courses')
      .send(CourseTest)
      .expect(200)
      .expect((response) => {
        expect(response.body.Email).toBe(CourseTest.Email);
      })
      .end((error, response) => {
        if(error){
          return done(error);
        }
      Course.find({Code: 'Test123'}).then((courses) => {
        expect(courses.length).toBe(1);
        expect(courses[0].Code).toBe(CourseTest.Code)
        done();
      }).catch((error) => {
        done(error);
      })
      });
  });

  it('should not add course with empty body data', (done) => {
    request(app)
      .post('/api/courses')
      .send({})
      .expect(400)
      .end((error, response) => {
        if(error){
          return done(error);
        }
      Course.find().then((courses) => {
        expect(courses.length).toBe(2);
        done();
      }).catch((error) => {
        done(error);
      })
      });
  });
});

describe('Get /courses', () => {
  it('should get all courses', (done) => {
    request(app)
    .get('/api/courses')
    .expect(200)
    .expect((response) => {
      expect(response.body.length).toBe(2)
    })
    .end(done);
  })
});

describe('Get courses/Code', () => {
  it('should return course doc', (done) => {
    request(app)
    .get(`/api/courses/${testCourses[0].Code}`)
    .expect(200)
    .expect((response) => {
      expect(response.body[0].Code).toBe(testCourses[0].Code)
    })
    .end(done);
  });

  it('should return 404 if course not found', (done) => {
    var falseCourseCode = "invalidCourseCode";
    request(app)
    .get(`/api/courses/${falseCourseCode}`)
    .expect(404)
    .end(done);
  });
});

describe('Delete courses/Code', () => {
  it('should remove a course', (done) => {
    var courseCode = testCourses[0].Code;
    request(app)
    .delete(`/api/courses/${courseCode}`)
    .expect(200)
    .expect((response) => {
      expect(response.body.course.Code).toBe(courseCode)
    })
    .end((error, response) => {
      if(error){
        return done(error);
      }
      Course.find({Code: courseCode}).then((courses) => {
        expect(courses.length).toBe(0);
        done();
      }).catch((error) => done(error));
    });
  });

  it('should return 404 if course not found', (done) => {
    var falseCourseCode = "invalidCourseCode"
    request(app)
    .delete(`/api/courses/${falseCourseCode}`)
    .expect(404)
    .end(done);
  });
});

describe('Update courses/Code', () => {
  it('should update the course', (done) => {
    var courseCode = testCourses[0].Code;
    request(app)
    .patch(`/api/courses/${courseCode}`)
    .send({"ProfessorFullName": "TestProf3", "MaxStudents": 100})
    .expect(200)
    .expect((response) => {
      expect(response.body.course.ProfessorFullName).toBe('TestProf3');
      expect(response.body.course.MaxStudents).toBeA('number');
      expect(response.body.course.MaxStudents).toBe(100);
    })
    .end(done);
  });
});
