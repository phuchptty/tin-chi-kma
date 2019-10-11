const utils = require("./utils");
const jar = utils.createJar();

module.exports = (config = {}) => {
    config = { ...utils.configDefault, ...config };
    const init = async function() {
        try {
            const $ = await utils.initRequest(jar, config.HOST_API);
            return { jar, $ };
        } catch (error) {
            console.log(error.stack)
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
