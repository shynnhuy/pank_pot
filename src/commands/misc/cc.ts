import { Message, MessageEmbed } from "discord.js";
import { client } from "../../index";
import { Command } from "../../lib/commands/Command";
import { CommandInfo } from "../../lib/commands/CommandInfo";
import { CommandExecutor } from "../../lib/commands/CommandExecutor";

@Command({
  name: "clearchat",
  aliases: ["cc"],
  category: "Miscellaneous", // Specify which category this command belongs to (Optional)
  usage: "<amount: number (1-100)>",
  description: "Xoá chat trong kênh hiện tại.", // A short description about your command (Optional)
})
default class implements CommandExecutor {
  execute = async (message: Message, args: string[]): Promise<boolean> => {
    const embed = new MessageEmbed()
      .setColor("RED")
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp();

    const amount = parseFloat(parseFloat(args[0]).toFixed(2));
    message.delete();

    if (!args[0]) {
      embed.setTitle("Lỗi");
      embed.setDescription([`Thêm số lượng tin nhắn cần xóa. \n Sử dụng: \`.clearchat <amount>\``]);
      // message.channel.send(`Thêm số lượng tin nhắn cần xóa: cc <amount>`);
      message.channel.send(embed)
      return true;
    }

    if (isNaN(amount) || amount < 0 || amount > 100) return false;
    const fetched = await message.channel.messages.fetch({ limit: amount });
    // console.log(fetched.size + " messages found, deleting...");

    message.channel
      .bulkDelete(fetched)
      .catch((err) => message.channel.send(`Error: ${err}`));
    embed.setTitle("Clear Successfully");
    embed.setDescription([`✅ ${amount} tin nhắn đã bị xóa.`]);
    message.channel.send(embed)
    return true;
  };
}
