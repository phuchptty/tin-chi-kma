module.exports = function({ request, utils, HOST_API }) {
    return {
        get$: request.get(`${HOST_API}/CMCSoft.IU.Web.info/StudyRegister/StudyRegister.aspx`),
        showCourse(callback) {
            this.get$
                .then(({ $ }) => {
                    let courses = Array.from($('select[name="drpCourse"]').children('option[value != ""]')).map((element) => {
                        return { name: $(element).text(), value: $(element).attr('value') };

                    })
                    if (typeof callback == "function") callback(courses);
                    return $;
                })
        },
        async getCourse({ drpCourse }, callback) {
            let { $ } = await this.get$;
            let selectorData = utils.parseSelector($);
            let initialFormData = utils.parseInitialFormData($);
            selectorData.drpCourse = drpCourse;
            selectorData.drpWeekDay = 0;
            selectorData.btnViewCourseClass = "Hiển thị lớp";
            return request.post({
                url: `${HOST_API}/CMCSoft.IU.Web.info/StudyRegister/StudyRegister.aspx`,
                form: {
                    ...initialFormData,
                    ...selectorData
                }
            }).then(({ $ }) => {
                let listClass = Array.from($('#gridRegistration > tbody > tr:not(:first-child)')).map(element => {
                    let [valueInput, nameClass, codeClass, time, place, teacher, siso, soDK] = Array.from($(element).children('td:not(:first-child)')).map((e, i) => {

                        if (i == 0) return Array.from($(e).find('input')).map(elem => {
                            return {
                                [$(elem).attr('name')]: $(elem).attr('value') || ''

                            }
                        }).reduce((a, b) => ({ ...a, ...b }));


                        return utils.parseString($(e).text())
                    });
                    return { valueInput, nameClass, codeClass, time, place, teacher, siso, soDK }
                })
                if (typeof callback == "function") callback(listClass, $);
                return { $ }
            })
        },
        async registerCourse({ drpCourse, rdiSelect, $ }, callback = f => f) {
            if (!$) $ = (await this.getCourse({ drpCourse })).$;
            let selectorData = utils.parseSelector($);
            let initialFormData = utils.parseInitialFormData($);
            selectorData.btnUpdate = "Ðăng ký";
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

    }
}
