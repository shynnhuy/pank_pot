import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../lib/commands/Command";
import { CommandExecutor } from "../../lib/commands/CommandExecutor";
import giphy from "../../giphy";

@Command({
  name: "lick",
  category: "Pảnk Roleplay",
  usage: "[@user]",
  description: "Mlem mlem.",
})
default class implements CommandExecutor {
  execute = async (message: Message, args: string[]): Promise<boolean> => {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp();

    const fetched = await giphy.search({
      q: "licking",
      rating: "g",
    });
    embed.setImage(
      fetched.data[Math.floor(Math.random() * fetched.data.length - 1)].images
        .original.url
    );
    if (!message.mentions.users.first()) {
      embed.setTitle(`${message.author.username} mlem mlem.`);
      message.channel.send(embed);
      return true;
    }

    const taggedUser = message.mentions.users.first();
    embed.setTitle(
      `${message.author.username} mlem mlemmm ${taggedUser?.username}.`
    );
    message.channel.send(embed);

    return true;
  };
}
