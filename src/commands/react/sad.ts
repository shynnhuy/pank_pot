import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../lib/commands/Command";
import { CommandExecutor } from "../../lib/commands/CommandExecutor";
import giphy from "../../giphy";

@Command({
  name: "sad",
  category: "Pảnk Reaction",
  description: "Thả 1 trút buồn vào mưa.",
})
default class implements CommandExecutor {
  execute = async (message: Message, args: string[]): Promise<boolean> => {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp();

    const fetched = await giphy.search({
      q: "sad",
      rating: "g",
    });
    embed.setImage(
      fetched.data[Math.floor(Math.random() * fetched.data.length - 1)].images
        .original.url
    );
    embed.setTitle(`${message.author.username} pùn vlz.`);
    message.channel.send(embed);

    return true;
  };
}
