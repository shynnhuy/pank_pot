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
let default_1 = class {
    constructor() {
        this.listen = (message) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (message.author.bot || message.channel.type === 'dm')
                return;
            const { prefixes } = index_1.client.$settings.config;
            const prefix = prefixes.find(prefix => message.content.startsWith(prefix)) || prefixes[0];
            const args = message.content.slice(prefix.length).split(' ');
            const command = args.shift().toLowerCase();
            if (!message.content.startsWith(prefix) || command === '')
                return;
            let cmd = index_1.client.$commands.get(command);
            if (!cmd)
                cmd = index_1.client.$commands.get(index_1.client.$aliases.get(command));
            if (cmd) {
                const hasPerm = (_a = cmd.info.permissions) === null || _a === void 0 ? void 0 : _a.some(perm => { var _a; return (_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has(perm); });
                if (!hasPerm && typeof hasPerm !== 'undefined' && !cmd.info.overrideDefaultPermCheck) {
                    return yield index_1.client.$commands.get('help').executor.execute(message, [cmd.info.name]);
                }
                const success = yield cmd.executor.execute(message, args);
                if (!success)
                    return yield index_1.client.$commands.get('help').executor.execute(message, [cmd.info.name]);
            }
        });
    }
};
default_1 = __decorate([
    Event_1.Event('message')
], default_1);
