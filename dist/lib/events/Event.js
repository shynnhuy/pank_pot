"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const index_1 = require("../../index");
function Event(event) {
    return function (target) {
        index_1.client.on(event, new target().listen);
    };
}
exports.Event = Event;
