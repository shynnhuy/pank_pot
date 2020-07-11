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
const index_1 = require("../index");
const Event_1 = require("../lib/events/Event");
const DefaultQueue_1 = require("../lib/music/DefaultQueue");
let default_1 = class {
    constructor() {
        this.listen = (oldState, newState) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const { queue } = oldState.guild;
            if (((_a = oldState.member) === null || _a === void 0 ? void 0 : _a.user.bot) && oldState.member.user === index_1.client.user) {
                if (newState.channel === null) {
                    (_b = queue.textChannel) === null || _b === void 0 ? void 0 : _b.send('🎵 Music playback has ended');
                    oldState.guild.queue.upcoming.length = 0;
                    return oldState.guild.queue = Object.assign({}, DefaultQueue_1.defaultQueue);
                }
                queue.voiceChannel = newState.channel;
            }
            if (!((_c = oldState.member) === null || _c === void 0 ? void 0 : _c.user.bot) && newState.channel === null) {
                const { current } = queue;
                if (current === null || current === void 0 ? void 0 : current.votes.includes(oldState.member)) {
                    const index = current.votes.indexOf(oldState.member);
                    current.votes.splice(index, 1);
                }
            }
        });
    }
};
default_1 = __decorate([
    Event_1.Event('voiceStateUpdate')
], default_1);
