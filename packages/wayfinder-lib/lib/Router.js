"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wayfinder_datasource_1 = require("wayfinder-datasource");
class Router {
    fetchChannels(params) {
        const channels = (0, wayfinder_datasource_1.query)(params);
        return channels;
    }
}
const router = new Router();
exports.default = router;
//# sourceMappingURL=Router.js.map