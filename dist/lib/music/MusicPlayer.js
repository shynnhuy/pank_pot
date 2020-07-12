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
exports.MusicPlayer = void 0;
const __1 = require("../..");
const DefaultQueue_1 = require("./DefaultQueue");
const discord_js_1 = require("discord.js");
const discord_ytdl_core_1 = __importDefault(require("discord-ytdl-core"));
class MusicPlayer {
    constructor() {
        this.nowPlayingInfo = [];
        this.embed = new discord_js_1.MessageEmbed();
        this.setMusicInfo = (video, member) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const channel = yield __1.client.$youtube.getChannel(video.channelId);
            const music = {
                title: video.title,
                url: video.url,
                paused: false,
                loop: false,
                duration: (video.minutes * 60) + video.seconds,
                thumbnail: ((_a = video.thumbnails.maxres) === null || _a === void 0 ? void 0 : _a.url) || ((_b = video.thumbnails.default) === null || _b === void 0 ? void 0 : _b.url),
                author: channel.name,
                authorUrl: channel.url,
                votes: [],
                requester: member,
            };
            return music;
        });
        this.durationBar = (queue, ended) => {
            var _a;
            const { current, connection } = queue;
            const { duration } = current;
            const counter = 33;
            const bar = '━'.repeat(counter);
            const indicator = '⚪';
            const streamTime = (_a = connection === null || connection === void 0 ? void 0 : connection.dispatcher) === null || _a === void 0 ? void 0 : _a.streamTime;
            const currentTime = ended ? '' : __1.client.$utils.formatSeconds(streamTime / 1000);
            const timeString = ended ? 'Ended' : `${currentTime} / ${__1.client.$utils.formatSeconds(duration)}`;
            const position = ended ? counter : Math.floor(((streamTime / 1000) / duration) * counter);
            const durationBar = `\`\`\`${__1.client.$utils.replaceStrChar(bar, position, indicator)} ${timeString}\`\`\``;
            return durationBar;
        };
    }
    addToQueue({ music, textChannel, voiceChannel, playlist }) {
        const queue = textChannel.guild.queue;
        queue.upcoming.push(music);
        if (typeof queue.current === 'undefined') {
            queue.current = queue.upcoming.shift();
        }
        if (typeof queue.voiceChannel === 'undefined') {
            queue.voiceChannel = voiceChannel;
        }
        if (typeof queue.textChannel === 'undefined') {
            queue.textChannel = textChannel;
        }
        if (!playlist && queue.upcoming.length > 0) {
            const addedVideoIndex = queue.upcoming.indexOf(music);
            const position = addedVideoIndex == 0 ? 'Tiếp theo' : addedVideoIndex + 1;
            this.embed
                .setColor('RANDOM')
                .setTitle('Đã thêm bài hát vào danh sách phát')
                .setDescription(`\`\`\`${music.title}\`\`\``)
                .setThumbnail(music.thumbnail)
                .addField('Vị trí:', position, true)
                .addField('Requested By:', music.requester.user.tag, true)
                .setTimestamp();
            textChannel.send(this.embed);
            this.embed.spliceFields(0, this.embed.fields.length);
        }
        if (!queue.playing) {
            queue.playing = true;
            voiceChannel.join().then(connection => {
                queue.connection = connection;
                this.playMusic(textChannel.guild);
            }).catch(console.error);
        }
    }
    playMusic(guild) {
        var _a, _b, _c, _d, _e;
        const { queue } = guild;
        if (typeof queue.current === 'undefined') {
            (_a = queue.voiceChannel) === null || _a === void 0 ? void 0 : _a.leave();
            (_b = queue.textChannel) === null || _b === void 0 ? void 0 : _b.send('🎵 Music playback has ended');
            return guild.queue = Object.assign({}, DefaultQueue_1.defaultQueue);
        }
        const stream = discord_ytdl_core_1.default((_c = queue.current) === null || _c === void 0 ? void 0 : _c.url, {
            filter: 'audioonly',
            opusEncoded: false,
            fmt: 'mp3',
            encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200'],
            highWaterMark: 1 << 25
        });
        stream.on('error', console.error);
        const dispatcher = (_d = queue.connection) === null || _d === void 0 ? void 0 : _d.play(stream, {
            type: 'unknown',
            highWaterMark: 1
        });
        dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.on('finish', () => {
            var _a;
            while (this.nowPlayingInfo.length > 0) {
                const item = this.nowPlayingInfo.shift();
                clearInterval(item.interval);
                const durationBar = this.durationBar(queue, true);
                item.embed.setTitle('Was Playing:');
                item.embed.setDescription(durationBar);
                item.embed.spliceFields(1, 1, { name: 'Còn lại:', value: 'Ended', inline: true });
                item.message.edit(item.embed);
            }
            if (!((_a = queue.current) === null || _a === void 0 ? void 0 : _a.loop)) {
                if (queue.loop) {
                    queue.upcoming.push(queue.current);
                }
                queue.current = queue.upcoming.shift();
            }
            setTimeout(() => {
                this.playMusic(guild);
            }, 1000);
        });
        dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.setVolumeLogarithmic(queue.volume / 100);
        this.embed
            .setColor('RANDOM')
            .setTitle('Đang phát:')
            .setDescription(`[${queue.current.title}](${queue.current.url})`)
            .setThumbnail(queue.current.thumbnail)
            .addField('Thời lượng:', `${__1.client.$utils.formatSeconds(queue.current.duration)}`, true)
            .addField('Requested By:', queue.current.requester.user.tag, true)
            .setTimestamp();
        (_e = queue.textChannel) === null || _e === void 0 ? void 0 : _e.send(this.embed);
        this.embed.spliceFields(0, this.embed.fields.length);
        dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.on('error', console.error);
    }
    /**
     * Getter $durationMessages
     * @return {NowPlayingInfo[]}
     */
    get $nowPlayingInfo() {
        return this.nowPlayingInfo;
    }
}
exports.MusicPlayer = MusicPlayer;
