var cheerio = require('cheerio')
var request = require('request')

const BASE_URL = 'https://play.google.com/store/music/album/details?id='

function getAlbumByUri (albumUri, callback) {
  if (!albumUri) {
    if(callback) callback('Album Uri is invalid: ' + albumUri)
    return
  }

  parseAlbum(albumUri, callback)
}

function getAlbumById (albumId, callback) {
  if (!albumId) {
    if(callback) callback('Album Id is invalid: ' + albumId)
    return
  }

  parseAlbum(BASE_URL + albumId, callback)
}

function parseAlbum (url, callback) {
  if (!callback) return // no reason to continue

  request(url, function (error, response, body) {
    if (error) {
      callback('Failed to retrieve album information from Google Play: ' + error)
      return
    } else if (response.statusCode !== 200) {
      callback('Failed to retrieve album information from Google Play (' + response.statusCode + ')')
      return
    } else if (!body) {
      callback('Failed to retrieve album information from Google Play: Empty result body')
      return
    }

    var $ = cheerio.load(body)
    var $wrapper = $('div.details-wrapper.music.square-cover.album')
    var $header = $wrapper.find($('.details-info'))

    var album = {}
    album.artist = $header.find('.document-subtitle.primary').html()
    album.artworkUrl = $header.find('img.cover-image').attr('src')
    album.genre = $header.find('a.document-subtitle.category span').html()
    album.priceDollars = parsePriceDollars($header)
    album.ratingPercent = +($header.find('div.current-rating').css('width').slice(0, -1))
    album.ratingStars = (album.ratingPercent / 20).toFixed(1)
    album.title = $header.find('.document-title div').html()
    album.tracks = parseTracks($wrapper)
    album.url = url

    verifyParser(album)
    callback(undefined, album)
  })
}

function parsePriceDollars ($header) {
  var price = $header.find('.music.play-button.buy-button-container .price.buy span').last().html()
  if (price && price.toUpperCase() === 'FREE') {
    return 0
  } else if (price && price.slice(0, 1) == '$') {
    return +(price.slice(1))
  }
}

function parseTracks ($wrapper) {
  // TODO:
  // return []
}

function verifyParser (album) {
  if (Object.keys(album).length < 8) {
    console.warn('Warning: Parsing algorithm may be compromised... Fields are missing!')
  // TODO: notify someone?
  }
}

module.exports = {
  getAlbumById: getAlbumById,
  getAlbumByUri: getAlbumByUri
}
