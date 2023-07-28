import React, { useEffect, useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Oval } from 'react-loader-spinner'
import ChartComponent from './ChartComponent';
const { Title ,Text } = Typography;
const {Option} = Select

const CryptoDetails = () => {
  const { uuid } = useParams();
  
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cryptoHistory,setCryptoHistory] = useState(null)
  const [historyLoader,setHistoryLoader] = useState(false)
  const [timePeriod, setTimePeriod] = useState('5y');


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setHistoryLoader(true);

      const coinDataUrl = `https://coinranking1.p.rapidapi.com/coin/${uuid}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`;
      // const url = 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h';
      const historyDataUrl = `https://coinranking1.p.rapidapi.com/coin/${uuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`;

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'ad33b2445dmsh302fed887ffa36dp126de6jsn87ffec43f3f9',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
        },
      };

      try {
        const [coinDataResponse, historyDataResponse] = await Promise.all([
          fetch(coinDataUrl, options),
          fetch(historyDataUrl, options),
        ]);

        const coinDataResult = await coinDataResponse.json();
        const historyDataResult = await historyDataResponse.json();

        setCryptoDetails(coinDataResult);
        setCryptoHistory(historyDataResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
        setHistoryLoader(false);
      }
    };
  
    fetchData();
    
  }, [uuid, timePeriod]);

  if (isLoading || historyLoader) {
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

  if (!cryptoDetails) {
    return <div>No data found for the selected cryptocurrency.</div>;
  }



  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.data?.coin.price && millify(cryptoDetails?.data?.coin.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.data?.coin.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.data?.coin['24hVolume'] && millify(cryptoDetails?.data?.coin['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.data?.coin.marketCap && millify(cryptoDetails?.data?.coin.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.data?.coin.allTimeHigh?.price && millify(cryptoDetails?.data?.coin.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.data?.coin.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.data?.coin.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.data?.coin.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.data?.coin.supply?.total && millify(cryptoDetails?.data?.coin.supply?.total )}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.data?.coin.supply?.circulating && millify(cryptoDetails?.data?.coin.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  

  return (
    <Col className="coin-detail-container">

    <Col className="coin-heading-container">
    <Title level={2} className="coin-name">
      {cryptoDetails?.data?.coin.name} ({cryptoDetails?.data?.coin.name}) Price
    </Title>
    <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
  </Col>
      
  <Select value={timePeriod} className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimePeriod(value)}>
  <Option value="1h">1 Hour</Option>
  <Option value="3h">3 Hours</Option>
  <Option value="12h">12 Hours</Option>
  <Option value="24h">24 Hours</Option>
  <Option value="7d">7 Days</Option>
  <Option value="30d">30 Days</Option>
  <Option value="3m">3 Months</Option>
  <Option value="1y">1 Year</Option>
  <Option value="3y">3 Years</Option>
  <Option value="5y">5 Years</Option>
</Select>




      {cryptoHistory &&<ChartComponent coinHistory={cryptoHistory} currentPrice={millify(cryptoDetails?.data?.coin.price)} coinName={cryptoDetails?.data?.coin.name} />}


      <Col className="stats-container">
      <Col className="coin-value-statistics">
        <Col className="coin-value-statistics-heading">
          <Title level={3} className="coin-details-heading">{cryptoDetails?.data?.coin.name} Value Statistics</Title>
          <p>An overview showing the statistics of {cryptoDetails?.data?.coin.name}, such as the base and quote currency, the rank, and trading volume.</p>
        </Col>
        {stats.map(({ icon, title, value }, index) => (
          <Col className="coin-stats" key={index}>
            <Col className="coin-stats-name">
              <Text>{icon}</Text>
              <Text>{title}</Text>
            </Col>
            <Text className="stats">{value}</Text>
          </Col>
        ))}
      </Col>
      <Col className="other-stats-info">
        <Col className="coin-value-statistics-heading">
          <Title level={3} className="coin-details-heading">Other Stats Info</Title>
          <p>An overview showing the statistics of {cryptoDetails?.data?.coin.name}, such as the base and quote currency, the rank, and trading volume.</p>
        </Col>
        {genericStats.map(({ icon, title, value ,index }) => (
          <Col className="coin-stats" key={index}>
            <Col className="coin-stats-name">
              <Text>{icon}</Text>
              <Text>{title}</Text>
            </Col>
            <Text className="stats">{value}</Text>
          </Col>
        ))}
      </Col>
    </Col>

    <Col className="coin-desc-link">
    <Row className="coin-desc">
      <Title level={3} className="coin-details-heading">What is {cryptoDetails?.data?.coin.name}?</Title>
      {cryptoDetails?.data?.coin.description}
    </Row>
    <Col className="coin-links">
      <Title level={3} className="coin-details-heading">{cryptoDetails?.data?.coin.name} Links</Title>
      {cryptoDetails?.data?.coin.links?.map((link ) => (
        <Row className="coin-link" key={link.name}>
          <Title level={5} className="link-name">{link.type}</Title>
          <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
        </Row>
      ))}
    </Col>
  </Col>
    </Col>
  );
};

export default CryptoDetails;


