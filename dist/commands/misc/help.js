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
const index_1 = require("../../index");
const Command_1 = require("../../lib/commands/Command");
let default_1 = class {
    constructor() {
        this.execute = (message, args) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // @ts-ignore
            const help = this.info;
            const { prefixes } = index_1.client.$settings.config;
            const thumbnail = (_a = index_1.client.user) === null || _a === void 0 ? void 0 : _a.displayAvatarURL({
                dynamic: false,
                format: "png",
                size: 2048,
            });
            const embed = new discord_js_1.MessageEmbed()
                .setColor("RANDOM")
                .setThumbnail(thumbnail)
                .setFooter(`Requested by ${message.author.tag}`)
                .setTimestamp();
            if (args[0]) {
                const command = index_1.client.$commands.get(args[0]) ||
                    index_1.client.$commands.get(index_1.client.$aliases.get(args[0]));
                if (!command)
                    return yield this.execute(message, []);
                const aliasesPresent = typeof command.info.aliases !== "undefined" &&
                    command.info.aliases.length > 0;
                const permissionsRequired = typeof command.info.permissions !== "undefined" &&
                    command.info.permissions.length > 0;
                embed.setTitle(`${command.info.name.toUpperCase()} COMMAND`);
                embed.setDescription([
                    `${command.info.description || "No description has been set"}`,
                    `Permissions required: ${permissionsRequired
                        ? `\`${command.info.permissions.join(" | ")}\``
                        : "`None`"}`,
                ].join("\n"));
                embed.addField("Usage", `\`${prefixes[0]}${command.info.name}${typeof command.info.usage !== "undefined"
                    ? ` ${command.info.usage}`
                    : ""}\``);
                embed.addField("Aliases", `${aliasesPresent
                    ? command.info.aliases.map((alias) => `\`${alias}\``).join(", ")
                    : "`None`"}`);
                message.channel.send(embed);
                return true;
            }
            const categories = [
                ...new Set(index_1.client.$commands.map((command) => command.info.category)),
            ];
            embed.setTitle("-= COMMAND LIST =-");
            embed.setDescription([
                `**Prefixes:** ${prefixes
                    .map((prefix) => `\`${prefix}\``)
                    .join(" | ")}`,
                `<> : Bắt buộc | [] : Tùy chọn`,
                `Dùng \`${prefixes[0]}${help.name} ${help.usage}\` để xem chi tiết.`,
            ].join("\n"));
            let categorisedCommands;
            let uncategorised;
            for (const category of categories) {
                categorisedCommands = index_1.client.$commands.filter((cmd) => cmd.info.category === category);
                const info = category || "Uncategorised";
                const commands = categorisedCommands
                    .map((cmd) => `\`${cmd.info.name}\``)
                    .join(", ");
                if (info === "Uncategorised")
                    uncategorised = { info, commands };
                else
                    embed.addField(category || "Uncategorised", commands);
            }
            if (uncategorised)
                embed.addField(uncategorised.info, uncategorised.commands);
            message.channel.send(embed);
            return true;
        });
    }
};
default_1 = __decorate([
    Command_1.Command({
        name: "help",
        usage: "[command:string]",
        description: "Need some help with commands because they are too complicated? Look no further! I am here to your aid!",
        category: "Miscellaneous",
    })
], default_1);
