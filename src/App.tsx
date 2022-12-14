import { useEffect, useState } from 'react'
import './App.css'
import React from 'react'
import { AxisOptions, Chart } from 'react-charts'

function App() {
  type StockData = {
    title: string,
    stock: number,
  }
  
  type Series = {
    label: string,
    data: StockData[]
  }

  const [stockData,setRatingsData] = useState<StockData[]>([]);

  useEffect(()=>{
      fetchData()
  },[]);

  const fetchData = async () =>{
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      makeData(data['products']);
  }

  const makeData = (data: any[]) =>{
      if(data?.length > 0){
          const modifiedData = data?.map((datum)=>{
             return {
              title: datum?.title,
              stock:datum?.stock
              }
          })
          console.log('data',modifiedData)
          setRatingsData(modifiedData);
      }
  }

  const data: Series[] = [{
    label:"Product Stock Count",
    data: stockData
  }]
  
  const primaryAxis = React.useMemo(
    (): AxisOptions<StockData> => ({
      getValue: datum => datum.title as any,
    }),
    []
  )

  const secondaryAxes = React.useMemo(
    (): AxisOptions<StockData>[] => [
      {
        getValue: datum => datum.stock as any,
        elementType:'bar'
      },
    ],
    []
  )

  return (
   <div className='App'>
     {stockData?.length > 0 ? (
      <Chart
      options={{
          data,
          primaryAxis,
          secondaryAxes,
          getDatumStyle: (datum, status) => {
            return {
              color: datum.secondaryValue >= 100 ? 'red' : 'burlywood',
            }},
        }}
    />
     ) : null}
   </div>
  )
}

export default App
