const md5 = require('md5');
module.exports = function({ request, jar, utils, $, config: { HOST_API = "http://115.146.127.72" } }) {
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
            }).then($ => {
                const api = new Object();
                callback(undefined, api);
            })
            .catch(e => {
                let [, error_message = ''] = (e + '').split(':');
                callback(error_message.trim())
            })

    }

}
