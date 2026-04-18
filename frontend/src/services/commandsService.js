import { api } from "@/lib/api";

// Normalize backend → frontend
const mapCommand = (c) => ({
  ...c,
  id: c._id,
});

export async function getCommands() {
  const data = await api.get("/commands");
  return data.map(mapCommand);
}

export async function getCommand(id) {
  const data = await api.get(`/commands/${id}`);
  return mapCommand(data);
}

export async function addCommand(payload) {
  const data = await api.post("/commands", payload);
  return mapCommand(data);
}

export async function updateCommand(id, patch) {
  const data = await api.patch(`/commands/${id}`, patch);
  return mapCommand(data);
}

export async function deleteCommand(id) {
  await api.delete(`/commands/${id}`);
  return { id };
}

// unified interaction
export async function interactWithCommand(id, type) {
  const data = await api.post(`/commands/${id}/interact`, { type });
  return mapCommand(data);
}

// XP derived from usage
export function getXP(commands = []) {
  return commands.reduce((s, c) => s + (c.usageCount || 0), 0);
}
