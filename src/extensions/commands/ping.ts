import type { ColorResolvable } from "discord.js";
import { MessageEmbed } from "discord.js";

import type { CommandData, CommandHandler } from "types/command";

export const handler: CommandHandler = async ({ client, interaction }) => {
	const MEDIUM_PING = 150;
	const HIGH_PING = 300;
	const ping = client.ws.ping;
	let embedColor: ColorResolvable = "GREEN";

	if (ping > MEDIUM_PING && ping < HIGH_PING) {
		embedColor = "YELLOW";
	} else if (ping >= HIGH_PING) {
		embedColor = "RED";
	}

	const embed = new MessageEmbed()
		.setColor(embedColor)
		.setDescription(`🏓 | Ping: **${client.ws.ping}ms**`);

	await interaction.reply({
		embeds: [embed],
	});
};

export const data: CommandData = {
	name: "ping",
	description: "Check the current response time",
};
