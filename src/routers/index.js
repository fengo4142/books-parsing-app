import express from 'express';

import { getRdfs } from '../controllers/RdfController'
import { getHome } from '../controllers/HomeController'


const router = express.Router();

router.get('/', getHome);
router.get('/rdf', getRdfs);


export default router;