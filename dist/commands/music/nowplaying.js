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
const index_1 = require("../../index");
const Command_1 = require("../../lib/commands/Command");
const discord_js_1 = require("discord.js");
let default_1 = class {
    constructor() {
        this.execute = (message) => __awaiter(this, void 0, void 0, function* () {
            const { queue, player } = message.guild;
            if (typeof queue.current === 'undefined')
                return false;
            if (message.member.voice.channel !== queue.voiceChannel)
                return false;
            const embed = new discord_js_1.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Now Playing:')
                .setThumbnail(queue.current.thumbnail)
                .setFooter(`Requested by ${message.author.tag}`)
                .setTimestamp();
            this.setEmbed(embed, queue, player);
            const msg = yield message.channel.send(embed);
            const interval = setInterval(() => {
                this.setEmbed(embed, queue, player);
                msg.edit(embed);
            }, 5000);
            player.$nowPlayingInfo.push({ embed, interval, message: msg });
            return true;
        });
        this.setEmbed = (embed, queue, player) => __awaiter(this, void 0, void 0, function* () {
            const { current, upcoming, connection } = queue;
            const { title, url, duration, loop, requester, author, authorUrl } = current;
            const durationBar = player.durationBar(queue);
            const timeRemaining = index_1.client.$utils.formatSeconds(duration - (connection.dispatcher.streamTime / 1000));
            let upcomingVid;
            upcomingVid = upcoming[0] ? `[${index_1.client.$utils.truncateStr(upcoming[0].title, 20)}](${upcoming[0].url})` : 'None';
            upcomingVid = current.loop ? `[${index_1.client.$utils.truncateStr(current.title, 20)}](${current.url})` : upcomingVid;
            embed.setDescription(`[${title}](${url})\n${durationBar}`);
            embed.spliceFields(0, 6, { name: 'Thời lượng:', value: index_1.client.$utils.formatSeconds(duration), inline: true }, { name: 'Còn lại:', value: timeRemaining, inline: true }, { name: 'Lặp:', value: String(loop)[0].toUpperCase() + String(loop).substring(1), inline: true }, { name: 'Requested By:', value: requester.user.tag, inline: true }, { name: 'Uploaded By:', value: `[${author}](${authorUrl})`, inline: true }, { name: 'Tiếp theo:', value: upcomingVid, inline: true });
        });
    }
};
default_1 = __decorate([
    Command_1.Command({
        name: 'nowplaying',
        aliases: ['np', 'now_playing', 'current', 'currentlyplaying', 'currently_playing'],
        description: 'Xem bài hát đang phát.',
        category: 'Music'
    })
], default_1);
