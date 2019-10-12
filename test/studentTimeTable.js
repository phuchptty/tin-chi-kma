const assert = require('assert');
const login = require("../index")({});
describe('Student TimeTable', function() {
    var api, semesters, timetable;
    beforeEach(function() {
        return login({ user: "CT040238", pass: "22/05/2001" })
            .then(data => {
                api = data;
            })
    });
    describe("Show Semesters", function() {
        it('Show All Semesters', function(done) {
            (async function() {
                semesters = await api.studentTimeTable.showSemesters();
                if (Array.isArray(semesters)) done();
                // console.log(semesters);
            })();
        });
    });
    describe("Show Schedule", function() {
        it('Show Schedule of Semester', function(done) {
            this.timeout(5000);
            (async function() {
                timetable = await api.studentTimeTable.showTimeTable();
                if (Array.isArray(timetable)) done();
                // console.log(timetable);
            })();
        });
    });
});
