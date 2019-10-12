const parser = require("parse-schedule-kma");
module.exports = function({ api, utils, config }) {
    const { HOST_API } = config;
    const timeTableUrl = `${HOST_API}/CMCSoft.IU.Web.Info/Reports/Form/StudentTimeTable.aspx`;
    function loadTimeTable() {
        return utils.requestWithLogin({
            url: timeTableUrl,
            jar: api.jar
        });
    }
    async function showSemesters(callback) {
        try {
            const $ = await loadTimeTable();

            const semesters = Array.from($('select[name="drpSemester"] > option')).map(e => ({
                value: $(e).attr('value'),
                name: $(e).text()
            }

            ));
            if (typeof callback == "function") callback(null, semesters);
            else return Promise.resolve(semesters);
        }

        catch (error) {
            if (typeof callback == "function") callback(error);
            else return Promise.reject(error);
        }
    }

    async function showTimeTable(drpSemester, callback) {
        try {
            const $ = await loadTimeTable();
            const selectorData = utils.parseSelector($);
            const initialFormData = utils.parseInitialFormData($);
            selectorData.drpTerm = 1;
            selectorData.drpSemester = drpSemester || selectorData.drpSemester;
            selectorData.drpType = 'B';
            selectorData.btnView = "Xuất file Excel";
            const buffer = await utils.requestWithLogin.post({
                url: timeTableUrl,
                form: {
                    ...initialFormData,
                    ...selectorData
                },
                transform: function(body, response, resolveWithFullResponse) {
                    return resolveWithFullResponse ? response : body;
                },
                encoding: null,
                jar: api.jar
            });
            const { scheduleData } = await parser(buffer);
            if (typeof callback == "function") callback(null, scheduleData);
            else return Promise.resolve(scheduleData);
        } catch (error) {
            if (typeof callback == "function") callback(error);
            else return Promise.reject(error);
        }

    }


    return {
        showSemesters,
        showTimeTable,
    }
}
