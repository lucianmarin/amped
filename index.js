#!/usr/bin/env node
var program = require('commander'),
    read = require('node-readability'),
    format = require('distro-mic').format;

program
    .version('1.0.0')
    .option('-u, --url [type]', 'Input article URL')
    .option('-h, --html [type]', 'Input HTML code')
    .parse(process.argv);

if (program.url && !program.html) {
    read(program.url, function(err, article, meta) {
        console.log(format(article.content).amp);
        article.close();
    });
}

if (program.html && !program.url) {
    console.log(format(program.html).amp);
}
