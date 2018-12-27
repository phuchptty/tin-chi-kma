module.exports = function({ request, utils, HOST_API }) {
    return {
        get$: () => request.get(`${HOST_API}/CMCSoft.IU.Web.Info/Reports/Form/StudentTimeTable.aspx`),
        async downloadTimeTable(callback) {
            let $ = await this.get$();
            let selectorData = utils.parseSelector($);
            let initialFormData = utils.parseInitialFormData($);
        }

    }
}
