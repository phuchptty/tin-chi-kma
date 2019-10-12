const apiBuilds = [
    'studyRegister',
    'studentTimeTable',
];
const login = require("./login");
module.exports = function({ utils, config }) {
    const { HOST_API } = config;
    return async function(credentials, callback) {
        const jar = utils.createJar();
        try {
            const $ = await utils.initRequest(jar, HOST_API);
            const api = new Object();
            api.jar = await login(credentials, jar, $, HOST_API);
            apiBuilds.map(e => {
                api[`${e}`] = require(`./${e}.js`)({ api, utils, config })
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
