import { Message } from "discord.js";
import { Command } from "../lib/commands/Command";
import { CommandExecutor } from "../lib/commands/CommandExecutor";
import { MessageEmbed } from "discord.js";
import { Utils } from "../lib/Utils";

@Command({
  name: "hello",
})
class implements CommandExecutor {
  execute = async (message: Message): Promise<boolean> => {
    // const embed = new MessageEmbed()
    //   .setColor("RANDOM")
    //   .setTimestamp();
    // embed.setDescription(`Lô đjt mẹ mày à ${message.author.username} ?.`);
    message.channel.send({
      embed: Utils.generateEmbed(
        message,
        "",
        `Lô đjt mẹ mày à ${message.author.username} ?.`
      ),
    });
    return true;
  };
}
