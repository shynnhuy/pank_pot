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
        this.itemsPerPage = 5;
        this.reactionTime = 60;
        this.next = '⏩';
        this.previous = '⏪';
        this.execute = (message) => __awaiter(this, void 0, void 0, function* () {
            const { queue } = message.guild;
            if (typeof queue.current === 'undefined')
                return false;
            if (message.member.voice.channel !== queue.voiceChannel)
                return false;
            const currentPage = 1;
            const embed = new discord_js_1.MessageEmbed().setColor('RANDOM');
            yield this.setEmbed(message.author, embed, message.guild, currentPage);
            const msg = yield message.channel.send(embed);
            yield this.paginate(message.author, msg, embed, currentPage);
            return true;
        });
        this.setupPages = (queue) => __awaiter(this, void 0, void 0, function* () {
            const upcoming = [...queue.upcoming];
            const pages = [];
            while (upcoming.length > 0) {
                pages.push(upcoming.splice(0, this.itemsPerPage));
            }
            return pages;
        });
        this.setEmbed = (author, embed, guild, currentPage, pages) => __awaiter(this, void 0, void 0, function* () {
            const { queue, queue: { current, upcoming, loop } } = guild;
            pages = pages ? pages : yield this.setupPages(queue);
            const title = upcoming.length > 0 ? `Upcoming - Next ${upcoming.length}` : 'Currently Playing';
            const description = [
                `Looping queue: ${String(loop)[0].toUpperCase() + String(loop).substring(1)}`
            ];
            const currentListNum = (currentPage * this.itemsPerPage) - this.itemsPerPage;
            if (pages.length > 0) {
                description.push(`${pages[currentPage - 1].map((music, index) => `**[${currentListNum + (index + 1)}]:** [${music.title}](${music.url})`).join('\n')}`);
            }
            description.push(`🎵 **Currently Playing:** [${current === null || current === void 0 ? void 0 : current.title}](${current === null || current === void 0 ? void 0 : current.url})`);
            embed
                .setTitle(title)
                .setThumbnail(current.thumbnail)
                .setDescription(description.join('\n\n'))
                .setFooter(`Page ${currentPage} of ${pages.length === 0 ? 1 : pages.length} | Requested by ${author.tag}`)
                .setTimestamp();
        });
        this.paginate = (author, message, embed, currentPage) => __awaiter(this, void 0, void 0, function* () {
            yield message.react(this.previous);
            yield message.react(this.next);
            const filter = (reaction, user) => {
                return (reaction.emoji.name === this.next || reaction.emoji.name === this.previous) && !user.bot;
            };
            const collector = message.createReactionCollector(filter, { time: this.reactionTime * 1000 });
            collector.on('collect', (reaction, user) => __awaiter(this, void 0, void 0, function* () {
                const pages = yield this.setupPages(message.guild.queue);
                if (pages.length < 2) {
                    currentPage = 1;
                    yield this.setEmbed(author, embed, message.guild, currentPage, pages);
                    message.edit(embed);
                }
                const action = reaction.emoji.name;
                switch (action) {
                    case this.next:
                        currentPage === pages.length ? currentPage = 1 : currentPage++;
                        break;
                    case this.previous:
                        currentPage === 1 ? currentPage = pages.length : currentPage--;
                        break;
                }
                yield this.setEmbed(author, embed, message.guild, currentPage, pages);
                message.edit(embed);
                reaction.users.remove(user);
            }));
            collector.on('end', () => message.reactions.removeAll());
        });
    }
};
default_1 = __decorate([
    Command_1.Command({
        name: 'queue',
        aliases: ['q', 'list'],
        description: 'Xem toàn bộ danh sách phát.',
        category: 'Music'
    })
], default_1);
