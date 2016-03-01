"use strict";

let through2 = require('through2');

module.exports = function (options, alternateSrcAttribute) {
    var srcAttribute = alternateSrcAttribute || 'src';
    return through2.obj(function (page, enc, next) {
        page.data = page.data || {};
        Object.keys(options).forEach(function (key) {
            page.$(options[key]).each(function () {
                var src = page.$(this).attr(srcAttribute);
                if (src) {
                    page.data[key] = page.data[key] || [];
                    page.data[key].push(src);
                }
            });
        });
        this.push(page);
        next();
    })
};
