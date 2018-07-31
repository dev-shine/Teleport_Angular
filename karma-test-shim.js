// #docregion
// /*global jasmine, __karma__, window*/
Error.stackTraceLimit = 0; // "No stacktrace"" is usually best for app testing.

// Uncomment to get full stacktrace output. Sometimes helpful, usually not.
// Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;


System.config({
    baseURL: "base",
    defaultJSExtensions: true,

    // Extend usual application package list with test folder
    packages: {
        app             : { defaultExtension: 'js' },
        testing         : { main: 'index.js', defaultExtension: 'js' },
        'date-fns'      : { main: 'index.js', defaultExtension: 'js' },
        rxjs            : { defaultExtension: 'js' },
        typescript      : { main: 'lib/typescript.js', defaultExtension: 'js' },
        'concrete-types': { exports: 'Concrete', format: 'global' }
    },

    paths: {
        'npm:': 'node_modules/'
    },

    // Map the angular testing umd bundles
    map: {
        // Standard Angular Libs
        '@angular/animations'                 : 'npm:@angular/animations/bundles/animations.umd.js',
        '@angular/animations/browser'         : 'npm:@angular/animations/bundles/animations-browser.umd.js',
        '@angular/core'                       : 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common'                     : 'npm:@angular/common/bundles/common.umd.js',
        '@angular/compiler'                   : 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser'           : 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
        '@angular/platform-browser-dynamic'   : 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http'                       : 'npm:@angular/http/bundles/http.umd.js',
        '@angular/router'                     : 'npm:@angular/router/bundles/router.umd.js',
        '@angular/forms'                      : 'npm:@angular/forms/bundles/forms.umd.js',

        // Angular Testing Libs
        '@angular/core/testing'                       : 'npm:@angular/core/bundles/core-testing.umd.js',
        '@angular/common/testing'                     : 'npm:@angular/common/bundles/common-testing.umd.js',
        '@angular/compiler/testing'                   : 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
        '@angular/platform-browser/testing'           : 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
        '@angular/platform-browser/animations/testing': 'npm:@angular/platform-browser/bundles/platform-browser-animations-testing.umd.js',
        '@angular/platform-browser-dynamic/testing'   : 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
        '@angular/http/testing'                       : 'npm:@angular/http/bundles/http-testing.umd.js',
        '@angular/router/testing'                     : 'npm:@angular/router/bundles/router-testing.umd.js',
        '@angular/forms/testing'                      : 'npm:@angular/forms/bundles/forms-testing.umd.js',
        '@angular/tsc-wrapped'                        : 'npm:@angular/tsc-wrapped',

        // Shoutpoint TelePort Core Lib
        'shoutpoint-teleport-core': 'npm:shoutpoint-teleport-core/index.umd.js',

        // 3rd Party Libs
        '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
        'concrete-types'   : 'npm:concrete-types/bundle/concrete.min.js',
        'date-fns'         : 'npm:date-fns',
        'rxjs'             : 'npm:rxjs',
        'immutable'        : 'npm:immutable/dist/immutable.min.js',
        'monet'            : 'npm:monet/src/main/javascript/monet.js'
    }
});

initTestBed().then(initTesting);

/////////////////////////////////////////////////
// Init Helpers

var builtPath = '/base/bundle';

__karma__.loaded = function () { };

function isJsFile(path) {
    return path.slice(-3) == '.js';
}

function isSpecFile(path) {
    return /\.spec\.(.*\.)?js$/.test(path);
}

function isBuiltFile(path) {
    return isJsFile(path) && (path.substr(0, builtPath.length) == builtPath);
}

var allSpecFiles = Object.keys(window.__karma__.files)
    .filter(isSpecFile)
    .filter(isBuiltFile);

function initTestBed(){

    return Promise.all([
        System.import('@angular/core/testing'),
        System.import('@angular/platform-browser-dynamic/testing')
    ]).then(function (providers) {

        // console.log("Init TestBed Success");

        var coreTesting    = providers[0];
        var browserTesting = providers[1];

        coreTesting.TestBed.initTestEnvironment(
            browserTesting.BrowserDynamicTestingModule,
            browserTesting.platformBrowserDynamicTesting()
        );

    }).catch(function (err) {
        console.log("Init TestBed Error", err);
        console.error(err);
    });
}

// Import all spec files and start karma
function initTesting () {

    return Promise.all(
        allSpecFiles.map(function (moduleName) { return System.import(moduleName); })
    ).then(
        __karma__.start,
        __karma__.error
    );
}
