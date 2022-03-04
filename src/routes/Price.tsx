import { useLocation } from "react-router-dom"
import styled from "styled-components";

const Container = styled.div`
font-size: 27px;
color: #dd2d59;
text-align: center;
`

interface StatePrice {
    price: number,
}

const Price = () => {
    const {state} = useLocation<StatePrice>() //Coins 컴포넌트로 부터 state 받음
    return <Container>${state?.price}</Container>
}

export default Price