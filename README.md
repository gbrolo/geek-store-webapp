<div align="center">
  <h1>Geek Store Webapp</h1>
  <p>A simple client made with Gatsby to perform requests to the geek-store-api REST API.</p>
</div>

## Production
Run ```npm run production```, (which will run ```npm run build``` and ```npm run serve```) locally on your machine to start app in production mode. You'll need Node.js and Gatsby installed locally on your machine for this to work.

This script will run tests, then build the app with Gatsby and then serve it locally on ```http://localhost:9000```.

## Development
Run ```npm start``` to start on development mode. App will run at port ```http://localhost:8000```.

## Structure and features
All the important code can be found within ```/src``` folder. 

### Redux and Sagas support
At root ```/src``` folder you will find some important configuration files that enable Redux and Sagas with Gatsby. ```AppWrapper``` provides a HOC to wrap the application with Redux, which uses ```configureStore.js``` file to provide a Redux Store.

This file injects inital ```rootReducer.js``` reducer and ```rootSaga.js``` saga as middleware. Other root files such as constants, actions and selectors can be found at the same level.

### Dynamic reducers and sagas
```/utils``` directory contains two files that enable reducers/sagas injection (```reducerInjectors.js``` and ```sagaInjectors.js```). To actually inject a reducer and a saga at any component, then call ```src/utils/injectReducer.js``` and ```/utils/injectSaga.js```, providing an initial object with a ```key``` for the reducer/saga, and the actual reducer/saga:

  - ```{ key: 'yourKey', reducer/saga }```

### Material-UI
This app uses ```material-ui``` to provide theming and styling. You can configure the theme at ```src/utils/theme.js```.

### Components
Each component resides at its own folder inside ```/src/components``` directory. Each component may include the following files:

  - ```index.js``` The actual component.
  - ```constants.js``` Intended to store Redux constants.
  - ```actions.js``` Redux actions.
  - ```reducer.js``` Redux reducer.
  - ```saga.js``` Saga to work with async flows.
  - ```selectors.js``` Selectors to handle Store data inside components and sagas.
  - ```Loadable.js``` for lazy loading using ```Suspense```. This actually does not work with the production build of Gatsby, so this only works for development.

### Axios
This app uses ```axios``` to handle API requests. ```src/axios/axios.js``` contains an axios instance configuration. This instance is used for all requests. You can format axios requests on ```src/axios/response.js``` file. ```src/axios/providers``` directory contains providers to handle requests to the ```geek-store-api``` REST api.