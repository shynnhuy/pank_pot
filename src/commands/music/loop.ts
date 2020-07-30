import { Message } from 'discord.js';
import { Command } from '../../lib/commands/Command';
import { CommandExecutor } from '../../lib/commands/CommandExecutor';

@Command({
    name: 'loop',
    category: 'Music',
    usage: '<type:string (song/queue)> <loop:boolean>',
    description: 'Phát lại bài hát.'
})
default class implements CommandExecutor {

    execute = async (message: Message, args: string[]): Promise<boolean> => {

        const { queue, queue: { current, voiceChannel } } = message.guild!;
        if (typeof current === 'undefined') return false;
        if (message.member!.voice.channel !== voiceChannel) return false;
        if (args.length < 2) return false;

        const type = args[0].toLowerCase();
        const option = args[1].toLowerCase();

        if (!['music', 'queue'].includes(type)) return false;
        if (!['true', 'false'].includes(option)) return false;
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
    }

}