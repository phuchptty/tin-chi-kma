const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const login = require("../index")({});
describe('Study Register', function() {
    var api, global = { courses: null, years: null };
    // before(function() {
    //     this.skip();
    // });
    beforeEach(function() {
        return login({ user: "CT040238", pass: "22/05/2001" })
            .then(data => {
                api = data;
            })
    });
    describe("Get Academy Years", function() {
        it('Show Academy Years', function() {
            api.studyRegister.showAcademicYears()
                .then(function(years) {
                    global.years = years;
                    should.exist(years);
                    years.forEach(year => {
                        year.should.be.an('object');
                        expect(year).to.have.all.keys('value', 'name');
                    });
                });
        });
    });
    describe("Show Courses", function() {
        it('Show Courses of User', function() {
            api.studyRegister.showCourses(global.years[global.years.length - 1].value)
                .then(async function(courses) {
                    global.courses = courses;
                    should.exist(courses);
                    courses.forEach(course => {
                        course.should.be.an('object');
                        expect(course).to.have.all.keys('value', 'name');
                    });
                })
        });
    });

    describe("Get Course", function() {
        it('Get Class From Course', function() {
            api.studyRegister.showClasses(global.years[global.years.length - 1].value, global.courses[global.courses.length - 1].value)
                .then(function(listClass) {
                    should.exist(listClass);
                    listClass.forEach(classroom => {
                        classroom.should.be.an('object');
                        expect(classroom).to.have.all.keys('valueInput', 'nameClass', 'codeClass', 'time', 'place', 'teacher', 'siso', 'soDK');
                        classroom.should.be.an('object');
                    });
                })
        });
    });
});
