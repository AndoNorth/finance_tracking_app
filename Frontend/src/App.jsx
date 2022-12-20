import { useState } from 'react'
import reactLogo from './assets/react.svg'
import 'bootstrap/dist/css/bootstrap.min.css'

import {Home} from './pages/Home/Home';
import {Finances} from './pages/Finances/Finances';
import {Navigation} from './pages/Navigation';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex jusify-content-center">
        Finance Tracking App
      </h3>
      <Navigation/>
      <Routes>
        <Route path='/' element={<Home />} exact/>
        <Route path='/finances' element={<Finances />} exact/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
