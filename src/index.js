const md5 = require('md5');
const cheerio = require("cheerio");
const apiBuilds = [
    'studyRegister',
    'studentTimeTable'
];
module.exports = function({ request, jar, utils, $, config: { HOST_API = "http://115.146.127.72" } }) {
    request = request.defaults({
        transform: function(body) {
            let $ = cheerio.load(body);
            if ($('#PageHeader1_lblUserFullName').text().toLowerCase() == 'khách') return Promise.reject('Vui lòng đăng nhập lại');
            return { $, body };
        },
        jar
    })
    return function({ user, pass }, callback = f => f) {
        return request.post({
                url: `${HOST_API}/CMCSoft.IU.Web.Info/Login.aspx`,
                form: {
                    ...utils.parseInitialFormData($),
                    ...utils.parseSelector($),
                    txtUserName: user,
                    txtPassword: md5(pass),
                    btnSubmit: 'Đăng nhập'
                },
                jar
            }).then(body => {
                const api = new Object();
                apiBuilds.map(e => {
                    api[`${e}`] = require(`./${e}.js`)({ request, utils, HOST_API })
                })
                callback(undefined, api);
            })
            .catch(e => {
                let [, error_message = ''] = (e + '').split(':');
                callback(error_message.trim())
            })

    }

}
