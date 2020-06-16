import dotenv from 'dotenv'

dotenv.config()

const configs = {
  "development": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD || null,
    "database": process.env.DATABASE,
    "options": {
      "host": process.env.HOSTNAME || '127.0.0.1',
      "dialect": "postgres"
    }
  }
}


export default configs[process.env.NODE_ENV || 'development']