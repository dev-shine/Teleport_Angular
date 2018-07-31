/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/

const components = [
  'all',
  'accordion',
  'autocomplete',
  'chips',
  'collapse',
  'colorpicker',
  'datepicker',
  'dialog',
  'menu',
  'multiselect',
  'select',
  'tabs',
  'tags',
  'toast',
  'tooltip',
];


/** User packages configuration. */
const packages: any = {
  '.': {
    defaultExtension: 'js'
  }
};
components.forEach(name => {
  packages[`md2/${name}`] = {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'index'
  };
});


////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const angularPackages = {
  // Angular specific barrels.
  '@angular/core': { main: 'bundles/core.umd.js' },
  '@angular/core/testing': { main: '../bundles/core-testing.umd.js' },
  '@angular/common': { main: 'bundles/common.umd.js' },
  '@angular/compiler': { main: 'bundles/compiler.umd.js' },
  '@angular/compiler/testing': { main: '../bundles/compiler-testing.umd.js' },
  '@angular/http': { main: 'bundles/http.umd.js' },
  '@angular/http/testing': { main: '../bundles/http-testing.umd.js' },
  '@angular/forms': { main: 'bundles/forms.umd.js' },
  '@angular/router': { main: 'bundles/router.umd.js' },
  '@angular/platform-browser': { main: 'bundles/platform-browser.umd.js' },
  '@angular/platform-browser/testing': { main: '../bundles/platform-browser-testing.umd.js' },
  '@angular/platform-browser-dynamic': { main: 'bundles/platform-browser-dynamic.umd.js' },
  '@angular/platform-browser-dynamic/testing': {
    main: '../bundles/platform-browser-dynamic-testing.umd.js'
  },
};

const barrels: string[] = [
  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'demo-app',
  'button-toggle',
  'gestures',
  'live-announcer',
  'portal',
  'overlay',
  ...components
  /** @cli-barrel */
];

const _cliSystemConfig = angularPackages;
barrels.forEach((barrelName: string) => {
  (<any>_cliSystemConfig)[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: _cliSystemConfig
});

// Apply the user's configuration.
System.config({ packages });
