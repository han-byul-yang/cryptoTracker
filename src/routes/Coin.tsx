import { Route, Switch, useLocation, useParams, Link, useRouteMatch } from "react-router-dom"
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../Api";
import {Helmet} from 'react-helmet'

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
  color: ${(props) => props.theme.textColor};
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{isActive : boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color : ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 7px 0px;
    display: block;
  }
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
    //  const [loading, setLoading] = useState(true)
    //  const [infoData, setCoinInfo] = useState<InfoData>() 
    //  const [tickerData, setCoinPrice] = useState<PriceData>()
    const {coinId} = useParams<RouteParams>() //url의 /:coindId 부분
    const {state} = useLocation<StateName>() //Coins 컴포넌트로 부터 state 받음
    const priceMatch = useRouteMatch('/:coinId/price')
    const chartMatch = useRouteMatch('/:coinId/chart')
    const {isLoading: infoLoading, data: infoData} = useQuery(['info',coinId], ()=>fetchCoinInfo(coinId)) //고유한 값을 가져야하기 때문에 배열로 만들어 coinId 앞에 'info' 추가(고유한 값을 가져야하는 이유는 api를 불러올 때 이 값을 보고 같은 값이면 불러올 필요가 없다고 판단하게 되기 때문에 )
    const {isLoading: tickerLoading, data: tickerData} = useQuery(['tickers', coinId], ()=>fetchCoinTickers(coinId), {refetchInterval: 5000}) //왜 화살표 함수로 해주어야 하는지 의문 //isLoading과 data는 객체의 property를 가져와서 syntax로 바꿔줌(자바스크립트) 
    // useEffect (() => {
    //     /*async () => await axios.get<List[]>('https://api.coinpaprika.com/v1/coins' //axios 타입 제한
    //     ).then(function(response){
    //         setCoinInfo(response.data.slice(0,100))
    //         console.log(response.data)
    //     }).catch(function(error){console.log(error)})
    //     async() => await axios.get('https://api.coinpaprika.com/v1/tickers' //axios 타입 제한
    //     ).then(function(response){
    //         console.log(response.data)
    //         setLoading(false)
    //     }).catch(function(error){console.log(error)})*/ //axios로 하려니까 오류'Expected an assignment or function call and instead saw an expression' 발생
    //     (async () => {
    //         const infoData = await (
    //           await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    //         ).json();
    //         const priceData = await (
    //           await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    //         ).json();
    //         setCoinInfo(infoData);
    //         setCoinPrice(priceData);
    //         setLoading(false)
    //       })();
    // },[])

    const isLoading = infoLoading || tickerLoading
     return(
     <Container>
       <Helmet>
       <title>
          {state?.name ? state.name : isLoading ? "Loading..." : infoData?.name}
        </title>
       </Helmet>
      <Header>
      <Title>
          {state?.name ? state.name : isLoading ? "Loading..." : infoData?.name}
        </Title> {/*바로 'https://api.coinpaprika.com/v1/coins/:coindId'로 넘어간 경우 정보가 state로 들어오지 않으므로 처리*/}
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickerData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}> {/*styled component에 적용하기 위한 isActive prop */}
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch> {/*한번에 한번씩만 컴포넌트 보여주기*/}
            <Route path={'/:coinId/chart'}><Chart coinId={coinId} /></Route> {/*state로도 페이지 내부에 다른 페이지를 만들 수 있지만 이렇게 Route를 넣어줌으로써 사용자가 직접 링크를 통해 이동할 수 있고, 이 컴포넌트를 클릭할 경우 리렌더링 될 수 있음*/}
            <Route path={'/:coinId/price'}><Price /></Route>
          </Switch>
        </>
      )}
    </Container>)
 }

 export default Coin