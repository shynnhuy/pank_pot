"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
require('dotenv').config();
require('./extensions');
const MuseClient_1 = __importDefault(require("./lib/MuseClient"));
exports.client = new MuseClient_1.default();
exports.client.login(process.env.TOKEN);
