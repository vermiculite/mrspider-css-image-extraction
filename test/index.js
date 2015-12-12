var cssImageExtraction = require('..');

describe('mrspider-css-image-extraction', function() {

    var validPage;
    var validSpider;

    beforeEach(function() {
        validPage = {};
        validSpider = {};
    });

    it('should call the next argument', function(done) {
        var imageExtraction = cssImageExtraction();
        imageExtraction(validPage, validSpider, done);
    });
});
