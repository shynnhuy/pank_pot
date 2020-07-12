import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../lib/commands/Command";
import { CommandExecutor } from "../../lib/commands/CommandExecutor";
import giphy from '../../giphy';

@Command({
  name: "kiss",
  category: "Pảnk Roleplay",
  usage: "[@user]",
  description: "Hun nhẹ <3.",
})
default class implements CommandExecutor {
  execute = async (message: Message, args: string[]): Promise<boolean> => {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp();

    const fetched = await giphy.search({
      q: "kissing",
      rating: "g",
    });
    embed.setImage(fetched.data[Math.floor(Math.random() * fetched.data.length - 1)].images.original.url);
    if (!message.mentions.users.first()) {
      embed.setTitle(`${message.author.username} hun hun.`);
      message.channel.send(embed);
      return true;
    }

    const taggedUser = message.mentions.users.first();
    embed.setTitle(
      `${message.author.username} hun ${taggedUser?.username} thắm thiết.`
    );
    message.channel.send(embed);

    return true;
  };
}
