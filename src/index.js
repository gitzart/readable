import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import './index.css'
import registerServiceWorker from './registerServiceWorker'
import reducer from './reducers'
import App from './components/App'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middlewares = [ thunk, logger ]
const store = composeEnhancers(applyMiddleware(...middlewares))(createStore)(reducer)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
