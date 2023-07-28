import React, { createContext,useEffect, useState } from 'react'
export const MyContext = createContext()

const MyContextProvider = ({children}) => {

    const [data1,setData1] =useState(null)
    const [isLoading,setIsLoading] =useState(false)

    const [data2,setData2] =useState(null)
    const [newsLoading ,setNewsLoading] =useState(false)
    const [newsSearchTerm,setNewsSearchTerm]= useState('crypto')

    

    const url1 = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
   
    const getData1 = async()=>{
    setIsLoading(true)
    
           try {
            const options = {
                method: 'GET',
                headers: {
                 'X-RapidAPI-Key': 'ad33b2445dmsh302fed887ffa36dp126de6jsn87ffec43f3f9',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
                        }
                          };
	           const response = await fetch(url1, options);
	           const result = await response.json();
            //  console.log(result?.data?.coin.uuid)
	           setData1(result)
               setIsLoading(false)
           } catch (error) {
	           console.error(error);
           }
               }

    const getData2 = async(newsSearchTerm)=>{
      setNewsLoading(true)
      const url2 = `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsSearchTerm}`;
      const options = {
        method: 'GET',
        headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Key': 'ad33b2445dmsh302fed887ffa36dp126de6jsn87ffec43f3f9',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
          }
    };
    
    try {
        const response = await fetch(url2, options);
        const result = await response.json();
        setNewsLoading(false)
        setData2(result)
    } catch (error) {
        console.error(error);
    }

    }

    
      

useEffect(() => {
     getData1()

}, []);
  
useEffect(() => {
    getData2(newsSearchTerm)
    
}, [newsSearchTerm]);



    const contextValue = {data1,isLoading,data2,newsLoading,setNewsSearchTerm}
  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  )
}

export default MyContextProvider
