export default (sequelize, dataTypes) => {
	const attrs = {
		id: {
			type: dataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		title: {
			type: dataTypes.STRING
		},
		author: {
			type: dataTypes.STRING
		},
		publisher: {
			type: dataTypes.STRING
		},
		publicationDate: {
			type: dataTypes.STRING
		},
		lang: {
			type: dataTypes.STRING
		},
		subject: {
			type: dataTypes.STRING
		},
		licenseRights: {
			type: dataTypes.STRING
		}
	}
  
	// indexs for search
	const indexs = {
		indexes:[
			{
				fields:['id', 'title', 'author', 'publicationDate']
			}
		]
	}
	
	const Rdf = sequelize.define('Rdf', attrs, indexs)

	return Rdf
}