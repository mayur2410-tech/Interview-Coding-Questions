import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Counter from './components/1.Counter-Application/Counter'
import Navbar from './Navbar'
import Todo from './components/2.Todo List App/Todo'
import Search from './components/3. Search Filter UI/Search'
import Form from './components/4. Form Validation/Form'
import Tabs from './components/5. Tabs Component/Tabs'
import Theme from './components/6. Theme Toggle/Theme'
import Page from './components/7.Pagination Component/Page'

const App = () => {
  return (
    <div>
     
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='counter' element={<Counter />} />
        <Route path='todo' element={<Todo />} />
        <Route path='search' element={<Search />} />
        <Route path='form' element={<Form />} />
        <Route path='tabs' element={<Tabs />} />
        <Route path='theme' element={<Theme />} />
        <Route path='page' element={<Page />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
