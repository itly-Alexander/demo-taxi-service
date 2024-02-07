import Client, { IClient } from "../models/Client";

export const createClient = async (clientData: IClient) => {
  const client = new Client(clientData);

  return await client.save();
};

export const findAllClients = async () => {
  return await Client.find();
};
