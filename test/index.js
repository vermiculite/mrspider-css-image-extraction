var cssImageExtraction = require('..');
var chai = require('chai');
var should = chai.should();
var cheerio = require('cheerio');

describe('mrspider-css-image-extraction', function() {

    var validPage;
    var validSpider;
    var validNext;
    var validOptions;

    beforeEach(function() {
        validPage = {};
        validSpider = {};
        validNext = function() {};
        validOptions = {};
    });

    it('should call the next argument', function(done) {
        var imageExtraction = cssImageExtraction(validOptions);
        imageExtraction(validPage, validSpider, done);
    });

    it('should create a data property on the page', function() {
        var imageExtraction = cssImageExtraction(validOptions);
        imageExtraction(validPage, validSpider, validNext);
        should.exist(validPage.data);
    });

    it('should not overwrite an existing data property on the page', function() {
        var imageExtraction = cssImageExtraction(validOptions);
        validPage.data = {msg: 'hi'};
        imageExtraction(validPage, validSpider, validNext);
        validPage.data.msg.should.equal('hi');
    });

    it('should extract images', function(done) {
        validPage.content = `
            <div> <img src="main.jpg" class="main"/><img src="thumb1.jpg" class="thumb"/><img src="thumb2.jpg" class="thumb"/><img src="thumb3.jpg" class="thumb"/></div>
        `;
        validPage.$ = cheerio.load(validPage.content);
        var imageExtraction = cssImageExtraction({
            main: '.main',
            thumbs: '.thumb'
        });
        imageExtraction(validPage, validSpider, function() {
            validPage.data.main.should.deep.equal(['main.jpg']);
            validPage.data.thumbs.should.deep.equal(['thumb1.jpg','thumb2.jpg','thumb3.jpg']);
            done();
        });

    });
});
