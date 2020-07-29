import { Message, MessageEmbed } from "discord.js";
import { client } from "../../index";
import { Command } from "../../lib/commands/Command";
import { CommandInfo } from "../../lib/commands/CommandInfo";
import { CommandExecutor } from "../../lib/commands/CommandExecutor";

@Command({
  name: "help",
  usage: "[command:string]",
  description:
    "Need some help with commands because they are too complicated? Look no further! I am here to your aid!",
  category: "Miscellaneous",
})
default class implements CommandExecutor {
  execute = async (message: Message, args: string[]): Promise<boolean> => {
    // @ts-ignore
    const help = this.info as CommandInfo;

    const { prefixes } = client.$settings.config;

    const thumbnail = client.user?.displayAvatarURL({
      dynamic: false,
      format: "png",
      size: 2048,
    })!;
    const devID = "333876263859126274";
    const dev = await client.users.fetch(devID);

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(thumbnail)
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp();

    if (args[0]) {
      const command =
        client.$commands.get(args[0]) ||
        client.$commands.get(client.$aliases.get(args[0])!);
      if (!command) return await this.execute(message, []);

      const aliasesPresent =
        typeof command.info.aliases !== "undefined" &&
        command.info.aliases.length > 0;
      const permissionsRequired =
        typeof command.info.permissions !== "undefined" &&
        command.info.permissions.length > 0;

      embed.setTitle(`${command.info.name.toUpperCase()} COMMAND`);
      embed.setDescription(
        [
          `Command provided by ${dev}`,
          `${command.info.description || "No description has been set"}`,
          `Permissions required: ${
            permissionsRequired
              ? `\`${command.info.permissions!.join(" | ")}\``
              : "`None`"
          }`,
        ].join("\n")
      );

      embed.addField(
        "Usage",
        `\`${prefixes[0]}${command.info.name}${
          typeof command.info.usage !== "undefined"
            ? ` ${command.info.usage}`
            : ""
        }\``
      );
      embed.addField(
        "Aliases",
        `${
          aliasesPresent
            ? command.info.aliases!.map((alias) => `\`${alias}\``).join(", ")
            : "`None`"
        }`
      );

      message.channel.send(embed);
      return true;
    }

    const categories = [
      ...new Set(client.$commands.map((command) => command.info.category)),
    ];

    embed.setTitle("-= PẢNK COMMAND LIST =-");
    embed.setDescription(
      [
        `Command provided by ${dev}`,
        `**Prefixes:** ${prefixes
          .map((prefix) => `\`${prefix}\``)
          .join(" | ")}`,
        `<> : Bắt buộc | [] : Tùy chọn`,
        `Dùng \`${prefixes[0]}${help.name} ${help.usage}\` để xem chi tiết.`,
      ].join("\n")
    );

    let categorisedCommands;
    let uncategorised: { info: string; commands: string };

    for (const category of categories) {
      categorisedCommands = client.$commands.filter(
        (cmd) => cmd.info.category === category
      );

      const info = category || "Uncategorised";
      const commands = categorisedCommands
        .map((cmd) => `\`${cmd.info.name}\``)
        .join(", ");

      if (info === "Uncategorised") uncategorised = { info, commands };
      else embed.addField(category || "Uncategorised", commands);
    }

    if (uncategorised!)
      embed.addField(uncategorised!.info, uncategorised!.commands);

    message.channel.send(embed);
    return true;
  };
}
