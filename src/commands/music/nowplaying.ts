import { client } from '../../index';
import { Command } from '../../lib/commands/Command';
import { CommandExecutor } from '../../lib/commands/CommandExecutor';
import { MusicPlayer } from '../../lib/music/MusicPlayer';
import { Queue } from '../../lib/music/Queue';
import { Message, MessageEmbed } from 'discord.js';

@Command({
    name: 'nowplaying',
    aliases: ['np', 'now_playing', 'current', 'currentlyplaying', 'currently_playing'],
    description: 'Xem bài hát đang phát.',
    category: 'Music'
})
default class implements CommandExecutor {

    execute = async (message: Message): Promise<boolean> => {

        const { queue, player } = message.guild!;
        if (typeof queue.current === 'undefined') return false;
        if (message.member!.voice.channel !== queue.voiceChannel) return false;

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Now Playing:')
            .setThumbnail(queue.current.thumbnail)
            .setFooter(`Requested by ${message.author.tag}`)
            .setTimestamp();

        this.setEmbed(embed, queue, player);
        const msg = await message.channel.send(embed);

        const interval = setInterval(() => {
            this.setEmbed(embed, queue, player);
            msg.edit(embed);
        }, 5000);

        player.$nowPlayingInfo.push({ embed, interval, message: msg });
        return true;

    }

    private setEmbed = async (embed: MessageEmbed, queue: Queue, player: MusicPlayer) => {

        const { current, upcoming, connection } = queue;
        const { title, url, duration, loop, requester, author, authorUrl } = current!;

        const durationBar = player.durationBar(queue);
        const timeRemaining = client.$utils.formatSeconds(duration - (connection!.dispatcher.streamTime / 1000));

        let upcomingVid;
        upcomingVid = upcoming[0] ? `[${client.$utils.truncateStr(upcoming[0].title, 20)}](${upcoming[0].url})` : 'None';
        upcomingVid = current!.loop ? `[${client.$utils.truncateStr(current!.title, 20)}](${current!.url})` : upcomingVid;

        embed.setDescription(`[${title}](${url})\n${durationBar}`);
        embed.spliceFields(0, 6,
            { name: 'Thời lượng:', value: client.$utils.formatSeconds(duration), inline: true },
            { name: 'Còn lại:', value: timeRemaining, inline: true },
            { name: 'Lặp:', value: String(loop)[0].toUpperCase() + String(loop).substring(1), inline: true },
            { name: 'Requested By:', value: requester.user.tag, inline: true },
            { name: 'Uploaded By:', value: `[${author}](${authorUrl})`, inline: true },
            { name: 'Tiếp theo:', value: upcomingVid, inline: true }
        );

    }

}