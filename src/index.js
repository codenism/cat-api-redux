import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {createStore, compose, applyMiddleware} from 'redux'
import rootReducer from './store/reducers/rootReducer'
import {Provider} from 'react-redux'
import createSagaMiddleware, { runSaga } from 'redux-saga'
import mySaga from './store/sagas'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;


const sagaMiddleware = createSagaMiddleware()


const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(mySaga)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)


ReactDOM.render(app, document.getElementById('root'))

