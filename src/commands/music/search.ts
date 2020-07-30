import { Message, TextChannel, MessageEmbed } from 'discord.js';
import { client } from '../../index';
import { Command } from '../../lib/commands/Command';
import { CommandExecutor } from '../../lib/commands/CommandExecutor';

@Command({
    name: 'search',
    description: 'Tìm bài hát từ youtube.',
    category: 'Music',
    usage: '<URL:string | query:string>',
})
default class implements CommandExecutor {
    private readonly selectionTime = 10;

    execute = async (message: Message, args: string[]): Promise<boolean> => {
        if (args.length === 0 || !message.member?.voice.channel) return false;
        if (client.$settings.regex.url.test(args[0])) {
            return await client.$commands.get('play')?.executor.execute(message, args)!;
        }

        const { player } = message.guild!;
        const member = message.member;
        const textChannel = <TextChannel>message.channel!;
        const voiceChannel = message.member.voice.channel;

        const results = (await client.$youtube.searchVideos(args.join(' '))).results.slice(0, 5);
        if (results.length === 0) return false;

        const thumbnail = client.user?.displayAvatarURL({
            dynamic: false,
            format: 'png',
            size: 2048,
        })!;

        const description = [
            results.map((video, index) => `**${index + 1} -** ${video.title}`).join('\n'),
            '🎵 Chọn bài hát từ **1** đến **5** trong vòng **1 phút**',
        ].join('\n\n');

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('-= Tìm kiếm bài hát =-')
            .setThumbnail(thumbnail)
            .setDescription(description);

        const msg = await message.channel.send(embed);

        // const react = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];

        await msg.react('1️⃣');
        await msg.react('2️⃣');
        await msg.react('3️⃣');
        await msg.react('4️⃣');
        await msg.react('5️⃣');
        await msg.react('❌');

        async function play(videoIndex: any) {
            const music = await player.setMusicInfo(await results[videoIndex].fetch(), member);
            player.addToQueue({ music, textChannel, voiceChannel, playlist: false });
        }
        await msg.awaitReactions(
            (r) =>
                r.emoji.name === '1️⃣' ||
                r.emoji.name === '2️⃣' ||
                r.emoji.name === '3️⃣' ||
                r.emoji.name === '4️⃣' ||
                r.emoji.name === '5️⃣',
            {
                max: 1,
                time: this.selectionTime * 6000,
                errors: ['time'],
            },
        )
            .then(async (response) => {

                // console.log("RESPONSE = " + response.toJSON())
                const reaction = response.first();

                // console.log("Reaction = " + reaction?.emoji.name);

                async function play(videoIndex: any) {
                    const music = await player.setMusicInfo(await results[videoIndex].fetch(), member);
                    player.addToQueue({ music, textChannel, voiceChannel, playlist: false });
                }

                const res = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].filter((r) => r === reaction?.emoji.name);

                // console.log("RES = " + res);
                const idx = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].indexOf(res[0]);

                // console.log(idx);

                play(idx);

                msg.delete();
            })
            .catch((err) => {
                if (err) undefined;
                msg.delete();
                return message.reply('⚠ Đã quá 1 phút để chọn bài hát!');
            });

        return true;
    };
}
