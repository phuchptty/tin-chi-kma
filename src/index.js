const md5 = require('md5');
const cheerio = require("cheerio");
const apiBuilds = [
    // 'studyRegister',
    // 'studentTimeTable',
];
const login = require("./login");
module.exports = function({ utils, config }) {
    const { HOST_API } = config;
    return async function(credentials, callback) {
        const jar = utils.createJar();
        try {
            const $ = await utils.requestWithoutLogin({
                url: `${HOST_API}/CMCSoft.IU.Web.Info/Login.aspx`,
                jar,
            })
            await login(credentials, jar, $, HOST_API);
            const api = new Object();
            apiBuilds.map(e => {
                api[`${e}`] = require(`./${e}.js`)({ utils, config })
            })
            if (typeof callback === "function") {
                callback(undefined, api);
            }
            else {
                return Promise.resolve(api);
            }

        } catch (error) {
            if (typeof callback === "function") {
                callback(error);
            }
            else {
                return Promise.reject(error);
            }
        }

    }

}
