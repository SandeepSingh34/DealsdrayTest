import { useEffect, useState } from "react"
import Dashboard from "./Pages/Dashboard/dashboard"
import Login from "./Pages/Login/login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminPanel from "./Pages/adminPanel/adminPanel"
import AdminHome from "./components/AdminPanelComponents/adminHome/adminHome"
import List from "./components/AdminPanelComponents/ListData/list"


let App = () => { 
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>        
         <Route exact path="/admin-panel" element={<AdminPanel container={<AdminHome/>}/>}/>
         <Route exact path="/admin-panel/list" element={<AdminPanel container={<List/>}/>}/>
  
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App