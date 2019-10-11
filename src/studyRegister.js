module.exports = function({ api, utils, config }) {
    const { HOST_API } = config;
    const registerUrl = `${HOST_API}/CMCSoft.IU.Web.info/StudyRegister/StudyRegister.aspx`;

    function loadRegister() {
        return utils.requestWithLogin({
            url: registerUrl,
            jar: api.jar
        });
    }
    async function showAcademicYears(callback) {
        try {
            const $ = await loadRegister();
            const years = Array.from($('select[name="drpAcademicYear"] > option'))
                .map(e => Object({
                    value: $(e).attr('value'),
                    name: $(e).text(),
                    selected: !!$(e).attr("selected"),
                }));
            if (typeof callback == "function") callback(null, years);
            else return Promise.resolve(years);
        } catch (error) {
            if (typeof callback == "function") callback(error);
            else return Promise.reject(error);
        }

    }

    async function changeAcademicYear(drpAcademicYear) {
        let $ = await loadRegister();
        const currentAcademicYear = $('select[name="drpAcademicYear"] > option[selected="selected"]').attr('value');
        if(currentAcademicYear == drpAcademicYear) return $;
        const selectorData = utils.parseSelector($);
        const initialFormData = utils.parseInitialFormData($);
        selectorData.drpAcademicYear = drpAcademicYear;
        initialFormData.__EVENTTARGET = "drpAcademicYear";
        $ = await utils.requestWithLogin.post({
            url: registerUrl,
            form: {
                ...initialFormData,
                ...selectorData
            },
            jar: api.jar,
        })
        return $;
    }
    async function showCourses(drpAcademicYear, callback) {
        try {
            let $ = await changeAcademicYear(drpAcademicYear);
            const courses = Array.from($('select[name="drpCourse"]').children('option[value!=""]')).map((element) => {
                return { name: $(element).text(), value: $(element).attr('value') };
            })
            if (typeof callback == "function") callback(null, courses);
            else return Promise.resolve(courses);
        } catch (error) {
            if (typeof callback == "function") callback(error);
            else return Promise.reject(error);
        }
    }
    async function requestCourse(drpAcademicYear, drpCourse) {
        const $ = await changeAcademicYear(drpAcademicYear);
        const selectorData = utils.parseSelector($);
        const initialFormData = utils.parseInitialFormData($);
        selectorData.drpCourse = drpCourse;
        selectorData.drpWeekDay = 0;
        selectorData.btnViewCourseClass = "Hiển thị lớp";
        return await utils.requestWithLogin.post({
            url: `${HOST_API}/CMCSoft.IU.Web.info/StudyRegister/StudyRegister.aspx`,
            form: {
                ...initialFormData,
                ...selectorData
            },
            jar: api.jar
        })
    }

    async function showClasses(drpAcademicYear, drpCourse, callback) {
        const $ = await requestCourse(drpAcademicYear, drpCourse);
        const listClass = Array.from($('#gridRegistration > tbody > tr:not(:first-child)')).map(element => {
            const [valueInput, nameClass, codeClass, time, place, teacher, siso, soDK] = Array.from($(element).children('td:not(:first-child)')).map((e, i) => {
                if (i == 0) return Array.from($(e).find('input')).map(elem => Object({ [$(elem).attr('name')]: $(elem).attr('value') || '' })).reduce((a, b) => ({ ...a, ...b }));
                return utils.parseString($(e).text());
            });
            return { valueInput, nameClass, codeClass, time, place, teacher, siso, soDK }
        })
        if (typeof callback == "function") callback(null, listClass);
        else return Promise.resolve(listClass);
    }

    async function registerCourse({ drpCourse, rdiSelect }, callback) {
        // const $ = await requestCourse(drpCourse);
        // const selectorData = utils.parseSelector($);
        // const initialFormData = utils.parseInitialFormData($);
        // selectorData.btnUpdate = "Ðăng ký";
        // require("fs").writeFileSync('./1.json', JSON.stringify({
        //     ...initialFormData,
        //     ...selectorData,
        //     ...rdiSelect
        // },null,'\t'))
        // return request.post({
        //     url: `${HOST_API}/CMCSoft.IU.Web.info/StudyRegister/StudyRegister.aspx`,
        //     form: {
        //         ...initialFormData,
        //         ...selectorData,
        //         ...rdiSelect
        //     }
        // }).then(callback)
    }

    return {
        showAcademicYears,
        showCourses,
        showClasses,
        registerCourse,
    }
}
