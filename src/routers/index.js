import express from 'express';

import { getRdfs, postReadRdf } from '../controllers/RdfController'
import { getHome } from '../controllers/HomeController'


const router = express.Router();

router.get('/', getHome);
router.get('/rdfs', getRdfs);
router.post('/rdfs/read', postReadRdf)

export default router;