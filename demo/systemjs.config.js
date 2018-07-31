/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */

System.config({
    paths: {
      'npm:': '../node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
        // our app is within the app folder
        app: 'app',

        // angular bundles
        '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
        '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
        '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
        '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

        // other libraries
        '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
        'concrete-types': 'npm:concrete-types/bundle/concrete.min.js',
        'date-fns': 'npm:date-fns',
        'immutable': 'npm:immutable/dist/immutable.min.js',
        'monet': 'npm:monet/src/main/javascript/monet.js',
        'rxjs': 'npm:rxjs',

        'shoutpoint-teleport-core': 'npm:shoutpoint-teleport-core/index.umd.js',

        // This setting is dependent on the "path" in tsconfig.json.
        'teleport-module-dev-portal': '../bundle/module.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
        app: {
            main: './main.js',
            defaultExtension: 'js'
        },
        'concrete-types': {
            exports: 'Concrete',
            format: 'global'
        },
        'date-fns': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        rxjs: {
            defaultExtension: 'js'
        }
    }
});
