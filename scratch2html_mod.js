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

    ext.h1 = function(str1, str2, str3) {
        if (str1 == undefined) {
          str1 = "";
        }
        if (str2 == undefined) {
          str2 = "";
        }
        if (str3 == undefined) {
          str3 = "";
        }
        tag = '<h1 id ="' + str1 + '" class="' + str2 + '">' + str3 + '</h1>';
        processTag(tag);
    };

    ext.h2 = function(str1, str2, str3) {
        if (str1 == undefined) {
          str1 = "";
        }
        if (str2 == undefined) {
          str2 = "";
        }
        if (str3 == undefined) {
          str3 = "";
        }
        tag = '<h2 id ="' + str1 + '" class="' + str2 + '">' + str3 + '</h2>';
        processTag(tag);
    };

    ext.p = function(str1, str2, str3) {
        if (str1 == undefined) {
          str1 = "";
        }
        if (str2 == undefined) {
          str2 = "";
        }
        if (str3 == undefined) {
          str3 = "";
        }
        tag = '<p id ="' + str1 + '" class="' + str2 + '">' + str3 + '</p>';
        processTag(tag);
    };

    ext.br = function(str) {
        tag = '<br />';
        processTag(tag);
    };

    ext.img = function(str1, str2, str3) {
        if (str1 == undefined) {
          str1 = "";
        }
        if (str2 == undefined) {
          str2 = "";
        }
        if (str3 == undefined) {
          str3 = "";
        }
        tag = '<img id ="' + str1 + '" class="' + str2 + '" src="' + str3 + '">';
        processTag(tag);
    };

    ext.table = function(str1, str2, n) {
        if (str1 == undefined) {
          str1 = "";
        }
        if (str2 == undefined) {
          str2 = "";
        }
        if (n == undefined) {
          n = 0;
        }
        tag = '<table id ="' + str1 + '" class="' + str2 + '" border="' + n + '">';
        processTag(tag);
    };

    ext.tr = function(str1, str2) {
        if (str1 == undefined) {
          str1 = "";
        }
        if (str2 == undefined) {
          str2 = "";
        }
        tag = '<tr id ="' + str1 + '" class="' + str2 + '">';
        processTag(tag);
    };

    ext.td = function(str1, str2, str3) {
        if (str1 == undefined) {
          str1 = "";
        }
        if (str2 == undefined) {
          str2 = "";
        }
        if (str3 == undefined) {
          str3 = "";
        }
        tag = '<td id ="' + str1 + '" class="' + str2 + '">' + str3 + '</td>';
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
        if (str == undefined) {
          str = "";
        }
        tag = '<' + str + '>';
        processTag(tag);
    };

    ext.new_tag_end = function(str) {
        if (str == undefined) {
          str = "";
        }
        tag = '</' + str + '>';
        processTag(tag);
    };

    ext.blank = function(str) {
        if (str == undefined) {
          str = "";
        }
        tag =  str;
        processTag(tag);
    };

    ext.style = function(str) {
        if (str == undefined) {
          str = "";
        }
        tag = '<style type="text/css"><!--' + str + '--></style>';
        processTag(tag);
    };

    ext.javascript = function(str) {
        if (str == undefined) {
          str = "";
        }
        tag = '<script type="text/javascript">' + str + '</script>';
        processTag(tag);
    };

    ext.jquery = function(str) {
        tag = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>';
        processTag(tag);
    };

    var descriptor = {
        blocks: [
            [' ', '<!DOCTYPE html>', 'doctype'],
            [' ', '<html>', 'html'],
            [' ', '<head>', 'head'],
            [' ', '<meta http-equiv="refresh" content=" %s ">', 'refresh', '5'],
            [' ', '<meta charset="utf-8" />', 'charset'],
            [' ', '<style type="text/css"> %s </stle>', 'style', 'p{color:red;font-weight:bold;}'],
            [' ', '</head>', 'head_end'],
            [' ', '<body>', 'body'],
            [' ', '<h1 id =" %s " class = " %s "> %s </h1>', 'h1', '', '', 'h1'],
            [' ', '<h2 id =" %s " class = " %s "> %s </h2>', 'h2', '', '', 'h2'],
            [' ', '<p id =" %s " class = " %s "> %s </p>', 'p', '', '', 'p'],
            [' ', '<br />', 'br'],
            [' ', '<table id =" %s " class = " %s " border=" %n ">', 'table', '', '', 1],
            [' ', '<tr id =" %s " class = " %s ">', 'tr', '', ''],
            [' ', '<td id =" %s " class = " %s "> %s </td>', 'td', '', '', 'td'],
            [' ', '<img id =" %s " class = " %s " src=" %s ">', 'img', '', '', 'https://wiki.scratch.mit.edu/w/images/Cat.png'],
            [' ', '</tr>', 'tr_end'],
            [' ', '</table>', 'table_end'],
            [' ', '< %s >', 'new_tag', 'div'],
            [' ', '</ %s >', 'new_tag_end', 'div'],
            [' ', ' %s ', 'blank', 'blank'],
            [' ', '<script type="text/javascript"> %s </script>', 'javascript', 'alert("Hello Scratch2HTML");'],
            [' ', '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>', 'jquery'],
            [' ', '</body>', 'body_end'],
            [' ', '</html>', 'html_end'],
            [' ', 'Set password to %s', 'set_password', password],
            [' ', 'Publish to http:// %s .scratch2html.com/ %s', 'publish', username, ''],
            [' ', 'Open page', 'open_page'],
        ]
    };

    ScratchExtensions.register('Scratch2HTML', descriptor, ext);

})({});
