import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../lib/commands/Command";
import { CommandExecutor } from "../../lib/commands/CommandExecutor";
import settings from "../../settings";
// import Keyv from "keyv";

@Command({
  name: "prefix",
  category: "Pảnk Commands",
  description: "Xem prefix của Pảnk.",
})
default class implements CommandExecutor {
  execute = async (message: Message, args: string[]): Promise<boolean> => {
    // const keyv = new Keyv();
    // keyv.set('prefix', ".");
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp();

    message.channel.startTyping();
    embed.setTitle("Pảnk Prefix");
    embed.setDescription([
      `✅ Dùng \`${settings.config.prefixes}\` trước câu lệnh để sử dụng Pảnk ✅`,
    ]);
    message.channel.send(embed);
    message.channel.stopTyping();
    return true;
  };
}
