import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom';


import Counter from './component/Counter/Counter'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/counter" element={<Counter />}  />
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
