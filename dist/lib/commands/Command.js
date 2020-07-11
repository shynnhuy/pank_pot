"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const index_1 = require("../../index");
function Command(info) {
    return function (target) {
        var _a, _b;
        info = Object.assign(Object.assign({}, info), { name: info.name.toLowerCase() });
        info.aliases = (_a = info.aliases) === null || _a === void 0 ? void 0 : _a.map(alias => alias.toLowerCase());
        target.prototype.info = Object.assign({}, info);
        if (index_1.client.$commands.get(info.name))
            return console.error(`⚠️ Duplicate command names found: ${info.name}`);
        index_1.client.$commands.set(info.name, { info, executor: new target() });
        (_b = info.aliases) === null || _b === void 0 ? void 0 : _b.forEach(alias => {
            if (index_1.client.$aliases.get(alias))
                return console.error(`⚠️ Duplicate command aliases found: ${alias}`);
            if (index_1.client.$aliases.get(info.name) || index_1.client.$commands.get(alias)) {
                return console.error(`⚠️ Command name clashing with command alias: ${alias}`);
            }
            index_1.client.$aliases.set(alias, info.name);
        });
    };
}
exports.Command = Command;
