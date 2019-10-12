const login = require("../index")({});
describe('Login', function() {
    // before(function() {
    //     this.skip();
    // });
    describe("Undefined user/pass", function() {
        it('Can not login without user', tryLoginFail(undefined));
        it('Can not login without pass', tryLoginFail("CT0302008", undefined));
    });

    describe("Incorrect user/pass", function() {
        it('Can not login with Incorrect user', tryLoginFail("CT023232", "1232"));
        it('Can not login with Incorrect pass', tryLoginFail("CT030208", "ashdsids"));
    });

    describe("Correct user/pass", function() {
        it('User 1', tryLoginSuccess("CT040322", "concavang02102011"));
        it('User 2', tryLoginSuccess("CT040238", "22/05/2001"));
    });
});

function tryLoginFail(user, pass) {
    return function(done) {
        login({ user, pass }, function(error, api) {
            if (error) done();
        })
    }
}
function tryLoginSuccess(user, pass) {
    return function(done) {
        login({ user, pass }, function(error, api) {
            if (!error) done();
            else console.log(error.stack)
        })
    }
}