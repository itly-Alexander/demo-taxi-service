import { Request, Response } from "express";
import * as clientService from "../services/clientService";

export const createClient = async (req: Request, res: Response) => {
  try {
    const client = await clientService.createClient(req.body);
    res.status(201).json(client);
  } catch (error) {
    error instanceof Error
      ? res.status(400).send(error.message)
      : res.status(500);
  }
};

export const findAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await clientService.findAllClients();
    res.json(clients);
  } catch (error) {
    error instanceof Error
      ? res.status(500).send(error.message)
      : res.status(500);
  }
};
