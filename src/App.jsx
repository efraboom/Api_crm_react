import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layaut from './layout/Layout'
import Inicio from './paginas/Inicio'
import NuevoCliente from './paginas/NuevoCliente'
import EditarCliente from './paginas/EditarCliente'
import VerCliente from './paginas/VerCliente'



function App() {

  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>       
        <Route path='/clientes' element={<Layaut/>}>
            <Route index element={<Inicio/>}/>
            <Route path='nuevo' element={<NuevoCliente/>}/>
            <Route path='editar/:id' element={<EditarCliente/>}/>
            <Route path=':id' element={<VerCliente/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
