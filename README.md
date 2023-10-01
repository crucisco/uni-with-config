# Purpose

The purpose is to find and demonstrate runtime configuration in Angular in lieu of 'environment.ts'.  

This GitHub contains two potential solution projects generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.4, then updated to Angular 16.

_Tip: Open each solution separately to execute Angular CLI or `npm` commands._

## Solution A: APP_INITIALIZER Method

Using APP_INITIALIZER _postpone_ method on [Github](https://github.com/crucisco/uni-with-config).

The solution works with Server-side rendering and prerendering.

## Solution B: browserPlatform Method. Contains errors

Using the _platformBrowserDynamic_ method, as described in [Tim Deshryver's blog post](https://timdeschryver.dev/blog/angular-build-once-deploy-to-multiple-environments).

Whilst this works for normal client-side operation, there are issues with server-side rendering and pre-rendering.

### Server-side error

The issue here seems to be that during server-side rendering the config.json file is simply not available when main.js executes.

```
Waiting for the debugger to disconnect...
./src/%20sync:4
        throw e;
^


Error: Cannot find module './assets/config.json'
    at require (./src/%20sync:2:1)
    at Module.8674 (./src/main.server.ts:4:14)
    at __webpack_require__ (./webpack/bootstrap:19:1)
    at 4991 (D:\Prototypes\uni-with-config-v2\dist\uni-with-config-v2\server\main.js:29:74)
    at __webpack_require__ (./webpack/bootstrap:19:1)
    at <anonymous> (./webpack/bootstrap:36:1)
    at Function.__webpack_require__.O (./webpack/runtime/chunk%20loaded:23:1)
    at __webpack_require__.x (./webpack/bootstrap:37:1)
    at configFile (./webpack/runtime/startup%20chunk%20dependencies:4:1)
    at <anonymous> (./webpack/startup:2:1) {
  code: 'MODULE_NOT_FOUND'
}

Node.js v18.16.0
A server error has occurred.
node exited with 1 code.
connect ECONNREFUSED ::1:52810
```

## General notes
### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Server-side rendering

Run `npm run dev:ssr` for the dev server to render the page _before_ it is sent to the browser. Once loaded, Angular will rehydrate the application and bind values.
Server-side rendering does not persist the page html to disk.

### Prerender

Run `npm run prerender` for the page and assets to be saved on disk as an index.html file in the `dist/uni-with-config/browser` folder.  This is particularly useful for SEO and performance.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
