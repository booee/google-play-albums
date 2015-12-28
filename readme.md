# Google Play Albums
Easily query album info from Google Play Music

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Install
```
$ npm install --save google-play-albums
```

## Usage
```js
const gpa = require('google-play-albums')

gpa.getAlbumByUri('https://play.google.com/store/music/album/The_Beatles_1_2015_Version?id=Bu2demmv2ucwgoqfjdjzktq2kci', function (err, album) {
  if (!err) {
	  console.log(album.title + ' by ' + album.artist + ' is currently rated ' + album.ratingStars + ' out of 5 stars')
  }
})

gpa.getAlbumById('Bcy2ehekhvtysp3ftal2bwz7hxe', function (err, album) {
  if (!err) {
		console.log(album.title + ' by ' + album.artist + ' is currently rated ' + album.ratingStars + ' out of 5 stars')
  }
})
```

## API

### getAlbumByUri(uri, callback)

#### uri
Type: `string`  
The url listing for the album as it appears on the Google Play website

#### callback(err, album)
Type: `function`  
Called once the album information has been retrieved and parsed, or an error has been encountered

### getAlbumById(albumId, callback)

#### albumId
Type: `string`  
The id for the album as it appears on the Google Play website. This can be found as a URL parameter when viewing an album on the Google Play website.  
e.g. `https://play.google.com/store/music/album/The_Beatles_1_2015_Version?id=Bu2demmv2ucwgoqfjdjzktq2kci` would yield an id of `Bu2demmv2ucwgoqfjdjzktq2kci`

#### callback(err, album)
Type: `function`  
Called once the album information has been retrieved and parsed, or an error has been encountered

## Example album response

```json
{
  artist: 'John Williams',
  artworkUrl: 'https://lh3.googleusercontent.com/FqIZu3zCCz71mRpcelSBol9_rGMlCarmdbVHlwza2JsLlOBlZ5_vjsw_dFridF3Tw9cDtF6AmNw=w300',
  genre: 'Soundtracks',
  priceDollars: 11.49,
  ratingPercent: 93.79276275634766,
  ratingStars: '4.7',
  title: 'Star Wars: The Force Awakens (Original Motion Picture Soundtrack)',
  url: 'https://play.google.com/store/music/album/details?id=Bcy2ehekhvtysp3ftal2bwz7hxe'
}
```
