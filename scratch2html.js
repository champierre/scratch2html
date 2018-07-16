(function(ext) {

/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return (document.cookie = [
					key, '=', value,
					attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					attributes.path ? '; path=' + attributes.path : '',
					attributes.domain ? '; domain=' + attributes.domain : '',
					attributes.secure ? '; secure' : ''
				].join(''));
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

    var html;
    var domain = ".com";
//    var domain = ".dev";

    var username = Cookies.get('scratch2html_username') ? Cookies.get('scratch2html_username') : 'www' ;
    var password = Cookies.get('scratch2html_password');
    var slug;

    function processTag(tag) {
      if (tag == '<!DOCTYPE html>') {
          html = '<!DOCTYPE html>';
      } else if (tag == '<html>' && html != '<!DOCTYPE html>') {
          html = '<html>';
      } else {
          html += tag;
      }
      $.post('http://localhost:5678/add', {tag: tag}, function() {
          console.log('add tag:' + tag);
      });
    }

    ext._shutdown = function() {};

    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.doctype = function() {
        tag = '<!DOCTYPE html>';
        processTag(tag);
    };

    ext.html = function() {
        tag = '<html>';
        processTag(tag);
    };

    ext.head = function() {
        tag = '<head>';
        processTag(tag);
    };

    ext.title = function(str1) {
        if (str1 == undefined) {
           str1 = "";
        }
        tag = '<title>' + str1 + '</title>';
        processTag(tag);
    };

    ext.charset = function() {
        tag = '<meta charset="utf-8" />';
        processTag(tag);
    };

    ext.refresh = function(str) {
        tag = '<meta http-equiv="refresh" content="' + str + '">';
        processTag(tag);
    };

    ext.head_end = function() {
        tag = '</head>';
        processTag(tag);
    };

    ext.body = function() {
        tag = '<body>';
        processTag(tag);
    };

    ext.h1 = function(str1, str2) {
        if (str1 == "") {
            tag = '<h1>' + str2 + '</h1>';
        } else {
           tag = '<h1 ' + str1 + '>' + str2 + '</h1>';
        }
        processTag(tag);
    };

    ext.h2 = function(str1, str2) {
        if (str1 == "") {
            tag = '<h2>' + str2 + '</h2>';
        } else {
            tag = '<h2 ' + str1 + '>' + str2 + '</h2>';
        }
        processTag(tag);
    };

    ext.p = function(str1) {
        if (str1 == "") {
            tag = '<p>';
        } else {
            tag = '<p ' + str1 + '>';
        }
        processTag(tag);
    };

    ext.p_end = function() {
        tag = '</p>';
        processTag(tag);
    };
    
    ext.div = function(str1) {
        if (str1 == "") {
            tag = '<div>';
        } else {
            tag = '<div ' + str1 + '>';
        }
        processTag(tag);
    };

    ext.div_end = function() {
        tag = '</div>';
        processTag(tag);
    };
    
    ext.span = function(str1) {
        if (str1 == "") {
            tag = '<span>';
        } else {
            tag = '<span ' + str1 + '>';
        }
        processTag(tag);
    };

    ext.span_end = function() {
        tag = '</span>';
        processTag(tag);
    };
      
    ext.br = function(str) {
        tag = '<br>';
        processTag(tag);
    };

    ext.img = function(str1, str2) {
        if (str1 == "") {
            tag = '<img src="' + str2 + '">';
        } else {
            tag = '<img ' + str1 + ' src="' + str2 + '">';
        }
        processTag(tag);
    };

    ext.a = function(str1, str2) {
        if (str1 == "") {
            tag = '<a href="' + str2 + '">';
        } else {
            tag = '<a ' + str1 + ' href="' + str2 + '">';
        }
        processTag(tag);
    };

    ext.a_end = function() {
        tag = '</a>';
        processTag(tag);
    };

    ext.table = function(str1, n) {
        if (n == "" || isNaN(n)) {
            n = 0;
        }
        if (str1 == "") {
            tag = '<table border="' + n + '">';
        } else {
            tag = '<table ' + str1 + ' border="' + n + '">';
        }
        processTag(tag);
    };

    ext.tr = function(str1) {
        if (str1 == "") {
            tag = '<tr>';
        } else {
            tag = '<tr ' + str1 + '>';
        }
        processTag(tag);
    };

    ext.th = function(str1, str2) {
        if (str1 == "") {
            tag = '<th>' + str2 + '</th>';
        } else {
            tag = '<th ' + str1 + '>' + str2 + '</th>';
        }
        processTag(tag);
    };

    ext.td = function(str1, str2) {
        if (str1 == "") {
            tag = '<td>' + str2 + '</td>';
        } else {
            tag = '<td ' + str1 + '>' + str2 + '</td>';
        }
        processTag(tag);
    };

    ext.tr_end = function() {
        tag = '</tr>';
        processTag(tag);
    };

    ext.table_end = function() {
        tag = '</table>';
        processTag(tag);
    };

    ext.ul = function(str1) {
        if (str1 == "") {
            tag = '<ul>';
        } else {
            tag = '<ul ' + str1 + '>';
        }
        processTag(tag);
    };

    ext.ol = function(str1) {
        if (str1 == "") {
            tag = '<ol>';
        } else {
            tag = '<ol ' + str1 + '>';
        }
        processTag(tag);
    };

    ext.li = function(str1, str2) {
        if (str1 == "") {
            tag = '<li>';
        } else {
            tag = '<li ' + str1 + '>';
        }
        processTag(tag);
    };

    ext.ul_end = function() {
        tag = '</ul>';
        processTag(tag);
    };

    ext.ol_end = function() {
        tag = '</ol>';
        processTag(tag);
    };

    ext.li_end = function() {
        tag = '</li>';
        processTag(tag);
    };

    ext.body_end = function() {
        tag = '</body>';
        processTag(tag);
    };

    ext.html_end = function() {
        tag = '</html>';
        processTag(tag);
    };

    ext.set_password = function(str) {
        password = str;
        Cookies.set('scratch2html_password', str, { expires: 90 });
    };

    ext.publish = function(str1, str2) {
        username = str1
        slug = str2
        Cookies.set('scratch2html_username', username, { expires: 90 });
        $.post('http://' + username + '.scratch2html' + domain + '/sites.json', {'site[slug]': slug, 'site[html]': html, password: password}, function() {
            console.log('post:' + html);
        });
    };

    ext.open_page = function() {
        window.open('http://' + username + '.scratch2html' +  domain + '/' + slug, '_blank');
    }

    ext.new_tag = function(str) {
        tag = '<' + str + '>';
        processTag(tag);
    };

    ext.new_tag_end = function(str) {
        tag = '</' + str + '>';
        processTag(tag);
    };

    ext.blank = function(str) {
        tag =  str;
        processTag(tag);
    };

    ext.css = function(str) {
        tag = '<style type="text/css"><!--';
        processTag(tag);
    };

    ext.css_content = function(str1, str2) {
        tag = str1 + '{' + str2 + '}';
        processTag(tag);
    };

    ext.css_end = function() {
        tag = '--></style>';
        processTag(tag);
    };

    ext.javascript = function(str) {
        tag = '<script type="text/javascript">';
        processTag(tag);
    };

    ext.javascript_end = function() {
        tag = '</script>';
        processTag(tag);
    };

    ext.jquery = function(str) {
        tag = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>';
        processTag(tag);
    };

    ext.offline_page = function() {
        nwin = window.open("");
        nwin.document.open();
        nwin.document.write(html);
        nwin.document.close();
    }

    var descriptor = {
        blocks: [
            [' ', '<!DOCTYPE html>', 'doctype'],
            [' ', '<html>', 'html'],
            [' ', '<head>', 'head'],
            [' ', '<title>  %s  </title>', 'title', 'title_name'],
            [' ', '<meta http-equiv="refresh" content=" %s ">', 'refresh', '5'],
            [' ', '<meta charset="utf-8" />', 'charset'],
            [' ', '<style type="text/css">', 'css'],
            [' ', '%s { %s }', 'css_content', 'p', 'color:red;font-weight:bold;'],
            [' ', '</style>', 'css_end'],
            [' ', '<script type="text/javascript">', 'javascript'],
            [' ', '</script>', 'javascript_end'],
            [' ', '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>', 'jquery'],
            [' ', '</head>', 'head_end'],
            [' ', '<body>', 'body'],
            [' ', '<h1 %s > %s </h1>', 'h1', '', 'header1'],
            [' ', '<h2 %s > %s </h2>', 'h2', '', 'header2'],
            [' ', '<p %s >', 'p', ''],
            [' ', '</p>', 'p_end'],
            [' ', '<div %s >', 'div', ''],
            [' ', '</div>', 'div_end'],
            [' ', '<span %s >', 'span', ''],
            [' ', '</span>', 'span_end'],
            [' ', '<br>', 'br'],
            [' ', '<img %s src=" %s ">', 'img', '', 'https://wiki.scratch.mit.edu/w/images/Cat.png'],
            [' ', '<a %s href=" %s ">', 'a', '', 'https://www.google.co.jp/'],
            [' ', '</a>', 'a_end'],
            [' ', '<table  %s  border=" %n ">', 'table', '', 1],
            [' ', '<tr %s >', 'tr', ''],
            [' ', '<th %s > %s </th>', 'th', '', 'table_header'],
            [' ', '<td %s > %s </td>', 'td', '', 'table_data'],
            [' ', '</tr>', 'tr_end'],
            [' ', '</table>', 'table_end'],
            [' ', '<ul  %s >', 'ul', ''],
            [' ', '<ol %s >', 'ol', ''],
            [' ', '<li %s >', 'li', ''],
            [' ', '</ul>', 'ul_end'],
            [' ', '</ol>', 'ol_end'],
            [' ', '</li>', 'li_end'],
            [' ', '< %s >', 'new_tag', 'tag'],
            [' ', '</ %s >', 'new_tag_end', 'tag'],
            [' ', ' %s ', 'blank', 'blank'],
            [' ', '</body>', 'body_end'],
            [' ', '</html>', 'html_end'],
            [' ', 'Set password to %s', 'set_password', password],
            [' ', 'Publish to http:// %s .scratch2html.com/ %s', 'publish', username, ''],
            [' ', 'Open page', 'open_page'],
            [' ', 'Offline page', 'offline_page'],
        ]
    };

    ScratchExtensions.register('Scratch2HTML', descriptor, ext);

})({});
