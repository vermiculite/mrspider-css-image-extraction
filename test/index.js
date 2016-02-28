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
        validPage.spider = validSpider;
        validNext = function() {};
        validOptions = {};
    });

    it('should call the next argument', function(done) {
        var imageExtraction = cssImageExtraction(validOptions);
        imageExtraction._transform(validPage, done);
    });

    it('should create a data property on the page', function() {
        var imageExtraction = cssImageExtraction(validOptions);
        imageExtraction._transform(validPage, validNext);
        should.exist(validPage.data);
    });

    it('should not overwrite an existing data property on the page', function() {
        var imageExtraction = cssImageExtraction(validOptions);
        validPage.data = {msg: 'hi'};
        imageExtraction._transform(validPage, validNext);
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
        imageExtraction._transform(validPage, function() {
            validPage.data.main.should.deep.equal(['main.jpg']);
            validPage.data.thumbs.should.deep.equal(['thumb1.jpg','thumb2.jpg','thumb3.jpg']);
            done();
        });

    });

    it('should not extract images given an empty src', function(done) {
        validPage.content = `
            <div> <img src="main.jpg" class="main"/><img src="" class="main"/><img src="thumb1.jpg" class="thumb"/><img src="thumb2.jpg" class="thumb"/><img src="thumb3.jpg" class="thumb"/><img class="thumb"/></div>
        `;
        validPage.$ = cheerio.load(validPage.content);
        var imageExtraction = cssImageExtraction({
            main: '.main',
            thumbs: '.thumb'
        });
        imageExtraction._transform(validPage, function() {
            validPage.data.main.should.deep.equal(['main.jpg']);
            validPage.data.thumbs.should.deep.equal(['thumb1.jpg','thumb2.jpg','thumb3.jpg']);
            done();
        });
    });

    it('should extract images given an alternative src attribute', function(done) {
        validPage.content = `
            <div> <img asd="main.jpg" class="main"/><img asd="" class="main"/><img asd="thumb1.jpg" class="thumb"/><img asd="thumb2.jpg" class="thumb"/><img asd="thumb3.jpg" class="thumb"/><img class="thumb"/></div>
        `;
        validPage.$ = cheerio.load(validPage.content);
        var imageExtraction = cssImageExtraction({
            main: '.main',
            thumbs: '.thumb'
        }, 'asd');
        imageExtraction._transform(validPage, function () {
            validPage.data.main.should.deep.equal(['main.jpg']);
            validPage.data.thumbs.should.deep.equal(['thumb1.jpg', 'thumb2.jpg', 'thumb3.jpg']);
            done();
        });
    });
});
