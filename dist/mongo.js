"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keyv_1 = __importDefault(require("keyv"));
const db = new keyv_1.default("mongodb+srv://shynn:xuanhuy123@musepank.8k1ib.mongodb.net/discordbot?retryWrites=true&w=majority");
db.on("error", (err) => console.error("Keyv connection error:", err));
exports.default = db;
