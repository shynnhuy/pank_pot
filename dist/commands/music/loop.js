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
            const { queue, queue: { current, voiceChannel } } = message.guild;
            if (typeof current === 'undefined')
                return false;
            if (message.member.voice.channel !== voiceChannel)
                return false;
            if (args.length < 2)
                return false;
            const type = args[0].toLowerCase();
            const option = args[1].toLowerCase();
            if (!['music', 'queue'].includes(type))
                return false;
            if (!['true', 'false'].includes(option))
                return false;
            const bool = option === 'true' ? true : false;
            switch (type) {
                case 'music': {
                    if (bool === current.loop) {
                        message.channel.send(`⚠️ ${message.author}, phát lại đang có giá trị ${type}`);
                        return true;
                    }
                    current.loop = bool;
                    break;
                }
                case 'queue': {
                    if (bool === queue.loop) {
                        message.channel.send(`⚠️ ${message.author}, đã chuyển phát lại thành ${type}`);
                        return true;
                    }
                    queue.loop = bool;
                    break;
                }
            }
            message.channel.send(`🔃 Kiểu phát lại hiện tại \`${type}\` đã đổi thành \`${bool}\``);
            return true;
        });
    }
};
default_1 = __decorate([
    Command_1.Command({
        name: 'loop',
        category: 'Music',
        usage: '<type:string (song/queue)> <loop:boolean>',
        description: 'Phát lại bài hát.'
    })
], default_1);
