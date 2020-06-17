import { readSingleFile } from '../utils';
import appRoot from 'app-root-path'
import db from '../models'

export const getRdfs = async (req, res, next) => {

  try {
    const rdfs = await db.Rdf.findAll({})
    return res.json({ result: 'success', data: rdfs })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ result: 'error', error: err })
  }

}

export const postReadRdf = async (req, res, next) => {
  try {
    const path = appRoot + '/cache/epub/1/pg1.rdf'
    const result = await readSingleFile(path)
    return res.json({ result: 'success' })
  } catch (err) {
    return res.status(500).json({ result: 'error', error: JSON.stringify(err) })
  }
}

