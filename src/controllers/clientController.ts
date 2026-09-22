import { Request, Response } from "express";

import Clients from "../database/clientsData";
import { errorMessage } from "../helpers/responseHelper";

// GET /api/client
const getClients = (req: Request, res: Response): void => {
  res.status(200).json(Clients);
};

// GET /api/client/:id
const getClientById = (req: Request, res: Response): void => {
  const id = req?.params?.id;
  if (!id) {
    errorMessage(res, 400, "Client ID is required");
    return;
  }

  const clientIndex = Clients.findIndex(
    (clientDataBase) => clientDataBase.id === id,
  );
  if (clientIndex === -1) {
    errorMessage(res, 404, "Client not found");
    return;
  }

  res.status(200).json(Clients[clientIndex]);
};

// POST /api/client
const createClient = (req: Request, res: Response): void => {
  const client = req.body;

  const clientIndex = Clients.findIndex(
    (clientDataBase) => clientDataBase.id === client.id,
  );

  if (clientIndex !== -1) {
    errorMessage(res, 409, "Client already exists");
    return;
  }

  Clients.push(client);
  res.status(201).json({ message: "Client created successfully", client });
};

// PUT /api/client/:id
const updateClient = (req: Request, res: Response): void => {
  const client = req.body;
  const id = req.params?.id;

  if (!id) {
    errorMessage(res, 400, "Client ID is required");
    return;
  }

  const clientIndex = Clients.findIndex(
    (clientDataBase) => clientDataBase.id === id,
  );
  if (clientIndex === -1) {
    errorMessage(res, 404, "Client not found");
    return;
  }

  Clients[clientIndex] = client;

  res.status(200).json({ message: "Client updated successfully", client });
};

// DELETE /api/client/:id
const deleteClient = (req: Request, res: Response): void => {
  const id = req.params?.id;

  if (!id) {
    errorMessage(res, 400, "Client ID is required");
    return;
  }

  const clientIndex = Clients.findIndex(
    (clientDataBase) => clientDataBase.id === id,
  );
  if (clientIndex === -1) {
    errorMessage(res, 404, "Client not found");
    return;
  }

  const clientRemoved = Clients.splice(clientIndex, 1);
  res
    .status(200)
    .json({ message: "Client deleted successfully", client: clientRemoved });
};

export { getClients, getClientById, createClient, updateClient, deleteClient };
