module.exports = function({ request, utils, HOST_API }) {
    return {
        get$: () => request.get(`${HOST_API}/CMCSoft.IU.Web.Info/Reports/Form/StudentTimeTable.aspx`),
        async downloadTimeTable({ semester }, callback = f => f) {
            let { $ } = await this.get$();
            let selectorData = utils.parseSelector($);
            
            let initialFormData = utils.parseInitialFormData($);
            selectorData.drpTerm = 1;
            selectorData.drpSemester = semester || selectorData.drpSemester;
            selectorData.drpType = 'B';
            selectorData.btnView = "Xuất file Excel";
            request.post({
                url: `${HOST_API}/CMCSoft.IU.Web.Info/Reports/Form/StudentTimeTable.aspx`,
                form: {
                    ...initialFormData,
                    ...selectorData
                },
                transform: function(body, response, resolveWithFullResponse) {
                    return resolveWithFullResponse ? response : body;
                },
                encoding: null
            }).then(function(buffer) {
                callback(buffer)
            })
        }

    }
}
