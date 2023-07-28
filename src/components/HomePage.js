import React, { useContext } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Typography,Row,Col,Statistic } from 'antd'
import { MyContext } from '../MyContext'
import CryptoCurrencies from './CryptoCurrencies'
import News from './News'
import { Oval } from 'react-loader-spinner'
const {Title} = Typography

const HomePage = () => {
  const {data1,isLoading} = useContext(MyContext)
  const globalStats = data1?.data?.stats
  if (isLoading) {
    return(
      <Oval
  height={80}
  width={80}
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#4fa94d"
  strokeWidth={2}
  strokeWidthSecondary={2}

/>
    )
  }
  
  return (
    <>
     <Title level={2} className='heading'>Global Crypto Stats</Title>
       <Row>
         <Col span={12}><Statistic title='Total CryptoCurrencies' value={globalStats?.total}/></Col>  
         <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStats?.totalExchanges)}/></Col>  
         <Col span={12}><Statistic title='Total Market Cap' value={millify(globalStats?.totalMarketCap)}/></Col>  
         <Col span={12}><Statistic title='Total 24h Volume' value={millify(globalStats?.total24hVolume)}/></Col>  
         <Col span={12}><Statistic title='Total Markets' value={millify(globalStats?.totalMarkets)}/></Col>  
       </Row>
       <div className='home-heading-container'>
         <Title level={4} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
         <Title level={5} className='show-more'><Link to='/cryptoCurrencies'>Show More</Link></Title>
       </div>
       <CryptoCurrencies  simplified/> 
       <div className='home-heading-container'>
         <Title level={4} className='home-title'>Latest Crypto News</Title>
         <Title level={4} className='show-more'><Link to='/news'>Show More</Link></Title>
       </div>
       <News  simplified/>
    </>
  )
}

export default HomePage
