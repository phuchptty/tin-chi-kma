const assert = require('assert');
const login = require("../index")({});
describe('Study Register', function() {
    var api, courses, years;
    beforeEach(function() {
        return login({ user: "CT040238", pass: "22/05/2001" })
            .then(data => {
                api = data;
            })
    });
    describe("Get Academy Year", function() {
        it('Show Academy Year', function(done) {
            (async function() {
                years = await api.studyRegister.showAcademicYears();
                if (Array.isArray(years)) done();
                console.log(years);
            })();
        });
    });
    describe("Show Course", function() {
        it('showCourse of User', function(done) {
            (async function() {
                courses = await api.studyRegister.showCourse(years[years.length - 1].value);
                if (Array.isArray(courses)) done();
                console.log(courses);
            })();
        });
    });

    describe("Get Course", function() {
        it('Get Class From Course', function(done) {
            (async function() {
                const listClass = await api.studyRegister.getCourse(years[years.length - 1].value, courses[courses.length - 1].value);
                if (Array.isArray(listClass)) done();
                console.log(listClass);
            })();
        });
    });
});
