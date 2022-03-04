import styled from "styled-components"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import {fetchCoins} from "../Api"
import { Helmet } from "react-helmet"
import { useSetRecoilState } from "recoil"
import { isDarkAtom } from "../atom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";//기본 
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"

const Title = styled.div`
font-size: 48px;
color: ${(props)=>props.theme.accentColor};`

const Container = styled.div`
padding: 0px 20px;`

const Header = styled.header`
height: 15vh;
display: flex;
justify-content: center;
align-items: center;`

const CoinsList = styled.ul``

const Coin = styled.li`
background-color: white;
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  padding: 0.5vh;
  margin-bottom: 10px;
  a {
    display: flex;
    text-align: center;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }`

const Loader = styled.div`
`

const Img = styled.img`
width: 35px;
  height: 35px;
  margin-right: 10px;`

const ThemeBtn = styled.div`
position : absolute;
top: 30px;
right: 60px;
transform: scale(1.8);`

//typescript axios api 데이터 interface 타입 제한
interface List {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}


const Coins = () => {
    // const [coinMap, setCoinMap] = useState<List[]>([]) //useState 타입 제한
    // const [loading, setLoading] = useState(true) //loading state 설정
    const {isLoading, data} = useQuery<List[]>('allCoins', fetchCoins)
    const darkAtomfn = useSetRecoilState(isDarkAtom) //useSetRecoilState는 atom의 value를 수정해주는 역할
    const [toggle, setToggle] = useState(true)


    return <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
    <Header>
      <Title>코인</Title>
      <ThemeBtn onClick={() => {darkAtomfn((ele) =>!ele); setToggle((stat) => !stat)}}>{toggle ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>}</ThemeBtn>
    </Header>
    {isLoading ? <Loader>loading...</Loader> :
    <CoinsList>
        {data?.slice(0,100).map((ele) => (<Coin key={ele.id}><Link to={{pathname:`/${ele.id}`, state: {name: ele.name}}}> {/*Link to를 통해서 state를 담아 다른 페이지로 넘겨줌*/}
            <Img src={`https://cryptoicon-api.vercel.app/api/icon/${ele.symbol.toLowerCase()}`}></Img>{ele.name} &rarr;</Link></Coin>))}
    </CoinsList> }
    </Container>
}

export default Coins