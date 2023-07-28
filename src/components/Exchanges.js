import React, { useState ,useEffect} from 'react'
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import { Oval } from 'react-loader-spinner'
const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const [exchangeList,setExchangeList] = useState(null)
  const [excahngeLoader,setExchangeLoader] = useState(false)
  useEffect(() => {
    const fetchData = async()=>{
      setExchangeLoader(true)
      const url = 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/exchanges?referenceCurrencyUuid=yhjMzLPhuIDl&limit=50&offset=0&orderBy=24hVolume&orderDirection=desc';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'ad33b2445dmsh302fed887ffa36dp126de6jsn87ffec43f3f9',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      };
      
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setExchangeLoader(false)
        setExchangeList(result)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, []);
  if (excahngeLoader) {
    return (
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    );
  }
 
  return (
    <>
    <Row>
    <Col span={6}>Exchanges</Col>
    <Col span={6}>24h Trade Volume</Col>
    <Col span={6}>Markets</Col>
    <Col span={6}>Price</Col>
  </Row>
  <Row>
   {exchangeList?.data.exchanges.map((exchange) => (
    <Col span={24}>
      <Collapse>
        <Panel
          key={exchange.uuid}
          showArrow={false}
          header={(
            <Row key={exchange.uuid}>
              <Col span={6}>
                <Text><strong>{exchange.rank}.</strong></Text>
                <Avatar className="exchange-image" src={exchange.iconUrl} />
                <Text><strong>{exchange.name}</strong></Text>
              </Col>
              <Col span={6}>${millify(exchange['24hVolume'])}</Col>
              <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
              <Col span={6}>{millify(exchange.price)}</Col>
            </Row>
            )}
        >
        {exchange.recommended?'Recommended':'Not Recommended'}
        </Panel>
      </Collapse>
    </Col>
  ))} 
</Row>
    </>
  )
}

export default Exchanges
