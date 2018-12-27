const parseInitialFormData = ($) => {
    let form = $('form');
    let select = form.find('select');
    let input = form.find('input');

    let data = {};

    input.each((i, elem) => {
        data[$(elem).attr('name')] = $(elem).attr('value');
    });

    select.each((i, elem) => {
        data[$(elem).attr('name')] = $(elem).find($('[selected="selected"]')).attr('value');
    });

    return data;
}
const parseSelector = ($) => {
    let data = {};
    let form = $('form');
    let select = form.find('select');

    select.each((i, elem) => {
        let options = $(elem).find($('option'));
        let cooked_options = [];

        options.each((i, option) => {
            option = $(option);

            cooked_options.push({
                value: option.attr('value'),
                text: option.text(),
                selected: option.attr('selected') ? true : false
            });
        });

        data[$(elem).attr('name')] = cooked_options;
    });

    return data;
}
module.exports = {
    parseInitialFormData,
    parseSelector
}
