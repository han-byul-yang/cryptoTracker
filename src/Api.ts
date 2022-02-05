const BASE_URL = 'https://api.coinpaprika.com/v1'

export const fetchCoins = () => {
    return fetch(`${BASE_URL}/coins`).then((response)=> response.json())
}

export const fetchCoinInfo = (coinId : string) => {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response)=> response.json())
}

export const fetchCoinTickers = (coinId : string) => {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response)=> response.json())
}

export const fetchCoinOhlcv = (coinId : string) => {
    const date = Date.now()
    const end = Math.floor(date / 1000)
    const start = Math.floor(end - 60 * 60 * 24 * 7 * 2)
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${start}&end=${end}`).then((response)=> response.json())
}