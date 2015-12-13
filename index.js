module.exports = function (options) {
    return function (page, spider, next) {
        page.data = page.data || {};
        Object.keys(options).forEach(function (key) {
            page.$(options[key]).each(function () {
                var src = page.$(this).attr('src');
                if (src) {
                    page.data[key] = page.data[key] || [];
                    page.data[key].push(src);
                }
            });
        });
        next();
    }
};
