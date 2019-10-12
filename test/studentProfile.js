const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const login = require("../index")({});
describe('Student Profile', function() {
    var api;
    // before(function() {
    //     this.skip();
    // });
    beforeEach(function() {
        return login({ user: "CT040238", pass: "22/05/2001" })
            .then(data => {
                api = data;
            })
    });
    describe("Show Infomation", function() {
        it('Show All Information', function() {
            api.studentProfile.show()
                .then(infomation => {
                    should.exist(infomation);
                    infomation.should.be.an('object');
                    expect(infomation).to.have.all.keys('displayName', 'studentCode', 'gender', 'birthday');
                })
        });
    });
});
