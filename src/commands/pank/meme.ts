import { Message, MessageEmbed } from "discord.js";
import axios from "axios";
import { Command } from "../../lib/commands/Command";
import { CommandExecutor } from "../../lib/commands/CommandExecutor";

@Command({
  name: "meme",
  aliases: ["mm"],
  category: "Pảnk Roleplay",
  usage: "[subreddit: string]",
  description: "1 chiếc meme nhè nhẹ.\nSử dụng các subreddit: Ví dụ \`meme\`, \`animemes\`, \`dankmeme\`, \`wholesomememes\`, \`...\`", // A short description about your command (Optional)
})
default class implements CommandExecutor {
  execute = async (message: Message, args: string[]): Promise<boolean> => {

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp();

    if (!args[0]) {
      message.channel.startTyping();
      const fetched = await axios.get("https://meme-api.herokuapp.com/gimme");
      embed.setTitle(fetched.data.title);
      embed.setImage(fetched.data.url);
      embed.setDescription(
        `Link ${fetched.data.postLink} | Subreddit: ${fetched.data.subreddit}`
      );
      message.channel.stopTyping();
      message.channel.send(embed);
      return true;
    }

    message.channel.startTyping();
    axios
      .get(`https://meme-api.herokuapp.com/gimme/${args[0]}`)
      .then((fetched) => {
        if (fetched.data) {
          embed.setTitle(fetched.data.title);
          embed.setImage(fetched.data.url);
          embed.setDescription(
            `Link ${fetched.data.postLink} | Subreddit: ${fetched.data.subreddit}`
          );
          message.channel.stopTyping();
          message.channel.send(embed);
          return true;
        }
      })
      .catch((err) => {
        embed.setColor("RED");
        embed.setTitle("Lỗi");
        embed.setDescription(`Không tìm thấy subreddit ${args[0]}`);
        message.channel.stopTyping();
        message.channel.send(embed);
        return false;
      });

    return true;
  };
  
}
