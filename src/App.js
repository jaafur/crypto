import React from 'react'
import Layout from 'antd/es/layout/layout'
import {Typography} from 'antd'
import { Space } from 'antd'
import { Routes,Route,Link } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import CryptoCurrencies from './components/CryptoCurrencies'
import CryptoDetails from './components/CryptoDetails'
import Exchanges from './components/Exchanges'
import News from './components/News'




const App = () => {
  return (
    <div className='app'>

      <div className='navbar'>
       <Navbar />
      </div>

      <div className='main'>
         <Layout>
           <div className='routes'>
             <Routes>
               <Route path='/' element={<HomePage />} />
               <Route path='/exchanges' element={<Exchanges />} />
               <Route path='/cryptocurrencies' element={<CryptoCurrencies />} />
               <Route path='/cryptocurrencies/:uuid' element={<CryptoDetails />} />
               <Route path='/news' element={<News />} />
             </Routes>
           </div>   
         </Layout>
      
      <div className='footer'>
        <Typography.Title level={5} style={{color:'white'}}>
          Crypto  <br/>
          All Rights Reserved 
        </Typography.Title>
        <Space>
        <Link to='/'>Home</Link>
        <Link to='/exchanges'>Exchanges</Link>
        <Link to='/news'>News</Link>
        </Space>
       </div> 
       </div>
    </div>
  )
}

export default App

