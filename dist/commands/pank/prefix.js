"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const Command_1 = require("../../lib/commands/Command");
const settings_1 = __importDefault(require("../../settings"));
// import Keyv from "keyv";
let default_1 = class {
    constructor() {
        this.execute = (message, args) => __awaiter(this, void 0, void 0, function* () {
            // const keyv = new Keyv();
            // keyv.set('prefix', ".");
            const embed = new discord_js_1.MessageEmbed()
                .setColor("RANDOM")
                .setFooter(`Requested by ${message.author.tag}`)
                .setTimestamp();
            message.channel.startTyping();
            embed.setTitle("Pảnk Prefix");
            embed.setDescription([
                `✅ Dùng \`${settings_1.default.config.prefixes}\` trước câu lệnh để sử dụng Pảnk ✅`,
            ]);
            message.channel.send(embed);
            message.channel.stopTyping();
            return true;
        });
    }
};
default_1 = __decorate([
    Command_1.Command({
        name: "prefix",
        category: "Pảnk Commands",
        description: "Xem prefix của Pảnk.",
    })
], default_1);
