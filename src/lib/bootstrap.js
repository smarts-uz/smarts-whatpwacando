(function() {
    var main = 'app.js';
    var bundle = 'dist/bundle.js';
    var polyfill = 'node_modules/_40webcomponents/webcomponentsjs/webcomponents-loader.js';

    var loadjs = function(file, cb, module) {
        var script = document.createElement('script');
        script.src = file;
        script.onload = cb;
        if(module) {
            script.type = 'module';
        }
        document.querySelector('head').appendChild(script);
    };

    if(!('customElements' in window)) {
        console.log('loading polyfill');
        loadjs(polyfill, function() {
            if(window.WebComponents) {
                window.addEventListener('WebComponentsReady', function() {
                    console.log('WebComponentsReady, loading', bundle);
                    loadjs(bundle);
                });
            }
        });
    }
    else {
        console.log('no polyfill');
        loadjs(main, null, true);
    }
})();
