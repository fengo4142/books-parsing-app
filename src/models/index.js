// src/models/index.ts
import Sequelize from 'sequelize';
import { RdfFactory } from './Rdf';

export const registerModels = (config) => {
  const { database, username, password, options } = config;
  console.log(database, username, password, options)
  const sequelize = new Sequelize(database, username, password, options);

  const db = {
    sequelize,
    Sequelize,
    Rdf: RdfFactory(sequelize, Sequelize),
  };

  return db;
};