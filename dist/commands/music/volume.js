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
let default_1 = class {
    constructor() {
        this.execute = (message, args) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { queue } = message.guild;
            if (typeof queue.current === 'undefined')
                return false;
            if (message.member.voice.channel !== queue.voiceChannel)
                return false;
            let volumeEmoji;
            if (!args[0]) {
                volumeEmoji = queue.volume > 50 ? '🔊' : (queue.volume <= 0 ? '🔈' : '🔉');
                message.channel.send(`${volumeEmoji} Current Volume: **${queue.volume}/100**`);
                return true;
            }
            const volume = parseFloat(parseFloat(args[0]).toFixed(2));
            if (isNaN(volume) || volume < 0 || volume > 100)
                return false;
            queue.volume = volume;
            (_a = queue.connection) === null || _a === void 0 ? void 0 : _a.dispatcher.setVolumeLogarithmic(volume / 100);
            volumeEmoji = queue.volume > 50 ? '🔊' : (queue.volume <= 0 ? '🔈' : '🔉');
            message.channel.send(`${volumeEmoji} Volume has now been set to **${queue.volume}/100**`);
            return true;
        });
    }
};
default_1 = __decorate([
    Command_1.Command({
        name: 'volume',
        aliases: ['vol'],
        category: 'Music',
        usage: '[volume:number (0-100)]',
        description: 'The volume is too loud? Or is it too quiet? Change it using this command! Alternatively, view the current volume!'
    })
], default_1);
