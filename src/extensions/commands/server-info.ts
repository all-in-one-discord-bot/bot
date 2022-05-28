import { MessageEmbed } from "discord.js";
import { getOrFetchMember } from "utils/guilds";
import { formatUsername } from "utils/users";

import type { CommandData, CommandHandler } from "types/command";

export const handler: CommandHandler = async ({ interaction }) => {
	const DEFAULT_USER_COLOR = 0;
	const MINIMUM_STRING_LENGTH = 0;

	const { guild } = interaction;

	const {
		name: guildName,
		ownerId,
		channels: guildChannels,
		description: guildDescription,
		members: guildMembers,
		memberCount: totalGuildMembers,
		roles: guildRoles,
		bans,
		createdTimestamp,
		emojis,
	} = guild;

	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const guildCreatedAtTimestamp = createdTimestamp.toString().slice(0, -3);

	const filteredGuildChannels = guildChannels.cache.filter(
		channel => channel.type === "GUILD_TEXT" || channel.type === "GUILD_VOICE",
	);

	const textChannels = filteredGuildChannels.filter(
		channel => channel.type === "GUILD_TEXT",
	);
	const memberCount = guildMembers.cache.filter(
		member => !member.user.bot,
	).size;

	const { displayColor: ownerDisplayColor } = await getOrFetchMember(
		guild,
		ownerId,
	);

	const guildInfoEmbed = new MessageEmbed()
		.setColor(
			ownerDisplayColor === DEFAULT_USER_COLOR ? "GREEN" : ownerDisplayColor,
		)
		.setAuthor({
			name: guildName,
			iconURL: guild.iconURL({
				dynamic: true,
			}),
		})
		.setFields([
			{
				name: "👑 | Owner",
				value: `<@${ownerId}>`,
			},
			{
				name: "🔠 | Robots",
				value: `${totalGuildMembers - memberCount}`,
				inline: true,
			},
			{
				name: "🔠 | People",
				value: `${memberCount}`,
				inline: true,
			},
			{
				name: "🔨 | Bans",
				value: `${bans.valueOf().size}`,
			},
			{
				name: "🔠 | Number of text channels",
				value: `${textChannels.size}`,
				inline: true,
			},
			{
				name: "🔠 | Number of voice channels",
				value: `${filteredGuildChannels.size - textChannels.size}`,
				inline: true,
			},
			{
				name: "🔠 | Number of roles",
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers
				value: `${guildRoles.valueOf().size - 1}`, // Must disconsider @everyone role
			},
			{
				name: "Boost level",
				value:
					guild.premiumTier === "NONE"
						? "Level 0"
						: guild.premiumTier.replace("Tier_", "Level "),
			},
			{
				name: "Boosts",
				value: `${guild.premiumSubscriptionCount}`,
			},
			{
				name: "🇩 | Description",
				value:
					guildDescription && guildDescription.length > MINIMUM_STRING_LENGTH
						? guildDescription
						: "No description",
			},
			{
				name: "😜 | Number of emojis",
				value: `${emojis.valueOf().size}`,
			},
			{
				name: "🎓 | Language",
				value: guild.preferredLocale,
			},
			{
				name: "📅 | Created at",
				value: `<t:${guildCreatedAtTimestamp}:F> (<t:${guildCreatedAtTimestamp}:R>)`,
			},
		])
		.setThumbnail(guild.bannerURL())
		.setFooter({
			text: `Requested by ${formatUsername(interaction.user)}`,
			iconURL: interaction.user.avatarURL({
				dynamic: true,
			}),
		});

	await interaction.reply({
		embeds: [guildInfoEmbed],
	});
};

export const data: CommandData = {
	name: "si",
	description: "Check some information about the server",
};
