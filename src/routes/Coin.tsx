import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom"
import styled from "styled-components";
import axios from "axios";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface RouteParams {
    coinId: string,
}

interface StateName {
    name: string,
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
  }
  
  interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  }

 function Coin () {
     const [loading, setLoading] = useState(true)
     const [coinInfo, setCoinInfo] = useState<InfoData[]>([]) 
     const [coinPrice, setCoinPrice] = useState<PriceData[]>([])
     const {coinId} = useParams<RouteParams>() //url의 /:coindId 부분
     const {state} = useLocation<StateName>() //Coins 컴포넌트로 부터 state 받음

    useEffect (() => {
        /*async () => await axios.get<List[]>('https://api.coinpaprika.com/v1/coins' //axios 타입 제한
        ).then(function(response){
            setCoinInfo(response.data.slice(0,100))
            console.log(response.data)
        }).catch(function(error){console.log(error)})
        async() => await axios.get('https://api.coinpaprika.com/v1/tickers' //axios 타입 제한
        ).then(function(response){
            console.log(response.data)
            setLoading(false)
        }).catch(function(error){console.log(error)})*/ //axios로 하려니까 오류'Expected an assignment or function call and instead saw an expression' 발생
        (async () => {
            const infoData = await (
              await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await (
              await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            setCoinInfo(infoData);
            setCoinPrice(priceData);
          })();
    },[])

     return(
     <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title> {/*바로 'https://api.coinpaprika.com/v1/coins/:coindId'로 넘어간 경우 정보가 state로 들어오지 않으므로 처리*/}
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>)
 }

 export default Coin