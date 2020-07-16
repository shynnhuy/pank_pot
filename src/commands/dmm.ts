import { Message } from "discord.js";
import { Command } from "../lib/commands/Command";
import { CommandExecutor } from "../lib/commands/CommandExecutor";
import { MessageEmbed } from "discord.js";

@Command({
  name: "dmm",
})
default class implements CommandExecutor {
  execute = async (message: Message): Promise<boolean> => {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp();
    embed.setDescription(`Chửi coan mẹ mài nha ${message.author.username}.`);
    message.channel.send(embed);
    return true;
  };
}
