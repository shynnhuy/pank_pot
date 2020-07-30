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
const Command_1 = require("../../lib/commands/Command");
const discord_js_1 = require("discord.js");
let default_1 = class {
    constructor() {
        this.execute = (message) => __awaiter(this, void 0, void 0, function* () {
            const { queue, queue: { current, connection }, player } = message.guild;
            if (typeof current === 'undefined')
                return false;
            if (message.member.voice.channel !== queue.voiceChannel)
                return false;
            if (!(current === null || current === void 0 ? void 0 : current.paused))
                return false;
            current.paused = false;
            connection === null || connection === void 0 ? void 0 : connection.dispatcher.resume();
            const durationBar = player.durationBar(queue);
            const embed = new discord_js_1.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Tiếp tục phát')
                .setThumbnail(current.thumbnail)
                .setDescription(`▶️ [${current.title}](${current.url}) đã được phát tiếp\n${durationBar}`)
                .setFooter(`Requested by ${message.author.tag}`)
                .setTimestamp();
            message.channel.send(embed);
            return true;
        });
    }
};
default_1 = __decorate([
    Command_1.Command({
        name: 'resume',
        description: 'You\'re back? Use this command to resume a paused music!\nOnly works if music playback is paused!',
        category: 'Music'
    })
], default_1);
