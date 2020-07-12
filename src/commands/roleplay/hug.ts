import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../lib/commands/Command";
import { CommandExecutor } from "../../lib/commands/CommandExecutor";
import giphy from "../../giphy";

@Command({
  name: "hug",
  category: "Pảnk Roleplay",
  usage: "[@user]",
  description: "Đấm vỡ cmn mồm.",
})
default class implements CommandExecutor {
  execute = async (message: Message, args: string[]): Promise<boolean> => {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp();

    const fetched = await giphy.search({
      q: "hugging",
      rating: "g",
    });
    embed.setImage(
      fetched.data[Math.floor(Math.random() * fetched.data.length - 1)].images
        .original.url
    );
    if (!message.mentions.users.first()) {
      embed.setTitle(`${message.author.username} ôm.`);
      message.channel.send(embed);
      return true;
    }

    const taggedUser = message.mentions.users.first();
    embed.setTitle(
      `${message.author.username} ôm iu thươn ${taggedUser?.username}.`
    );
    message.channel.send(embed);

    return true;
  };
}
