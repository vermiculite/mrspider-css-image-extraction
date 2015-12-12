var cssImageExtraction = require('..');
var chai = require('chai');
var should = chai.should();

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

    it('should extract images', function() {
        validPage.content = `
            <div> <a href="main.jpeg" class="main"></a><a href="thumb1.jpg" class="thumb"></a><a href="thumb2.jpg" class="thumb"></a><a href="thumb3.jpg" class="thumb"></a></div>
        `;
        var imageExtraction = cssImageExtraction(validOptions);

    });
});
