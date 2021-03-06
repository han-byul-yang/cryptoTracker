import { useQuery } from "react-query"
import { fetchCoinOhlcv } from "../Api"
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";
import React from 'react'

interface ChartProps {
    coinId : string,
}

interface ChartData {
    time_open: "string",
    time_close: "string",
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    market_cap: number,
}

const Chart = ({coinId}: ChartProps) => {
    const {isLoading, data} = useQuery<ChartData[]>(['ohlcv', coinId], ()=>fetchCoinOhlcv(coinId), {refetchInterval: 5000})
    const isDark = useRecoilValue(isDarkAtom)

    return <div>
     { isLoading ? "loading..." : 
    <ApexChart 
    type="candlestick" series={[{data : data?.map((price)=> [price.time_open, [price.open, price.high, price.low, price.close]])}]}
    options = {{
        chart: {
          height: 350,
          width: 200,
          toolbar:{show: false},
          foreColor: '#f95959',
        },
        colors: ['#f95959'],
        xaxis: {
          type: 'datetime',
          labels: {show: true},
          axisBorder: {show: true},
          axisTicks: {show: true},
          
        },
        theme: {mode: isDark ? 'dark' : 'light'},
        yaxis: {
            show: true,
          tooltip: {
            enabled: true
          },
        axisTicks: {show : true}, 
        },
        tooltip : {
            y: {
            formatter: (value) => value.toFixed(2),
            },
        }
      }}
    // type="line" series={[{name: 'price', data: data?.map((prices)=> prices.close)}]} 
    // options={{chart: {width:500, height:500, toolbar:{show:false}, 
    // foreColor: '#f95959'}, 
    // grid: {show: false}, 
    // theme: {mode: isDark ? 'dark' : 'light'},
    // stroke: {curve: 'smooth', width: 4},
    // colors: ['#f95959'], 
    // xaxis: {labels: {show: false}, 
    // axisTicks: {show : false}, 
    // axisBorder:{show: false}}, 
    // yaxis: {show: false},
    // fill: {
    //     type: "gradient",
    //     gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
    //   },
    // tooltip: {
    // y: {
    //     formatter: (value) => `$${value.toFixed(2)}`,
    //     }
    // }}} 
    />
}
    </div>
}    
export default Chart