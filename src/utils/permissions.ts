import type { GuildMember } from "discord.js";

import type { Command } from "types/command";

export const hasPermission = (member: GuildMember, { data }: Command) => {
	const { permissions } = data;
	if (permissions) {
		for (const commandPermission of permissions) {
			if (!member.permissions.has(commandPermission)) {
				return false;
			}
		}
	}

	return true;
};
