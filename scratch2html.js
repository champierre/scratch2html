(function(ext) {
    var html;
    
    ext._shutdown = function() {};

    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.html = function() {
        html = '<html>';
        $.post('http://localhost:5678/add', {tag: '<html>'}, function() {
            console.log('add tag: <html>');
        });
    };

    ext.body = function() {
        tag = '<body>';
        html += tag;
        $.post('http://localhost:5678/add', {tag: '<body>'}, function() {
            console.log('add tag: <body>');
        });
    };

    ext.h1 = function(str) {
        tag = '<h1>' + str + '</h1>';
        html += tag;
        $.post('http://localhost:5678/add', {tag: '<h1>' + str + '</h1>'}, function() {
            console.log('add tag: <h1>' + str + '</h1>');
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
        html += '<img src="' + str + '">';
        html += tag;
        $.post('http://localhost:5678/add', {tag: '<img src="' + str + '">'}, function() {
            console.log('add tag: <img src="' + str + '">');
        });
    };

    ext.body_end = function() {
        tag = '</body>';
        html += tag;
        $.post('http://localhost:5678/add', {tag: '</body>'}, function() {
            console.log('add tag: </body>');
        });
    };

    ext.html_end = function() {
        tag = '</html>';
        html += tag;
        $.post('http://localhost:5678/add', {tag: '</html>'}, function() {
            console.log('add tag: </html>');
        });
    };
    
    ext.publish = function(str) {
        $.post('https://scratch2html.herokuapp.com/sites.json', {'site[slug]': str, 'site[html]': html}, function() {
            console.log('post:' + html);
        });
    };

    var descriptor = {
        blocks: [
            [' ', '<html>', 'html'],
            [' ', '<body>', 'body'],
            [' ', '<h1> %s </h1>', 'h1', 'h1'],
            [' ', '<p> %s </p>', 'p', 'p'],
            [' ', '<br />', 'br'],
            [' ', '<img src=" %s ">', 'img', 'https://wiki.scratch.mit.edu/w/images/Cat.png'],
            [' ', '</body>', 'body_end'],
            [' ', '</html>', 'html_end'],
            [' ', 'Publish to https://scratch2html.herokuapp.com/ %s', 'publish', '']
        ]
    };

    ScratchExtensions.register('Scratch2HTML', descriptor, ext);
})({});
