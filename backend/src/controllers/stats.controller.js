import { Command } from "../models/command.model.js";


export const getStats = async (req, res, next) => {
  try {
    const totalCommands = await Command.countDocuments({ isArchived: false });
    const totalFavorites = await Command.countDocuments({ isFavorite: true });

    const mostUsed = await Command.find().sort({ usageCount: -1 }).limit(5);

    const recent = await Command.find().sort({ lastUsedAt: -1 }).limit(5);

    res.json({
      totalCommands,
      totalFavorites,
      mostUsed,
      recent,
    });
  } catch (err) {
    next(err);
  }
};
