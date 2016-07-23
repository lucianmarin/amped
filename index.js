#!/usr/bin/env node

var program = require('commander');
var readability = require('node-readability');
var htmlToAmp = require('html-to-amp');

program
    .version('1.1.7')
    .option('-u, --url [type]', 'Input article URL')
    .option('-h, --html [type]', 'Input HTML code')
    .parse(process.argv);

if (program.url && !program.html) {
    readability(program.url, function(err, article, meta) {
        htmlToAmp(article.content).then(function (amp) {
            console.log(amp);
        });
        article.close();
    });
}

if (program.html && !program.url) {
    htmlToAmp(program.html).then(function (amp) {
        console.log(amp);
    });
}
