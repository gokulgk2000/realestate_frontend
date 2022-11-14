
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './Component/header'
import Landingpage from './Component/pages/Landingpage'
import Sell from './Component/pages/Sellpage'

const App = () => {
  return (
   <> 
  <Header/>
  <Routes>   
    <Route  path='/' element={<Landingpage/>}/>
   
    <Route  path='/sell' element={<Sell/>}/>

  </Routes></>
   
  )
}

export default App