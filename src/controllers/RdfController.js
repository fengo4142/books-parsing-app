import { readFromFile, readFromDirectory } from '../utils'
import appRoot from 'app-root-path'
import db from '../models'

export const getRdfs = async (req, res, next) => {

	try {
		const { searchKey } = req.query
		const cond = {
			where: db.Sequelize.or(
				{ title: db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('title')), 'LIKE', '%' + searchKey.toLowerCase() + '%') },
				{ author: db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('author')), 'LIKE', '%' + searchKey.toLowerCase() + '%') },
				{ publicationDate: db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('publicationDate')), 'LIKE', '%' + searchKey.toLowerCase() + '%') }
			)
		}
		const rdfs = await db.Rdf.findAll(cond)
		return res.json({ result: 'success', data: rdfs })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ result: 'error', error: err })
	}

}

export const postReadRdf = async (req, res, next) => {
	try {
		const path = appRoot + '/cache/epub/'
		const result = await readFromFile(path)
		return res.json({ result: 'success', data: result })
	} catch (err) {
		return res.status(500).json({ result: 'error', error: JSON.stringify(err) })
	}
}

export const postMultiReadRdf = async (req, res, next) => {
	try {
		const path = appRoot + '/cache/epub/'
		const result = await readFromDirectory(path)
		result.forEach(async item => {
			await db.Rdf.create(item)
		})
		return res.json({ result: 'success', data: result })
	} catch (err) {
		return res.status(500).json({ result: 'error', error: JSON.stringify(err) })
	}
}
