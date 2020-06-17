import express from 'express'

import { getRdfs } from '../controllers/RdfController'
import { getHome } from '../controllers/HomeController'


const router = express.Router()

// home controller routes
router.get('/', getHome)

// rdf controller routes
router.get('/rdfs', getRdfs)

export default router