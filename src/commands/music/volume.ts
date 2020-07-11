import { Message, VoiceConnection } from 'discord.js';
import { Command } from '../../lib/commands/Command';
import { CommandExecutor } from '../../lib/commands/CommandExecutor';

@Command({
    name: 'volume',
    aliases: ['vol'],
    category: 'Music',
    usage: '[volume:number (0-100)]',
    description: 'Xem hoặc thay đổi âm lượng.'
})
default class implements CommandExecutor {


    execute = async (message: Message, args: string[]): Promise<boolean> => {

        const { queue } = message.guild!;
        if (typeof queue.current === 'undefined') return false;
        if (message.member!.voice.channel !== queue.voiceChannel) return false;

        let volumeEmoji;

        if (!args[0]) {
            volumeEmoji = queue.volume > 50 ? '🔊' : (queue.volume <= 0 ? '🔈' : '🔉');
            message.channel.send(`${volumeEmoji} Âm lượng hiện tại: **${queue.volume}/100**`);
            return true;
        }

        const volume = parseFloat(parseFloat(args[0]).toFixed(2));
        if (isNaN(volume) || volume < 0 || volume > 100) return false;

        queue.volume = volume;
        queue.connection?.dispatcher.setVolumeLogarithmic(volume / 100);

        volumeEmoji = queue.volume > 50 ? '🔊' : (queue.volume <= 0 ? '🔈' : '🔉');
        message.channel.send(`${volumeEmoji} Âm lượng được chỉnh thành **${queue.volume}/100**`);

        return true;

    }

}