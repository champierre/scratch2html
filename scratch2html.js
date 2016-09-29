(function(ext) {
    var html;
    var host = "http://www.scratch2html.com";
//    var host = "http://localhost:3000";

    ext._shutdown = function() {};

    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.html = function() {
        html = '<html>';
        $.post('http://localhost:5678/add', {tag: tag}, function() {
            console.log('add tag: <html>');
        });
    };

    ext.body = function() {
        tag = '<body>';
        html += tag;
        $.post('http://localhost:5678/add', {tag: tag}, function() {
            console.log('add tag: <body>');
        });
    };

    ext.h1 = function(str) {
        tag = '<h1>' + str + '</h1>';
        html += tag;
        $.post('http://localhost:5678/add', {tag: tag}, function() {
            console.log('add tag:' + tag);
        });
    };

    ext.h2 = function(str) {
        tag = '<h2>' + str + '</h2>';
        html += tag;
        $.post('http://localhost:5678/add', {tag: tag}, function() {
            console.log('add tag:' + tag);
        });
    };

    ext.p = function(str) {
        tag = '<p>' + str + '</p>';
        html += tag;
        $.post('http://localhost:5678/add', {tag: '<p>' + str + '</p>'}, function() {
            console.log('add tag: <p>' + str + '</p>');
        });
    };

    ext.br = function(str) {
        tag = '<br />';
        html += tag;
        $.post('http://localhost:5678/add', {tag: '<br />'}, function() {
            console.log('add tag: <br />');
        });
    };

    ext.img = function(str) {
        tag = '<img src="' + str + '">';
        html += tag;
        $.post('http://localhost:5678/add', {tag: '<img src="' + str + '">'}, function() {
            console.log('add tag:' + tag);
        });
    };

    ext.table = function() {
        tag = '<table border="1">';
        html += tag;
        $.post('http://localhost:5678/add', {tag: tag}, function() {
            console.log('add tag:' + tag);
        });
    };

    ext.tr = function() {
        tag = '<tr>';
        html += tag;
        $.post('http://localhost:5678/add', {tag: tag}, function() {
            console.log('add tag:' + tag);
        });
    };

    ext.td = function(str) {
        tag = '<td>' + str + '</td>';
        html += tag;
        $.post('http://localhost:5678/add', {tag: tag}, function() {
            console.log('add tag:' + tag);
        });
    };

    ext.tr_end = function() {
        tag = '</tr>';
        html += tag;
        $.post('http://localhost:5678/add', {tag: tag}, function() {
            console.log('add tag:' + tag);
        });
    };

    ext.table_end = function() {
        tag = '</table>';
        html += tag;
        $.post('http://localhost:5678/add', {tag: tag}, function() {
            console.log('add tag:' + tag);
        });
    };

    ext.body_end = function() {
        tag = '</body>';
        html += tag;
        $.post('http://localhost:5678/add', {tag: tag}, function() {
            console.log('add tag:' + tag);
        });
    };

    ext.html_end = function() {
        tag = '</html>';
        html += tag;
        $.post('http://localhost:5678/add', {tag: tag}, function() {
            console.log('add tag:' + tag);
        });
    };

    ext.publish = function(str) {
        $.post(host + '/sites.json', {'site[slug]': str, 'site[html]': html}, function() {
            console.log('post:' + html);
        });
    };

    var descriptor = {
        blocks: [
            [' ', '<html>', 'html'],
            [' ', '<body>', 'body'],
            [' ', '<h1> %s </h1>', 'h1', 'h1'],
            [' ', '<h2> %s </h2>', 'h2', 'h2'],
            [' ', '<p> %s </p>', 'p', 'p'],
            [' ', '<br />', 'br'],
            [' ', '<table border="1">', 'table'],
            [' ', '<tr>', 'tr'],
            [' ', '<td> %s </td>', 'td', 'td'],
            [' ', '<img src=" %s ">', 'img', 'https://wiki.scratch.mit.edu/w/images/Cat.png'],
            [' ', '</tr>', 'tr_end'],
            [' ', '</table>', 'table_end'],
            [' ', '</body>', 'body_end'],
            [' ', '</html>', 'html_end'],
            [' ', 'Publish to http://www.scratch2html.com/ %s', 'publish', '']
        ]
    };

    ScratchExtensions.register('Scratch2HTML', descriptor, ext);
})({});
