import * as service from "../services/services/command.service.js";

export const getCommands = async (req, res, next) => {
  try {
    const data = await service.getAllCommands();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getCommand = async (req, res, next) => {
  try {
    const data = await service.getCommandById(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const createCommand = async (req, res, next) => {
  try {
    const data = await service.createCommand(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const updateCommand = async (req, res, next) => {
  try {
    const data = await service.updateCommand(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const deleteCommand = async (req, res, next) => {
  try {
    const data = await service.deleteCommand(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const interact = async (req, res, next) => {
  try {
    const { type } = req.body;
    const data = await service.interactWithCommand(req.params.id, type);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
