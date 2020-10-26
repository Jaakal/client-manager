import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

import ClientTable from './components/ClientTable'
import ClientForm from './components/ClientForm'
import Footer from './components/Footer'
import Alert from './components/Alert'

import './css/reset.css'
import './css/App.css'

const App = () =>
  <Provider store={store}>
    <Alert />
    <ClientTable />
    <ClientForm />
    <Footer />
  </Provider>

export default App
