#!/usr/bin/env node

var program = require('commander');

var htmlToArticleJson = require('html-to-article-json')({});
var convertToAmp = require('article-json-to-amp');

var Promise = require('bluebird');
var size = require('request-image-size');

program
    .version('1.2.7')
    .option('-h, --html [type]', 'Input HTML code')
    .parse(process.argv);

if (program.html) {
    amped(program.html);
}

function amped(html) {
    var article = htmlToArticleJson(html);
    var promises = Promise.all(article.map(function(row) {
        var embedType = row.embedType;
        var width = row.width;
        var height = row.height;
        var src = row.src;

        if (embedType !== 'image' || width && height || !src) {
            return row;
        }

        var options = {
            url: src,
            timeout: 1000,
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        };

        return new Promise(function (resolve, reject) {
            size(options, function (err, dimensions) {
                if (err) {
                    reject(err);
                } else {
                    row.width = dimensions.width;
                    row.height = dimensions.height;
                    resolve(row);
                }
            });
        });
    }));
    promises.then(function() {
        console.log(convertToAmp(article));
    });
}
