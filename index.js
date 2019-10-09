const utils = require("./utils");
const jar = utils.createJar();

module.exports = (config = {}) => {
    config = { ...utils.configDefault, ...config };
    const session = new Object();
    const init = async function() {
        try {
            const $ = await utils.requestWithoutLogin({
                url: `${config.HOST_API}/CMCSoft.IU.Web.Info/Login.aspx`,
                jar
            })
            return { jar, $ };
        } catch (error) {
            return null;
        }
    }
    return async function(options = {}, callback) {
        const session = await init();
        if (!session) {
            throw Error("Server qldt không hoạt động.");
            return null;
        }
        return require("./src/")({ config,  utils })(options, callback);
    }
}
