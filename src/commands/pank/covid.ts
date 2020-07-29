import { Message, MessageEmbed } from "discord.js";
import axios from "axios";
import { Command } from "../../lib/commands/Command";
import { CommandExecutor } from "../../lib/commands/CommandExecutor";
import numeral from "numeral";
import { client } from "../..";

@Command({
  name: "covid",
  usage: "[countrycode: string]",
  category: "Pảnk Commands",
  description: `Kiểm tra tình hình Coronavirus trong nước và quốc tế.
Sử dụng countrycode như \`vn\`, \`usa\`, \`uk\`, \`bra\`, ... để xem tình hình covid nước đó.\n              
`,
})
default class implements CommandExecutor {
  execute = async (message: Message, args: string[]): Promise<boolean> => {
    const devID = "333876263859126274";
    const dev = await client.users.fetch(devID);
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setFooter(`Requested by ${message.author.tag}`)
      .setDescription(`Command provided by ${dev}`)
      .setTimestamp()
      .setAuthor(
        "Shynn Huy",
        "https://scontent.fdad3-3.fna.fbcdn.net/v/t1.0-9/31928823_815116595350232_1392791657107161088_n.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=P3i0mYvyhxIAX90XFyV&_nc_ht=scontent.fdad3-3.fna&oh=dfce66d63a04917e85aa9d735956e1ed&oe=5F45654A"
      );

    const prettyPrintStat = (stat: Number) =>
      stat ? `+${numeral(stat).format("0.0a")}` : "+0";

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
      embed.addFields(
        {
          name: "Số ca mắc trong ngày",
          value: prettyPrintStat(todayCases),
          inline: true,
        },
        {
          name: "Tổng số ca mắc",
          value: numeral(cases).format("0,0"),
          inline: true,
        },
        { name: "\u200B", value: "\u200B" },
        {
          name: "Số ca khỏi trong ngày",
          value: prettyPrintStat(todayRecovered),
          inline: true,
        },
        {
          name: "Tổng số ca khỏi",
          value: numeral(recovered).format("0,0"),
          inline: true,
        },
        { name: "\u200B", value: "\u200B" },
        {
          name: "Số ca chết trong ngày",
          value: prettyPrintStat(todayDeaths),
          inline: true,
        },
        {
          name: "Tổng số ca chết",
          value: numeral(deaths).format("0,0"),
          inline: true,
        }
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
          embed.addFields(
            {
              name: "Số ca mắc trong ngày",
              value: prettyPrintStat(todayCases),
              inline: true,
            },
            {
              name: "Tổng số ca mắc",
              value: numeral(cases).format("0,0"),
              inline: true,
            },
            { name: "\u200B", value: "\u200B" },
            {
              name: "Số ca khỏi trong ngày",
              value: prettyPrintStat(todayRecovered),
              inline: true,
            },
            {
              name: "Tổng số ca khỏi",
              value: numeral(recovered).format("0,0"),
              inline: true,
            },
            { name: "\u200B", value: "\u200B" },
            {
              name: "Số ca chết trong ngày",
              value: prettyPrintStat(todayDeaths),
              inline: true,
            },
            {
              name: "Tổng số ca chết",
              value: numeral(deaths).format("0,0"),
              inline: true,
            }
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
