import db from '../models'

// list rdfs
export const getRdfs = async (req, res) => {

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
		return res.json({ result: 'error', error: err })
	}

}
