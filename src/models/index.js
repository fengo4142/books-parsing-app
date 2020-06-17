// src/models/index.ts
import Sequelize from 'sequelize'
import RdfFactory from './Rdf'
import sequelizeConfig from '../config/sequelizeConfig'

const { database, username, password, options } = sequelizeConfig
const sequelize = new Sequelize(database, username, password, options)

export default {
	sequelize,
	Sequelize,
	Rdf: new RdfFactory(sequelize, Sequelize)
}
