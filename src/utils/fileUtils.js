/* eslint-disable no-prototype-builtins */
import fs from 'fs'
import util from 'util'
import xml2js from 'xml2js'

const readFile = util.promisify(fs.readFile)
const parser = new xml2js.Parser()

const extractBook = (data) => {
	try {
		const book = data['rdf:RDF']['pgterms:ebook'].shift()
		const rdfAbout = book['$']['rdf:about']
    
		return {
			id: rdfAbout.slice(rdfAbout.lastIndexOf('/') + 1),
			title: book.hasOwnProperty('dcterms:title') ? book['dcterms:title'].shift() : '',
			author: book.hasOwnProperty('dcterms:creator') ? book['dcterms:creator'].shift()['pgterms:agent'].shift()['pgterms:name'].shift() : '',
			publisher: book.hasOwnProperty('dcterms:publisher') ? book['dcterms:publisher'].shift() : '',
			publicationDate: book.hasOwnProperty('dcterms:issued') ? book['dcterms:issued'].shift()['_'] : '',
			lang: book.hasOwnProperty('dcterms:language') ? book['dcterms:language'].shift()['rdf:Description'].shift()['rdf:value'].shift()['_'] : '',
			subject: book.hasOwnProperty('dcterms:subject') ? book['dcterms:subject'].shift()['rdf:Description'].shift()['rdf:value'].shift() : '',
			licenseRights: book.hasOwnProperty('dcterms:rights') ? book['dcterms:rights'].shift() : ''
		}
	} catch (err) {
		console.log(err)
		return null
	}
}

export const readFromFile = (filepath) => {
	parser.reset()
	return new Promise((resolve, reject) => {
		fs.readFile(filepath, 'utf-8', (err, file) => {
			if (err) reject()
			parser.parseString(file, (err, data) => {
				if (err) reject()
          
				const response = extractBook(data)
				resolve(response)
			})
		})
	})
}

export const readFromDirectory = (dirpath) => {
	return new Promise((resolve, reject) => {
		fs.readdir(dirpath, function (err, items) {
			if (err) {
				return console.log('Unable to scan directory: ' + err)
			}
      
			//listing all files using forEach      
			items = items.slice(0, 100).reduce((acc, cur) => {  
				if (/^[0-9]{1,10}$/.test(cur)) 
					acc.push(cur)
				return acc 
			}, [])

			console.log(items.length, "length")
      
			const fnArr = items.map((item) => {
				parser.reset()  
				const filepath = `${dirpath}${item}/pg${item}.rdf`
				return readFile(filepath, 'utf-8').then(file => 
					parser.parseStringPromise(file).then(data => 
						extractBook(data)
					)
				).catch(err => {
					reject(err)
				})
			})

			Promise.all(fnArr).then(response => {
				console.log('res', response)
				resolve(response)
			})
		})
	})
}
