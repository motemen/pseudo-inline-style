var PSEUDO_CLASSES  = [ 'hover', 'active', 'focus', 'visited' ],
    PSEUDO_ELEMENTS = [ 'before', 'after' ];

var selector = Array.prototype.concat.call(
    PSEUDO_CLASSES .map(function (c) { return 'data-style-'  + c }),
    PSEUDO_ELEMENTS.map(function (e) { return 'data-style--' + e })
).map(function (s) {
    return '[' + s + ']';
}).join(',');

var generateID = (function () {
    var i = 1;
    return function () { return '__pseudo_inline_style' + i++ };
})();

var styles = [];

var elems = document.body.querySelectorAll(selector);
for (var i = 0, elem; elem = elems[i]; i++) {
    if (!elem.id) {
        elem.setAttribute('id', generateID());
    }

    var id = elem.id;
    PSEUDO_CLASSES.forEach(function (c) {
        var s = elem.getAttribute('data-style-' + c);
        if (!s) return;
        styles.push('#' + id + ':' + c + '{' + s + '}');
    });
    PSEUDO_ELEMENTS.forEach(function (c) {
        var s = elem.getAttribute('data-style-' + c);
        if (!s) return;
        styles.push('#' + id + '::' + c + '{' + s + '}');
    });
}

if (styles.length > 0) {
    var styleElement = document.createElement('style');
    styleElement.appendChild(
        document.createTextNode(styles.join('\n'))
    );
    document.body.appendChild(styleElement);
}
