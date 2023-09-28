# Angular Universal With Runtime Configuration

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.4, then updated to Angular 16.

## This project contains boilerplate code
The purpose is to use runtime configuration in lieu of 'environment.ts'.  
The solution works with Server-side rendering and prerendering.

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
