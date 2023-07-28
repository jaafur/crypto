import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import MyContextProvider from './MyContext'




const root =ReactDom.createRoot(document.getElementById('root'))
root.render(
    <>
    
    <Router>
    <MyContextProvider>
    <App/>
    </MyContextProvider>
    </Router>
   
    </>
    )