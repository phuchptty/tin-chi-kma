module.exports = function({ api, utils, config }) {
    const { HOST_API } = config;
    const profileUrl = `${HOST_API}/CMCSoft.IU.Web.Info/StudentProfileNew/HoSoSinhVien.aspx`;

    function loadProfile() {
        return utils.requestWithLogin({
            url: profileUrl,
            jar: api.jar
        });
    }

    async function show(callback) {
        try {
            const $ = await loadProfile();
            const displayName = ($('input[name="txtHoDem"]').val() || '') + " " + ($('input[name="txtTen"]').val() || '');
            const studentCode = $('input[name="txtMaSV"]').val() || '';
            const gender = $('select[name="drpGioiTinh"] > option[selected]').text();
            const birthday = $('input[name="txtNgaySinh"]').val() || '';
            const information = {
                displayName,
                studentCode,
                gender,
                birthday,
            }
            if (typeof callback == "function") callback(null, information);
            else return Promise.resolve(information);
        } catch (error) {
            if (typeof callback == "function") callback(error);
            else return Promise.reject(error);
        }
    }

    return {
        show,
    }

}
