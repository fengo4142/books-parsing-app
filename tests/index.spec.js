const dotenv = require('dotenv')
const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect
dotenv.config()

import appRoot from 'app-root-path'

import { getHome } from '../src/controllers/HomeController'
import { getRdfs } from '../src/controllers/RdfController'
import { readFromFile, readFromDirectory } from '../src/utils/fileUtils'

describe('Test', function () {

	it('renders index template through home controller', () => {
		const req = {}
		const res = { render: sinon.spy(), context: {} }

		// Also return the promise here, and add an assertion to the chain.
		return getHome(req, res).then(() => {
			expect(res.render.calledOnce).to.be.true
		})
	})

	it('renders list of rdfs', async () => {
		const req = { query: { searchKey: '' } }
		const res = { json: sinon.spy(), status: sinon.spy() }

		// Also return the promise here, and add an assertion to the chain.
		return await getRdfs(req, res).then(() => {
			expect(res.json.calledOnce).to.be.true
		})
	})

	it('reads from directory', async () => {
		const filepath = appRoot + '/cache/epub/1/'
		const books = await readFromDirectory(filepath)
		expect(books.length).to.equal(1)
	})

	it('reads from a file', async () => {
		const filepath = appRoot + '/cache/epub/1/pg1.rdf'
		const book = await readFromFile(filepath)
		expect(book).include.all.keys('id', 'title', 'author', 'publisher', 'publicationDate', 'lang', 'subject', 'licenseRights')
	})
})

