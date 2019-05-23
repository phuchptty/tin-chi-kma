const login = require("../index")({});
const fs = require("fs");
login({ user: 'CT030208', pass: 'cuongnl5' }, function(error, api) {
    if(error) return console.error(error);
    // api.studyRegister.showCourse(function(courses) {
    //     console.log(courses.length);
    //     api.studyRegister.getCourse({ drpCourse: courses[2].value }, function(classes, $) {
    //         console.log(classes.length)
    //         let selectClass = classes.find((e) => e.nameClass.includes("AT15-08"))
    //         let rdiSelect = (selectClass && selectClass.valueInput) || {};
    //         fs.writeFileSync('./2.json', JSON.stringify({ drpCourse: courses[2].value, rdiSelect }))
    //         // api.studyRegister.registerCourse({ drpCourse: courses[2].value, rdiSelect }, function({ body }) {
    //         //     console.log(body)
    //         // });
    //     })
    // })
    //  api.studyRegister.registerCourse(require("./2.json"), function({ body }) {
    //             console.log(body)
    // });
    // api.studyRegister.getCourse({ drpCourse: 'F92A602603194878848995D7E10CF3C8' }, function(classes) {
    //     console.log(classes)
    // })

    // api.studentTimeTable.downloadTimeTable({ semester: 'f85b945085ee4b8898a30165ca1833ff' }, function(buffer) {
    //     fs.writeFileSync('TKBSV.xls', buffer);
    // })
    api.studentTimeTable.getSemester(console.log);
})
