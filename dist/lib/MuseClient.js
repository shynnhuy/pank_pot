"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Utils_1 = require("./Utils");
const popyt_1 = require("popyt");
const settings_1 = __importDefault(require("../settings"));
const path_1 = __importDefault(require("path"));
class MuseClient extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.commands = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.utils = new Utils_1.Utils();
        this.youtube = new popyt_1.YouTube(process.env.YOUTUBE_API_KEY);
        this.settings = settings_1.default;
    }
    login(token) {
        const _super = Object.create(null, {
            login: { get: () => super.login }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.login.call(this, token);
            yield this.utils.loadModules(`..${path_1.default.sep}commands`);
            yield this.utils.loadModules(`..${path_1.default.sep}events`);
            return token;
        });
    }
    /**
     * Getter $commands
     * @return {Collection<string, CommandProps}
     */
    get $commands() {
        return this.commands;
    }
    /**
     * Getter $aliases
     * @return {Collection<string, string>}
     */
    get $aliases() {
        return this.aliases;
    }
    /**
     * Getter $utils
     * @return {Utils}
     */
    get $utils() {
        return this.utils;
    }
    /**
     * Getter $settings
     * @return {settings}
     */
    get $settings() {
        return this.settings;
    }
    /**
     * Getter $youtube
     * @return {YouTube}
     */
    get $youtube() {
        return this.youtube;
    }
}
exports.default = MuseClient;
