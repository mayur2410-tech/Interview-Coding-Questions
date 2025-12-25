import React from 'react'
import { BrowserRouter,Router,Routes } from 'react-router-dom'
// import Counter from './components/1.Counter/Counter'
// import Todo from './components/3.Implement a simple Todo app with add and remove/Todo'
import ColorChange from './components/4. Create Button that  change color when clicked/ColorChange'
import Form from './components/5.Build a form with multiple fields and validation. (useState)/Form'
import Fetch from './components/6.Pagination/Fetch'
import FileUpload from './components/7.Drag Drop/FileUpload'
import Todo from './components/8.Functional-Todo/Todo'
import FetchApi from './components/9. Fetch-Api/Fetch'
import Counter from './components/Vikas Sir/1.Counter/Counter'
import "./App.css"
const App = () => {
  return (
    <div>
      {/* <Counter /> */}
      {/* <Todo /> */}
      {/* <ColorChange /> */}
      {/* <Form /> */}
      {/* <Fetch /> */}
     {/* <Fil>eUpload /> */}

     <FetchApi />
     <BrowserRouter>
      <Routes>
        <Route path = '/counter' element ={<Counter />} />

      </Routes>
     </BrowserRouter>
    

    </div>
  )
}

export default App
