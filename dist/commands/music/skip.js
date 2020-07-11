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
        this.skipCount = 3;
        this.execute = (message, args) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { queue } = message.guild;
            if (typeof queue.current === 'undefined')
                return false;
            if (message.member.voice.channel !== queue.voiceChannel)
                return false;
            const { current, connection, voiceChannel } = queue;
            // @ts-ignore
            const skip = this.info;
            const hasPerm = (_a = skip.permissions) === null || _a === void 0 ? void 0 : _a.some(perm => { var _a; return (_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has(perm); });
            if (!hasPerm && typeof hasPerm !== 'undefined') {
                if (current.votes.includes(message.member)) {
                    message.channel.send(`⚠️ ${message.author}, you have already voted!`);
                    return true;
                }
                current.votes.push(message.member);
                const skipCount = !queue.userCountskip ? this.skipCount : voiceChannel.members.size - 1;
                message.channel.send(`⏩ ${message.author}, you have voted to skip! **${current.votes.length}/${skipCount}** votes`);
                if (current.votes.length >= skipCount)
                    this.skipMusic(current, connection);
                return true;
            }
            if (args[0]) {
                const bool = args[0] === 'true' ? true : (args[0] === 'false' ? false : args[0]);
                if (typeof bool != 'boolean')
                    return false;
                queue.userCountskip = bool;
                message.reply(`⏩ Skip count will now be ${bool ? '' : 'not '}equivalent to the number of users in the voice channel!`);
                return true;
            }
            this.skipMusic(current, connection);
            return true;
        });
        this.skipMusic = (current, connection) => {
            if (current.paused) {
                current.paused = false;
                connection.dispatcher.resume();
            }
            if (current.loop)
                current.loop = false;
            connection.dispatcher.emit('finish');
        };
    }
};
default_1 = __decorate([
    Command_1.Command({
        name: 'skip',
        category: 'Music',
        usage: '[userCount:boolean]',
        description: [
            'Don\'t like the current music? Skip it! No-one enjoys horrible musics! Requires votes if user is not admin!',
            'The second argument is used to set whether or not to use the number of users in the voice channel to skip a music',
            'Note: same user cannot vote more than once.'
        ].join('\n\n'),
        permissions: ['ADMINISTRATOR'],
        overrideDefaultPermCheck: true
    })
], default_1);
