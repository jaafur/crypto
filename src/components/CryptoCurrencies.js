import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../MyContext'
import millify from 'millify'
import { Row,Col,Input ,Card} from 'antd'
import { Link } from 'react-router-dom'


const CryptoCurrencies = ({simplified}) => {
  const count = simplified?10:100;
  const {data1} = useContext(MyContext)
  const [cryptos,setCryptos] = useState([]) 
  const [searchTerm,setSearchTerm] = useState('')
  

  useEffect(() => {
   const filteredData =
    data1?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm?.toLowerCase()) )
    setCryptos(filteredData)
  }, [searchTerm]);
  return (
    <>
    {count !==10 &&<div className='search-crypto'>
     <Input placeholder='Search CryptoCurrency' onChange={(e)=>setSearchTerm(e.target.value)} />
    </div>}
     <Row gutter={[32,32]} className='crypto-card-container'>
       {cryptos?.slice(0, count).map((currency) => (
            <Col xs={24} sm={12} lg={8} className='crypto-card' key={currency.uuid}>
              <Link to={`/cryptocurrencies/${currency.uuid}`} >
                 <Card
                   title={`${currency.rank}.${currency.name}`}
                   extra={<img className='crypto-image' src={currency.iconUrl} /> }
                   hoverable
                 >
                 <p>price : {millify(currency.price)}</p>
                 <p>Market Cap : {millify(currency.marketCap)}</p>
                 <p>Daily Change : {millify(currency.change)}%</p>
                 </Card>
              </Link>
            </Col>
       ))}
     </Row>
    </>
  )
}

export default CryptoCurrencies
