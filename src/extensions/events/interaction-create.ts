import type { GuildMember } from "discord.js";
import { MessageEmbed } from "discord.js";
import { hasPermission } from "utils/permissions";

import type { EventData, EventHandler } from "types/event";

export const handler: EventHandler = async (
	{ client, logger },
	interaction,
) => {
	if (!interaction.isCommand()) return; // eslint-disable-line prettier/prettier

	const command = client.commands.get(interaction.commandName);
	const interactionMember = interaction.member as GuildMember;
	const hasPermissions = hasPermission(interactionMember, command);

	if (!hasPermissions) {
		const permissionErrorEmbed = new MessageEmbed()
			.setColor("RED")
			.setDescription("You don't have permission to run this command!");

		await interaction.reply({
			ephemeral: true,
			embeds: [permissionErrorEmbed],
		});
	}

	try {
		await command.handler({
			client,
			interaction,
		});
	} catch (error) {
		const genericErrorEmbed = new MessageEmbed()
			.setColor("RED")
			.setDescription("An unexpected error ocurred, try again later.");

		await interaction.reply({
			embeds: [genericErrorEmbed],
			ephemeral: true,
		});
		logger.error(error);
	}
};

export const data: EventData = {
	name: "interactionCreate",
};
