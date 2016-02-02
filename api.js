'use strict';

var fetch = require('node-fetch');

const pattern = /<h2><span class="mw-headline" id="Serbo-Croatian">Serbo-Croatian<\/span><\/h2>((?!(<hr \/>|<!--))(\n|.))*/;

class Api {
    static query(q) {
        return fetch(`https://en.wiktionary.org/w/index.php?title=${encodeURIComponent(q)}&printable=yes`)
            .then(res => {
                return res.text();
            })
            .then(html => {
                var m = html.match(pattern);
                if (m) {
                    var content = m[0];
                    var html = content
                        .replace(/<h2>(.*)<\/h2>/, '')
                        .replace(/<a([^>]*)>/g, '<span>')
                        .replace(/<\/a>/g, '</span>');
                    return Promise.resolve(html);
                } else {
                    return Promise.resolve(null);
                }
            });
    }
}

module.exports = Api;
