const md5 = require('md5');
const utils = require("../utils");
module.exports = function login(credentials, jar, $, HOST_API) {
    if (!credentials.jar) {
        const formLogin = {
            ...utils.parseInitialFormData($),
            ...utils.parseSelector($),
            txtUserName: credentials.user || "",
            txtPassword: md5(credentials.pass || ""),
            btnSubmit: 'Đăng nhập',
        };
        const loginPost = {
            url: `${HOST_API}/CMCSoft.IU.Web.Info/Login.aspx`,
            form: formLogin,
            followAllRedirects: true,
            method: "POST",
            jar,
        };
        return utils.requestWithLogin(loginPost);
    }
    else {
        const checkLogin = {
            url: `${HOST_API}/CMCSoft.IU.Web.Info/Login.aspx`,
            jar: credentials.jar,
            followAllRedirects: true,
        }
        return utils.requestWithLogin(checkLogin);
    }

}


