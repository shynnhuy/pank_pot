import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../lib/commands/Command";
import { CommandExecutor } from "../../lib/commands/CommandExecutor";
import giphy from "../../giphy";

@Command({
  name: "laught",
  category: "Pảnk Reaction",
  description: "Cười vl.",
})
default class implements CommandExecutor {
  execute = async (message: Message, args: string[]): Promise<boolean> => {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp();

    const fetched = await giphy.search({
      q: "laughing",
      rating: "g",
    });
    embed.setImage(
      fetched.data[Math.floor(Math.random() * fetched.data.length - 1)].images
        .original.url
    );
    embed.setTitle(`${message.author.username} cười sml.`);
    message.channel.send(embed);

    return true;
  };
}
