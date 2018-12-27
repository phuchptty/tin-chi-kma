const login = require("../index")({});
const utils = require("../utils")
login({ user: 'CT030208', pass: 'cuongdeptrai' }, function(error, api) {
    api.studyRegister.showCourse(function({ courses }) {
        console.log(courses)
    })

    api.studyRegister.getCourse({ drpCourse: 'F92A602603194878848995D7E10CF3C8' }, function(classes) {
        console.log(classes)
    })
})
