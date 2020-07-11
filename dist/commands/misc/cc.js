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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../lib/commands/Command");
let default_1 = class {
    constructor() {
        this.execute = (message, args) => __awaiter(this, void 0, void 0, function* () {
            const embed = new discord_js_1.MessageEmbed()
                .setColor("RED")
                .setFooter(`Requested by ${message.author.tag}`)
                .setTimestamp();
            const amount = parseFloat(parseFloat(args[0]).toFixed(2));
            message.delete();
            if (!args[0]) {
                embed.setTitle("Lỗi");
                embed.setDescription([`Thêm số lượng tin nhắn cần xóa. \n Sử dụng: \`cc <amount>\``]);
                // message.channel.send(`Thêm số lượng tin nhắn cần xóa: cc <amount>`);
                message.channel.send(embed);
                return true;
            }
            if (isNaN(amount) || amount < 0 || amount > 100)
                return false;
            const fetched = yield message.channel.messages.fetch({ limit: amount });
            console.log(fetched.size + " messages found, deleting...");
            message.channel
                .bulkDelete(fetched)
                .catch((err) => message.channel.send(`Error: ${err}`));
            embed.setTitle("Clear Successfully");
            embed.setDescription([`${amount} tin nhắn đã bị xóa.`]);
            message.channel.send(embed);
            return true;
        });
    }
};
default_1 = __decorate([
    Command_1.Command({
        name: "cc",
        category: "Miscellaneous",
        usage: "<amount: number (1-100)>",
        description: "Xoá chat trong kênh hiện tại.",
    })
], default_1);
