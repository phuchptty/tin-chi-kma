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
module.exports = {
    parseInitialFormData,
    parseString,
    parseSelector
}
