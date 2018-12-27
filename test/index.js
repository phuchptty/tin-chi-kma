const login = require("../index")({});
const fs = require("fs");
login({ user: '', pass: '' }, function(error, api) {
    // api.studyRegister.showCourse(function( courses ) {
    //     console.log(courses)
    // })

    // api.studyRegister.getCourse({ drpCourse: 'F92A602603194878848995D7E10CF3C8' }, function(classes) {
    //     console.log(classes)
    // })

    // api.studentTimeTable.downloadTimeTable({ semester: 'f85b945085ee4b8898a30165ca1833ff' }, function(buffer) {
    //     fs.writeFileSync('TKBSV.xls', buffer);
    // })
})
