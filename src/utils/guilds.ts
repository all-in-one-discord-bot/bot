import type { Guild } from "discord.js";

import type { Bot } from "./bot";

export const getOrFetchGuild = async (client: Bot, guildId: string) => {
	const cachedGuild = client.guilds.cache.get(guildId);
	if (!cachedGuild) {
		const fetchedGuild = await client.guilds.fetch(guildId);

		return fetchedGuild;
	}

	return cachedGuild;
};

export const getOrFetchMember = async (guild: Guild, memberId: string) => {
	const cachedMember = guild.members.cache.get(memberId);
	if (!cachedMember) {
		const fetchedGuild = await guild.members.fetch(memberId);

		return fetchedGuild;
	}

	return cachedMember;
};
