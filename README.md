# mrspider-css-image-extraction

Middleware for [mrspider](https://github.com/vermiculite/mrspider) to extract images from a web page. Typically used after [mrspider-request](https://github.com/vermiculite/mrspider-request) and [mrspider-cheerio](https://github.com/vermiculite/mrspider-cheerio) or [mrspider-jsdom](https://github.com/vermiculite/mrspider-jsdom) the page data object will contain the images with the supplied key.

## Install

`npm i -S mrspider-css-image-extraction`

## Usage

var mrspider = require('mrspider');
var spider = mrspider();

var imageExtraction = require('mrspider-css-image-extraction');
var imageExtractor = imageExtraction({
            main: '.main',
            thumbs: '.thumb'
        });
        
spider.use(imageExtractor);
