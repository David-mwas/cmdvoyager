import { Command } from "../../models/command.model.js";


export const getAllCommands = async () => {
  return Command.find({ isArchived: false }).sort({ createdAt: -1 });
};

export const getCommandById = async (id) => {
  return Command.findById(id);
};

export const createCommand = async (data) => {
   const exists = await Command.findOne({ command: data.command });

   if (exists) {
     throw new Error("Command already exists");
   }
  return Command.create(data);
};

export const updateCommand = async (id, data) => {
  return Command.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCommand = async (id) => {
  return Command.findByIdAndUpdate(id, { isArchived: true }, { new: true });
};

export const interactWithCommand = async (id, type) => {
  const command = await Command.findById(id);
  if (!command) throw new Error("Command not found");

  if (type === "copy") {
    command.usageCount += 1;
    command.lastUsedAt = new Date();
  }

  if (type === "favorite") {
    command.isFavorite = !command.isFavorite;
  }

  await command.save();
  return command;
};
