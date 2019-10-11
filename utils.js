const cheerio = require("cheerio");
const requestPm = require("request-promise").defaults({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) coc_coc_browser/76.0.114 Chrome/70.0.3538.114 Safari/537.36',
        "Content-Type": "application/x-www-form-urlencoded"
    },
    jar: true,
});
const configDefault = {
    HOST_API: "http://qldt.actvn.edu.vn/"
};

const parseInitialFormData = ($) => {
    let form = $('form');
    let select = form.find('select');
    let input = form.find('input[type!="submit"][type!="checkbox"]');

    let data = {};

    input.each((i, elem) => {
        if ($(elem).attr('name')) data[$(elem).attr('name')] = $(elem).attr('value') || '';
    });

    select.each((i, elem) => {
        if ($(elem).attr('name')) data[$(elem).attr('name')] = $(elem).find($('[selected="selected"]')).attr('value');
    });

    // for (let key in data) {
    //     if (key.indexOf("btn") == 0) data[key] = undefined;
    // }
    return data;
}
const parseSelector = ($) => {
    let data = {};
    let form = $('form');
    let select = form.find('select');

    select.each((i, elem) => {
        let options = $(elem).find($('option[selected]'))[0];
        // let cooked_options = options.find((option) => $(option).attr('selected') ? true: false)[0];

        data[$(elem).attr('name')] = options && $(options).attr('value') || undefined;
    });
    // for (let key in data) {
    //     if (key.indexOf("btn") == 0) data[key] = undefined;
    // }

    return data;
}
const parseString = function(string) {
    let str = escape(string);
    str = str
        .replace(/%09+/g, '')
        .replace(/^%0A+|%0A+$/g, '')
    return unescape(str).trim(/\s+|\n+/);
}
const showError = function($) {
    const error = $("#lblErrorInfo").text();
    if (error && error.trim()) return error.trim();
    return undefined;
}
const requestWithoutLogin = requestPm.defaults({
    transform: function(body) {
        const $ = cheerio.load(body);
        const error = showError($);
        if (error) return Promise.reject(error);
        return $;
    },
    followAllRedirects: true
});
const requestWithLogin = requestPm.defaults({
    transform: function(body) {
        const $ = cheerio.load(body);
        const userFullName = $('#PageHeader1_lblUserFullName').text().toLowerCase();
        if (userFullName == 'khách') return Promise.reject(Error('Vui lòng đăng nhập lại'));
        return $;
    },
    followAllRedirects: true
})
const createJar = requestPm.jar;
const initRequest = (jar, HOST_API) => requestWithoutLogin({
    url: `${HOST_API}/CMCSoft.IU.Web.Info/Login.aspx`,
    jar,
})
module.exports = {
    parseInitialFormData,
    parseString,
    parseSelector,
    showError,
    configDefault,
    requestWithoutLogin,
    requestWithLogin,
    createJar,
    initRequest,
}
