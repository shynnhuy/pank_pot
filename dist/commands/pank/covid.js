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
const numeral_1 = __importDefault(require("numeral"));
const __1 = require("../..");
let default_1 = class {
    constructor() {
        this.execute = (message, args) => __awaiter(this, void 0, void 0, function* () {
            const devID = "333876263859126274";
            const dev = yield __1.client.users.fetch(devID);
            const embed = new discord_js_1.MessageEmbed()
                .setColor("RANDOM")
                .setFooter(`Requested by ${message.author.tag}`)
                .setDescription(`Command provided by ${dev}`)
                .setTimestamp()
                .setAuthor("Shynn Huy", "https://scontent.fdad3-3.fna.fbcdn.net/v/t1.0-9/31928823_815116595350232_1392791657107161088_n.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=P3i0mYvyhxIAX90XFyV&_nc_ht=scontent.fdad3-3.fna&oh=dfce66d63a04917e85aa9d735956e1ed&oe=5F45654A");
            const prettyPrintStat = (stat) => stat ? `+${numeral_1.default(stat).format("0.0a")}` : "+0";
            if (!args[0]) {
                message.channel.startTyping();
                const fetched = yield axios_1.default.get("https://disease.sh/v3/covid-19/all");
                const { cases, recovered, deaths, todayCases, todayRecovered, todayDeaths, } = fetched.data;
                embed.setTitle("Tình hình COVID-19 trên thế giới");
                embed.addFields({
                    name: "Số ca mắc trong ngày",
                    value: prettyPrintStat(todayCases),
                    inline: true,
                }, {
                    name: "Tổng số ca mắc",
                    value: numeral_1.default(cases).format("0,0"),
                    inline: true,
                }, { name: "\u200B", value: "\u200B" }, {
                    name: "Số ca khỏi trong ngày",
                    value: prettyPrintStat(todayRecovered),
                    inline: true,
                }, {
                    name: "Tổng số ca khỏi",
                    value: numeral_1.default(recovered).format("0,0"),
                    inline: true,
                }, { name: "\u200B", value: "\u200B" }, {
                    name: "Số ca chết trong ngày",
                    value: prettyPrintStat(todayDeaths),
                    inline: true,
                }, {
                    name: "Tổng số ca chết",
                    value: numeral_1.default(deaths).format("0,0"),
                    inline: true,
                });
                message.channel.stopTyping();
                message.channel.send(embed);
                return true;
            }
            message.channel.startTyping();
            axios_1.default
                .get(`https://disease.sh/v3/covid-19/countries/${args[0]}?strict=true`)
                .then((fetched) => {
                const { country, countryInfo, cases, recovered, deaths, todayCases, todayRecovered, todayDeaths, } = fetched.data;
                if (fetched.data) {
                    embed.setTitle(`Tình hình COVID-19 ở ${country}`);
                    embed.setImage(countryInfo.flag);
                    embed.addFields({
                        name: "Số ca mắc trong ngày",
                        value: prettyPrintStat(todayCases),
                        inline: true,
                    }, {
                        name: "Tổng số ca mắc",
                        value: numeral_1.default(cases).format("0,0"),
                        inline: true,
                    }, { name: "\u200B", value: "\u200B" }, {
                        name: "Số ca khỏi trong ngày",
                        value: prettyPrintStat(todayRecovered),
                        inline: true,
                    }, {
                        name: "Tổng số ca khỏi",
                        value: numeral_1.default(recovered).format("0,0"),
                        inline: true,
                    }, { name: "\u200B", value: "\u200B" }, {
                        name: "Số ca chết trong ngày",
                        value: prettyPrintStat(todayDeaths),
                        inline: true,
                    }, {
                        name: "Tổng số ca chết",
                        value: numeral_1.default(deaths).format("0,0"),
                        inline: true,
                    });
                    message.channel.stopTyping();
                    message.channel.send(embed);
                    return true;
                }
            })
                .catch((err) => {
                embed.setColor("RED");
                embed.setTitle("Lỗi");
                embed.setDescription(`Không tìm thấy countrycode ${args[0]}`);
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
        name: "covid",
        usage: "[countrycode: string]",
        category: "Pảnk Commands",
        description: `Kiểm tra tình hình Coronavirus trong nước và quốc tế.
Sử dụng countrycode như \`vn\`, \`usa\`, \`uk\`, \`bra\`, ... để xem tình hình covid nước đó.\n              
`,
    })
], default_1);
