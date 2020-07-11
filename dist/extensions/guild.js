"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuseGuild = void 0;
const discord_js_1 = require("discord.js");
const MusicPlayer_1 = require("../lib/music/MusicPlayer");
const DefaultQueue_1 = require("../lib/music/DefaultQueue");
class MuseGuild extends discord_js_1.Structures.get('Guild') {
    constructor() {
        super(...arguments);
        this.musicPlayer = new MusicPlayer_1.MusicPlayer();
        this.defaultQueue = Object.assign({}, DefaultQueue_1.defaultQueue);
    }
    /**
     * Getter queue
     * @return {Queue}
     */
    get queue() {
        return this.defaultQueue;
    }
    /**
     * Setter queue
     * @param {Queue} queue
     */
    set queue(queue) {
        this.defaultQueue = queue;
    }
    /**
     * Getter player
     * @return {MusicPlayer}
     */
    get player() {
        return this.musicPlayer;
    }
}
exports.MuseGuild = MuseGuild;
discord_js_1.Structures.extend('Guild', () => MuseGuild);
