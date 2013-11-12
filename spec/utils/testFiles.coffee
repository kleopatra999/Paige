testFiles = require '../../lib/utils/testFiles',
fs = require 'fs',
{expect} = require 'chai'

describe "lib/utils/testFiles", ->
  it.only "creates a file", ->
    testFiles {}, (buffer) ->
      fs.writeFilesSync path, buffer
      fs.stat path, (err, stat) ->
        expect(err).to.equal(null)
        expect(stat.isFile()).to.be.true
