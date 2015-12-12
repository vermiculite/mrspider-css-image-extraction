
module.exports = function(options) {
    return function(page, spider, next) {
        page.data = page.data || {};
        Object.keys(options).forEach(function(key) {
            page.data[key] = page.$(options[key]).map(function() {
                return page.$(this).attr('src');
            });
        });
        next();
    }
};
