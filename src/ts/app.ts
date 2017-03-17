import { esriPromise } from 'esri-promise';
import { Promise } from 'es6-promise';
import BoilerFactory from './boilerplate/boilerplate';
import ApplicationFactory from './application/application';

esriPromise([ // Get some info from configuration files with the dojo loader
  'dojo/text!config/appConfig.json',
  'dojo/text!config/boilerplateSettings.json'
]).then(([appConfig, boilerplateSettings]) => { // esri-promise resolves with our requested modules as an array
  ApplicationFactory().then((AppInstance) => {  // make an instance of application
    BoilerFactory(JSON.parse(appConfig), JSON.parse(boilerplateSettings)) // make an instance of boilerplate
    .then((BoilerInstance) => {
      BoilerInstance.init() // initialize the boilerplate --> this returns a promise that resolves with the info we need to boot up our app
      .then((boilerplateResponse) => {
        AppInstance.init(boilerplateResponse);  // initialize the application 
      })
    }).catch(Promise.reject)
  }).catch(Promise.reject)
}).catch((err) => {
  console.error(err);  // If an error occurs at any of these steps, we'd like to see what it is!
})