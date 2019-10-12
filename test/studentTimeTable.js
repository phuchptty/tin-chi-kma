const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const login = require("../index")({});
describe('Student TimeTable', function() {
    var api, global = { semesters: null, timetable: null };
    // before(function() {
    //     this.skip();
    // });
    beforeEach(function() {
        return login({ user: "CT040238", pass: "22/05/2001" })
            .then(data => {
                api = data;
            })
    });
    describe("Show Semesters", function() {
        it('Show All Semesters', function() {
            api.studentTimeTable.showSemesters()
                .then(semesters => {
                    global.semesters = semesters;
                    should.exist(semesters);
                    semesters.forEach(semester => {
                        semester.should.be.an('object');
                        expect(semester).to.have.all.keys('value', 'name');
                    });
                })
        });
    });
    describe("Show Schedule", function() {
        it('Show Schedule of Semester', function() {
            this.timeout(5000);
            api.studentTimeTable.showTimeTable()
                .then(function(timetable) {
                    timetable.forEach(function(classroom) {
                        classroom.should.be.an('object');
                        expect(classroom).to.have.all.keys('day', 'subjectCode', 'subjectName', 'className', 'teacher', 'lesson', 'room')
                    })
                })
        });
    });
});
