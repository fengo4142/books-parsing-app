import dotenv from 'dotenv'
import express from 'express'
import path from 'path'

import routes from './routers'
import db from './models'
dotenv.config()


// sequelize setup
db.sequelize.sync({ force: true }).then(() => {
  console.log('synced')
})


// app's init
const app = express()

app.use(express.json());
app.use('/public', express.static(process.cwd() + '/public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use('/', routes)


// starting the app
const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
  console.log(`A new app listening on port ${PORT}!`)
})