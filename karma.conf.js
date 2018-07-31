// #docregion
module.exports = function(config) {

    var port = 9876;

    var appBase    = 'bundle/';       // transpiled app JS and map files
    var appSrcBase = 'module/';       // app source TS files
    var appAssets  = 'base/';

    var testBase    = 'testing/';       // transpiled test JS and map files
    var testSrcBase = 'testing/';       // test source TS files

    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-coverage'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'), // click "Debug" in browser to see it
            require('karma-htmlfile-reporter') // crashing w/ strange socket error
        ],

        files: [
            'node_modules/systemjs/dist/system.src.js',

            // Polyfills
            'node_modules/core-js/client/shim.js',
            'node_modules/reflect-metadata/Reflect.js',

            // zone.js
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/long-stack-trace-zone.js',
            'node_modules/zone.js/dist/proxy.js',
            'node_modules/zone.js/dist/sync-test.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',

            'node_modules/hammerjs/hammer.js',

            'karma-test-shim.js',

            { pattern: 'node_modules/shoutpoint-teleport-core/index.umd.js', included: false, watched: false },

            // RxJs
            { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

            // Paths loaded via module imports:
            // Angular itself
            { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },

            { pattern: 'node_modules/@angular/material/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/concrete-types/bundle/concrete.min.js', included: false, watched: false },
            { pattern: 'node_modules/date-fns/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/immutable/dist/immutable.min.js', included: false, watched: false },
            { pattern: 'node_modules/monet/src/main/javascript/monet.js', included: false, watched: false },

            { pattern: 'node_modules/typescript/**/*.js', included: false, watched: false },

            // transpiled application & spec code paths loaded via module imports
            // Load all appBase JS, except module.umd.js (to keep out of coverage test report)
            { pattern: appBase + '**/!(module.umd).js', included: false, watched: false },
            { pattern: testBase + '**/*.js', included: false, watched: false },

            // Asset (HTML & CSS) paths loaded via Angular's component compiler
            // (these paths need to be rewritten, see proxies section)
            { pattern: appBase + '**/*.html', included: false, watched: false },
            { pattern: appBase + '**/*.css', included: false, watched: false },
            // { pattern: appSrcBase + '**/*.html', included: false, watched: false },
            // { pattern: appSrcBase + '**/*.css', included: false, watched: false },

            // Paths for debugging with source maps in dev tools
            { pattern: appSrcBase + '**/*.ts', included: false, watched: false },
            { pattern: appBase + '**/*.js.map', included: false, watched: false }
            // { pattern: testSrcBase + '**/*.ts', included: false, watched: false },
            // { pattern: testBase + '**/*.js.map', included: false, watched: false }
        ],

        // urlRoot: '/base/',
        // Proxied base paths for loading assets
        proxies: {
            // required for component assets fetched by Angular's compiler
            // Custom port requires "http://localhost:port"
            "/node_modules/": 'http://localhost:'+ port +'/base/node_modules/',
            "/typescript/": 'http://localhost:'+ port +'/base/node_modules/typescript/'
        },

        exclude: [],
        preprocessors: {
            './bundle/**/*.js': 'coverage'
        },
        // disabled HtmlReporter; suddenly crashing w/ strange socket error
        reporters: ['progress', 'kjhtml', 'html', 'coverage'],

        // HtmlReporter configuration
        htmlReporter: {
            // Open this file to see results in browser
            outputFile: '_test-output/tests.html',

            // Optional
            pageTitle: 'Unit Tests',
            subPageTitle: __dirname
        },

        coverageReporter: {
            type : 'json',
            dir : 'coverage',
            file: '../coverage-final.json',
            includeAllSources: true
        },

        port: port,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browserDisconnectTimeout: 6000,
        browsers: ['Chrome'],
        singleRun: false
    })
};
