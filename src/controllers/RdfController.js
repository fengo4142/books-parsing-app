import { Rdf } from '../models';
import { readSingleFile } from '../utils';

export const getRdfs = async (req, res, next) => {

  try {
    const rdfs = await Rdf.findAll()
    return res.json({ result: 'success', data: rdfs })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ result: 'error', error: err })
  }

}

