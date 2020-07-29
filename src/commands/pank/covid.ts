import { Message, MessageEmbed } from "discord.js";
import axios from "axios";
import { Command } from "../../lib/commands/Command";
import { CommandExecutor } from "../../lib/commands/CommandExecutor";

@Command({
  name: "covid",
  usage: "[countrycode: string]",
  category: "Pảnk Commands",
  description: "Kiểm tra tình hình Coronavirus trong nước và quốc tế", // A short description about your command (Optional)
})
class implements CommandExecutor {
  execute = async (message: Message, args: string[]): Promise<boolean> => {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setFooter(`Command provided by LoveBae#0186`)
      .setTimestamp();

    if (!args[0]) {
      message.channel.startTyping();
      const fetched = await axios.get("https://disease.sh/v3/covid-19/all");
      const {
        cases,
        recovered,
        deaths,
        todayCases,
        todayRecovered,
        todayDeaths,
      } = fetched.data;
      embed.setTitle("Tình hình COVID-19 trên thế giới");
      embed.setDescription(
        `Số ca mắc trong ngày / Tổng số ca mắc  : ${todayCases}/${cases}
         Số ca khỏi trong ngày / Tổng số ca khỏi: ${recovered}/${todayRecovered}
         Số ca chết trong ngày / Tổng số ca chết: ${deaths}/${todayDeaths}
        `
      );
      message.channel.stopTyping();
      message.channel.send(embed);
      return true;
    }

    message.channel.startTyping();
    axios
      .get(`https://disease.sh/v3/covid-19/countries/${args[0]}?strict=true`)
      .then((fetched) => {
        const {
          country,
          countryInfo,
          cases,
          recovered,
          deaths,
          todayCases,
          todayRecovered,
          todayDeaths,
        } = fetched.data;
        if (fetched.data) {
          embed.setTitle(`Tình hình COVID-19 ở ${country}`);
          embed.setImage(countryInfo.flag);
          embed.setDescription(
            `Số ca mắc trong ngày / Tổng số ca mắc  : ${todayCases}/${cases}
             Số ca khỏi trong ngày / Tổng số ca khỏi: ${recovered}/${todayRecovered}
             Số ca chết trong ngày / Tổng số ca chết: ${deaths}/${todayDeaths}
            `
          );
          message.channel.stopTyping();
          message.channel.send(embed);
          return true;
        }
      })
      .catch((err) => {
        embed.setColor("RED");
        embed.setTitle("Lỗi");
        embed.setDescription(`Không tìm thấy countrycode ${args[0]}`);
        message.channel.stopTyping();
        message.channel.send(embed);
        return false;
      });

    return true;
  };
}
