{ createImage } = require "../../index"
fs = require 'fs',
{ expect } = require 'chai'

describe "lib/utils/createImage", ->
  it "creates an image", ->
    createImage {}, (buffer) ->
      fs.writeFilesSync path, buffer
      fs.stat path, (err, stat) ->
        expect(err).to.equal(null)
        expect(stat.isFile()).to.be.true
