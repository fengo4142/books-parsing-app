import fs from 'fs'
import xml2js from 'xml2js'

export const readSingleFile = (filepath) => {
    const parser = new xml2js.Parser();
    return new Promise((resolve, reject) => {
      fs.readFile(filepath, 'utf-8', (err, file) => {
        if (err) reject()
        parser.parseString(file, (err, data) => {
          if (err) reject()
          
          const book = data['rdf:RDF']['pgterms:ebook'].shift()
          const rdfAbout = book['$']['rdf:about']
          console.log(Object.keys(book), book['dcterms:publisher'])
          const response = {
            id: rdfAbout.slice(rdfAbout.lastIndexOf('/') + 1),
            title: book['dcterms:title'].shift(),
            author: book['dcterms:creator'].shift()['pgterms:agent'].shift()['pgterms:name'].shift(),
            publisher: book['dcterms:publisher'].shift(),
            publicationDate: book['dcterms:issued'].shift()['_'],
            lang: book['dcterms:language'].shift()['rdf:Description'].shift()['rdf:value'].shift()['_'],
            subject: book['dcterms:subject'].shift()['rdf:Description'].shift()['rdf:value'].shift(),
            licenseRight: book['dcterms:rights'].shift()
          }
          console.log('response', response)
          resolve(response)
        })
      })
    })
}
