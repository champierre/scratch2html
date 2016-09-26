(function(ext) {
    ext._shutdown = function() {};

    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.html = function() {
        $.post('http://localhost:5678/add', {tag: '<html>'}, function() {
            console.log('add tag: <html>');
        });
    };

    ext.body = function() {
      $.post('http://localhost:5678/add', {tag: '<body>'}, function() {
          console.log('add tag: <body>');
      });
    };

    ext.h1 = function(str) {
      $.post('http://localhost:5678/add', {tag: '<h1>' + str + '</h1>'}, function() {
          console.log('add tag: <h1>' + str + '</h1>');
      });
    };

    ext.p = function(str) {
      $.post('http://localhost:5678/add', {tag: '<p>' + str + '</p>'}, function() {
          console.log('add tag: <p>' + str + '</p>');
      });
    };

    ext.body_end = function() {
      $.post('http://localhost:5678/add', {tag: '</body>'}, function() {
          console.log('add tag: </body>');
      });
    };

    ext.html_end = function() {
      $.post('http://localhost:5678/add', {tag: '</html>'}, function() {
          console.log('add tag: </html>');
      });
    };

    var descriptor = {
        blocks: [
            [' ', '<html>', 'html'],
            [' ', '<body>', 'body'],
            [' ', '<h1> %s </h1>', 'h1', '     '],
            [' ', '<p> %s </p>', 'p', '     '],
            [' ', '</body>', 'body_end'],
            [' ', '</html>', 'html_end'],
        ]
    };

    ScratchExtensions.register('Scratch2HTML', descriptor, ext);
})({});
