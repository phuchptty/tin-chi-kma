const login = require("../index")({});
login({user: 'CT030208', pass: 'cuongdeptra'},function(error, api){
    console.log(error, api);
})
