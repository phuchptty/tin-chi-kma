# TIN-CHI-KMA

Module tích hợp để tương tác với hệ thống đăng ký tín chỉ của CMCSoft .
Ví dụ:

[ĐẠI HỌC HÀNG HẢI](http://dktt.vimaru.edu.vn/CMCSoft.IU.Web.info/Login.aspx)

[ĐẠI HỌC VINH](http://student.vinhuni.edu.vn/cmcsoft.iu.web.info/)

...

## CÀI ĐẶT
Cài từ npmjs:
```bash

npm install --save tin-chi-kma

```

Cài từ github:
```bash

npm install --save Notekunn/tin-chi-kma

```
## KHỞI TẠO

`HOST_API` chính là phần url trước `CMCSoft.IU.Web.info` không bao gồm dấu `/`.

Khởi tạo api như sau:

```javascript
    const login = require("tin-chi-kma")({ HOST_API: 'HOST_API CUA BAN' });
    login({ user: '', pass: '' }, function(error, api) {

    })
```


## LOGIN
Đăng nhập vào trang đăng ký tín chỉ.

```javascript
   login({user:'MA SINH VIEN', pass: 'Mat khau'}, function(error,api){
      /*
        Biến error chứa lỗi, mang giá trị undefined nếu không có lỗi
        Biến api là 1 object chứa các api hoặc undefined nếu bị lỗi
      */
   })
   // Hoặc
   login({user:'MA SINH VIEN', pass: 'Mat khau'})
    .then(api => {})
    .catch(error => {})
```


## CÁC API

### api.studyRegister
Các api để đăng ký tín chỉ

#### api.studyRegister.showAcademicYears
api lấy các năm học(khóa học)

```javascript
   api.studyRegister.showAcademicYears(function(error, years){
       /*
       years là 1 mảng chứa các object { name: 'Tên Khóa', value: drpAcademicYear }
       */
   })
   //Hoặc
   api.studyRegister.showAcademicYears()
       .then()
       .catch();
```

#### api.studyRegister.showCourses
api lấy thông tin về các môn học

```javascript
   api.studyRegister.showCourses(drpAcademicYear, function(error, courses){
       /*
       courses là 1 mảng chứa các object { name: 'Tên Môn HỌC', value: drpCourse }
       */
   })
   //Hoặc
   api.studyRegister.showCourses(drpAcademicYear)
       .then()
       .catch();
```

#### api.studyRegister.showClasses
api lấy các lớp học của môn học đó

```javascript
    api.studyRegister.showClasses(drpAcademicYear, drpCourse, function(error, classes) {
        /*
        classes là mảng chứa các object về thông tin các lớp học
        */
    })
    //Hoặc
    api.studyRegister.showClasses(drpAcademicYear, drpCourse)
       .then()
       .catch();
```



### api.studentTimeTable
các api liên quan đến thời khóa biểu

#### api.studyRegister.showSemesters
api lấy các học kỳ

```javascript
    api.studyRegister.showSemesters(function(error, semesters) {
        /*
        semesters là mảng chứa các object về thông tin các học kỳ
           name: tên học kỳ
           value: chuỗi hash
        */
    })
    //Hoặc
    api.studyRegister.showSemesters()
        .then()
        .catch();
```

#### api.studentTimeTable.showTimeTable
api lấy thời khóa biểu

```javascript
    api.studentTimeTable.showTimeTable(semester /* giá trị value ở trên hoặc để undefined nếu lấy thời khóa biểu khóa mới nhât */ , function(scheduleData) {
        /*
           Trả về mảng thời khóa biểu
        */
    })
    //Hoặc
    api.studyRegister.showTimeTable(semester)
        .then()
        .catch();
```


### api.studentProfile
các api liên quan đến thông tin sinh viên

#### api.studentProfile.show
api show thông tin

```javascript
    api.studentProfile.show(function(error, information) {
        /*
        information object chứa thông tin về thông tin các học kỳ
            displayName
            studentCode
            gender
            birthday
        */
    })
    //Hoặc
    api.studyRegister.show()
        .then()
        .catch();
```