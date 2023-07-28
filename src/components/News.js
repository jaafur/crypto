import React, { useContext ,useEffect,useState} from 'react'
import { Select,Typography,Row,Col,Avatar,Card } from 'antd'
import moment from 'moment/moment'
import { MyContext } from '../MyContext'
import {TailSpin} from 'react-loader-spinner'
const {Title,Text} = Typography
const {Option} = Select
const News = ({simplified}) => {
const {data1,isLoading,data2,newsLoading,setNewsSearchTerm} = useContext(MyContext)
const [cryptoNews, setCryptoNews] = useState([]);
const demoImage = 'https://i.guim.co.uk/img/media/7ec4fcfbda95cfae0b3db6b11a5fe6040d53b411/0_239_3500_2099/master/3500.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=fa7db63e25d23a0de63d71412046b34b'

useEffect(() => {
  if (data2) {
    setCryptoNews(data2.value);
   
  }
}, [data2]);
if(newsLoading){
  return <TailSpin
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
}

const count = simplified?6:12


  return (
    <Row gutter={[24,24]}>
     {count !==6 && (
      <Col span={24}>
        <Select 
        showSearch
        className='select-news'
        placeholder ='Select a Crypto'
        optionFilterProp='children'
        onChange={(e)=>setNewsSearchTerm(e)}
        filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase() >=0)}>
        <Option value='cryptocurrency'>'CryptoCurrency'</Option>
        {data1?.data?.coins.map((coin,index) => <Option key={index} value={coin.name}>{coin.name}</Option>)}
        </Select>
      
      </Col>
     )
    }

    {cryptoNews?.slice(0,count).map((news, index) => (
      <Col xs={24} sm={12} lg={8} key={index}>
        <Card hoverable className='news-card'>
      <a href={news.url} target='_blank' rel='noreferrer'>
        <div className='news-image-container'>
         <Title className='news-title' level={4}>{news.name}</Title>
         <img style={{maxWidth : '200px' ,maxHeight :'100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
        </div>
        <p>
         {news.description > 100? `${news.description.substring(0, 100)}...` :news.description }
        </p>
        <div className='provider-container' >
         <div>
           <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}  alt='news'/>
           <Text className='provider-name'>{news?.provider[0]?.name}</Text>
         </div>
         <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
        </div>
      </a>  
        </Card>      
      </Col>
    ))}
    </Row>
  )
}

export default News
