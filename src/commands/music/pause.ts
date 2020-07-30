import { Command } from '../../lib/commands/Command';
import { CommandExecutor } from '../../lib/commands/CommandExecutor';
import { Message, MessageEmbed } from 'discord.js';

@Command({
    name: 'pause',
    description: 'Tạm dừng phát nhạc.',
    category: 'Music',
})
default class implements CommandExecutor {

    execute = async (message: Message): Promise<boolean> => {

        const { queue, queue: { current, connection }, player } = message.guild!;

        if (typeof current === 'undefined') return false;
        if (message.member!.voice.channel !== queue.voiceChannel) return false;
        if (current.paused) return false;

        current.paused = true;
        connection?.dispatcher.pause();

        const durationBar = player.durationBar(queue);

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Đã tạm dừng phát nhạc')
            .setThumbnail(current.thumbnail)
            .setDescription(`⏸️ [${current.title}](${current.url}) đã dừng\n${durationBar}`)
            .setFooter(`Requested by ${message.author.tag}`)
            .setTimestamp()

        message.channel.send(embed);
        return true;
    }

}