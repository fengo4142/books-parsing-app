import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import routes from './routers'
import { registerModels } from './models'
import sequelizeConfig from './config/sequelizeConfig'

// sequelize setup
const db = registerModels(sequelizeConfig);
db.sequelize.sync()


// app's init
const app = express()

app.use(express.json());
app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');

app.use('/', routes)


// starting the app
const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
  console.log(`A new app listening on port ${PORT}!`)
})