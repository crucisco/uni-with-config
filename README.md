# Purpose

The purpose is to find and demonstrate runtime configuration in Angular in lieu of `environment.ts`.  

This GitHub contains two potential solution projects generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.4, then updated to Angular 16.

_Tip: Open each solution separately to execute Angular CLI or `npm` commands._

## Solution A: APP_INITIALIZER Method

Using APP_INITIALIZER _postpone_ method as described in [Compile-time vs. Runtime configuration of your Angular App](https://juristr.com/blog/2018/01/ng-app-runtime-config/).

This solution, works with client-side bootstrapping and also server-side rendering and prerendering.

## Solution B: platformBrowserDynamic Method

Using the _platformBrowserDynamic_ method, as described in [Tim Deshryver's blog post](https://timdeschryver.dev/blog/angular-build-once-deploy-to-multiple-environments).

The benefit of this mechanism is that the configuration becomes available much earlier in the application lifecycle, meaning it is available even before execution of `app.module` and can be used outside of components and services, for example with sub-modules or to configure external modules.

Although I had difficulties on the SSR and pre-rendering using this mechanism, it too now works with client-side bootstrapping and also server-side rendering and prerendering.

## General Angular CLI notes
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
