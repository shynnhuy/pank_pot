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
const axios_1 = __importDefault(require("axios"));
const Command_1 = require("../../lib/commands/Command");
let default_1 = class {
    constructor() {
        this.execute = (message, args) => __awaiter(this, void 0, void 0, function* () {
            const embed = new discord_js_1.MessageEmbed()
                .setColor("RANDOM")
                .setFooter(`Requested by ${message.author.tag}`)
                .setTimestamp();
            if (!args[0]) {
                message.channel.startTyping();
                const fetched = yield axios_1.default.get("https://meme-api.herokuapp.com/gimme");
                embed.setTitle(fetched.data.title);
                embed.setImage(fetched.data.url);
                embed.setDescription(`Link ${fetched.data.postLink} | Subreddit: ${fetched.data.subreddit}`);
                message.channel.stopTyping();
                message.channel.send(embed);
                return true;
            }
            message.channel.startTyping();
            axios_1.default
                .get(`https://meme-api.herokuapp.com/gimme/${args[0]}`)
                .then((fetched) => {
                if (fetched.data) {
                    embed.setTitle(fetched.data.title);
                    embed.setImage(fetched.data.url);
                    embed.setDescription(`Link ${fetched.data.postLink} | Subreddit: ${fetched.data.subreddit}`);
                    message.channel.stopTyping();
                    message.channel.send(embed);
                    return true;
                }
            })
                .catch((err) => {
                embed.setColor("RED");
                embed.setTitle("Lỗi");
                embed.setDescription(`Không tìm thấy subreddit ${args[0]}`);
                message.channel.stopTyping();
                message.channel.send(embed);
                return false;
            });
            return true;
        });
    }
};
default_1 = __decorate([
    Command_1.Command({
        name: "meme",
        aliases: ["mm"],
        category: "Pảnk Commands",
        usage: "[subreddit: string]",
        description: "1 chiếc meme nhè nhẹ.\nSử dụng các subreddit để chọn meme.\nVí dụ: \`meme\`, \`animemes\`, \`dankmeme\`, \`wholesomememes\`, \`...\`",
    })
], default_1);
