const requestPm = require("request-promise");
const cheerio = require("cheerio");
const utils = require("./utils")
const request = requestPm.defaults({
    transform: function(body) {
        let $ = cheerio.load(body);
        let error_login = $("#lblErrorInfo").text();
        if (error_login && error_login.trim()) return Promise.reject(error_login.trim());
        return $;
    },
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) coc_coc_browser/76.0.114 Chrome/70.0.3538.114 Safari/537.36',
        "Content-Type": "application/x-www-form-urlencoded"

    },
    jar: true,
    followAllRedirects: true
});

const init = function({ HOST_API = "http://115.146.127.72" }) {
    let jar = request.jar();
    return request({
        url: `${HOST_API}/CMCSoft.IU.Web.Info/Login.aspx`,
        jar
    }).then(($) => ({ jar, $ }))
}
module.exports = (config = {}) => {

    return async function(options = {}, callback) {
        const { jar, $ } = await init(config);
        require("./src/")({ config, jar, request, utils, $ })(options, callback);
    }
}
