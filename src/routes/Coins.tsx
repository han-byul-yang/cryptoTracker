import styled from "styled-components"

const Title = styled.div`
color: ${(props)=>props.theme.accentColor};`

function Coins () {
    return <Title>Coin</Title>
}

export default Coins