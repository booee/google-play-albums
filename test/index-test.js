var gpa = require('../')
var assert = require('assert')

describe('unit tests', function () {
  it('should error on invalid album id', function (done) {
    gpa.getAlbumById('', function (err, album) {
      assert(err, 'Expected error, but none was raised')
      done()
    })
  })

  it('should do nothing on invalid callback', function (done) {
    gpa.getAlbumById('', undefined)
    // TODO: verify no request method executed
    done()
  })

  it('should error on invalid album uri', function (done) {
    gpa.getAlbumByUri('', function (err, album) {
      assert(err, 'Expected error, but none was raised')
      done()
    })
  })

  it('should do nothing on invalid callback', function (done) {
    gpa.getAlbumByUri('', undefined)
    // TODO: verify no request method executed
    done()
  })

  // TODO: mock request package to simulate various scenarios
  // network timeout
  // album not found / 404
  // album has price
  // album is free
  // album has price, but has free tracks
  // album is not an album, but a single (track)

})

describe('integration tests', function () {
  it('should get album by id', function (done) {
    gpa.getAlbumById('Bcy2ehekhvtysp3ftal2bwz7hxe', function (err, album) {
      assertValidAlbum(err, album)
      done()
    })
  })

  it('should get album by uri', function (done) {
    gpa.getAlbumByUri('https://play.google.com/store/music/album/John_Williams_Star_Wars_The_Force_Awakens_Original?id=Bcy2ehekhvtysp3ftal2bwz7hxe', function (err, album) {
      assertValidAlbum(err, album)
      done()
    })
  })
})

function assertValidAlbum (err, album) {
  // console.log(album)
  assert(!err, 'Error while getting album information: ' + err)
  assert(album, 'Album is undefined')
  assert(album.url, 'Album has no url')
  assert(album.title, 'Album has no title')
  assert(album.artworkUrl, 'Album has no artwork url')
  assert(album.artist, 'Album has no artist')
  assert(album.genre, 'Album has no genre')
  assert(album.ratingPercent, 'Album has no rating')
  assert(album.priceDollars, 'Album has no price')
}
