import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import appRoot from 'app-root-path'

import { readFromDirectory } from './utils/fileUtils'
import routes from './routers'
import db from './models'
dotenv.config()


// sequelize seeding data from files
db.sequelize.sync({ force: true }).then(async () => {
	console.log('synced')
	const dirpath = appRoot + '/cache/epub/'
	const seeds = await readFromDirectory(dirpath)
	seeds.forEach(async item => {
		await db.Rdf.create(item)
	})
})


// app's init
const app = express()

app.use(express.json())
app.use('/public', express.static(process.cwd() + '/public'))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use('/', routes)


// starting the app
const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
	console.log(`A new app listening on port ${PORT}!`)
})