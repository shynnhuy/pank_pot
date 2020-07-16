import { Message } from "discord.js";
import { Command } from "../lib/commands/Command";
import { CommandExecutor } from "../lib/commands/CommandExecutor";
import { MessageEmbed } from "discord.js";

@Command({
  name: "hello",
})
default class implements CommandExecutor {
  execute = async (message: Message): Promise<boolean> => {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp();
    embed.setDescription(`Lô đjt mẹ mày à ${message.author.username} ?.`);
    message.channel.send(embed);
    return true;
  };
}
