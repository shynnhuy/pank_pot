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
let default_1 = class {
    constructor() {
        this.execute = (message, args) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (args.length === 0 || !((_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel))
                return false;
            const { regex } = index_1.client.$settings;
            const { player } = message.guild;
            const member = message.member;
            const textChannel = message.channel;
            const voiceChannel = message.member.voice.channel;
            if (regex.url.test(args[0])) {
                if (regex.youtubeVideo.test(args[0])) {
                    const status = yield index_1.client.$youtube.getVideo(args[0])
                        .then((video) => __awaiter(this, void 0, void 0, function* () {
                        const music = yield player.setMusicInfo(video, member);
                        player.addToQueue({ music, textChannel, voiceChannel, playlist: false });
                        return true;
                    }))
                        .catch(() => { return false; });
                    return status;
                }
                if (regex.youtubePlaylist.test(args[0])) {
                    const status = yield index_1.client.$youtube.getPlaylist(args[0])
                        .then((playlist) => __awaiter(this, void 0, void 0, function* () {
                        const msg = yield message.channel.send('🔄 Processing playlist...');
                        const results = yield playlist.fetchVideos(0);
                        if (results.length === 0)
                            return false;
                        for (let i = 0; i < results.length; i++) {
                            if (results[i].private)
                                continue;
                            const music = yield player.setMusicInfo(yield results[i].fetch(), member);
                            player.addToQueue({ music, textChannel, voiceChannel, playlist: true });
                        }
                        msg.edit(`✅ Successfully added **${playlist.title}** to the queue`);
                        return true;
                    }))
                        .catch(() => { return false; });
                    return status;
                }
                return false;
            }
            const result = yield index_1.client.$youtube.getVideo(args.join(' '));
            if (!result)
                return false;
            const music = yield player.setMusicInfo(result, member);
            player.addToQueue({ music, textChannel, voiceChannel, playlist: false });
            return true;
        });
    }
};
default_1 = __decorate([
    Command_1.Command({
        name: 'play',
        description: 'Bored? How about playing some music from youtube? Be sure to be in a voice channel before running this command!',
        category: 'Music',
        usage: '<URL:string | query:string>'
    })
], default_1);
