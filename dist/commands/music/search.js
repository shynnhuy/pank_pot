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
        this.selectionTime = 10;
        this.execute = (message, args) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            if (args.length === 0 || !((_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel))
                return false;
            if (index_1.client.$settings.regex.url.test(args[0])) {
                return yield ((_b = index_1.client.$commands.get('play')) === null || _b === void 0 ? void 0 : _b.executor.execute(message, args));
            }
            const { player } = message.guild;
            const member = message.member;
            const textChannel = message.channel;
            const voiceChannel = message.member.voice.channel;
            const results = (yield index_1.client.$youtube.searchVideos(args.join(' '))).results.slice(0, 5);
            if (results.length === 0)
                return false;
            const thumbnail = (_c = index_1.client.user) === null || _c === void 0 ? void 0 : _c.displayAvatarURL({
                dynamic: false,
                format: 'png',
                size: 2048,
            });
            const description = [
                results.map((video, index) => `**${index + 1} -** ${video.title}`).join('\n'),
                '🎵 Chọn bài hát từ **1** đến **5** trong vòng **1 phút**',
            ].join('\n\n');
            const embed = new discord_js_1.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('-= Tìm kiếm bài hát =-')
                .setThumbnail(thumbnail)
                .setDescription(description);
            const msg = yield message.channel.send(embed);
            // const react = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];
            yield msg.react('1️⃣');
            yield msg.react('2️⃣');
            yield msg.react('3️⃣');
            yield msg.react('4️⃣');
            yield msg.react('5️⃣');
            yield msg.react('❌');
            function play(videoIndex) {
                return __awaiter(this, void 0, void 0, function* () {
                    const music = yield player.setMusicInfo(yield results[videoIndex].fetch(), member);
                    player.addToQueue({ music, textChannel, voiceChannel, playlist: false });
                });
            }
            yield msg.awaitReactions((r) => r.emoji.name === '1️⃣' ||
                r.emoji.name === '2️⃣' ||
                r.emoji.name === '3️⃣' ||
                r.emoji.name === '4️⃣' ||
                r.emoji.name === '5️⃣', {
                max: 1,
                time: this.selectionTime * 6000,
                errors: ['time'],
            })
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                // console.log("RESPONSE = " + response.toJSON())
                const reaction = response.first();
                // console.log("Reaction = " + reaction?.emoji.name);
                function play(videoIndex) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const music = yield player.setMusicInfo(yield results[videoIndex].fetch(), member);
                        player.addToQueue({ music, textChannel, voiceChannel, playlist: false });
                    });
                }
                const res = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].filter((r) => r === (reaction === null || reaction === void 0 ? void 0 : reaction.emoji.name));
                // console.log("RES = " + res);
                const idx = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].indexOf(res[0]);
                // console.log(idx);
                play(idx);
                msg.delete();
            }))
                .catch((err) => {
                if (err)
                    undefined;
                msg.delete();
                return message.reply('⚠ Đã quá 1 phút để chọn bài hát!');
            });
            return true;
        });
    }
};
default_1 = __decorate([
    Command_1.Command({
        name: 'search',
        description: 'Tìm bài hát từ youtube.',
        category: 'Music',
        usage: '<URL:string | query:string>',
    })
], default_1);
