const BASE_URL = 'https://api.coinpaprika.com/v1'

export const fetchCoins = async() => {
    return await fetch(`${BASE_URL}/coins`).then((response)=> response.json())
}

export const fetchCoinInfo = async(coinId : string) => {
    return await fetch(`${BASE_URL}/coins/btc-bitcoin`).then((response)=> response.json())
}

export const fetchCoinTickers = async(coinId : string) => {
    return await fetch(`${BASE_URL}/tickers/btc-bitcoin`).then((response)=> response.json())
}

export const fetchCoinOhlcv = async(coinId : string) => {
    const date = Date.now()
    const end = Math.floor(date / 1000)
    const start = Math.floor(end - 60 * 60 * 24 * 7 * 2)
    return await fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${start}&end=${end}`).then((response)=> response.json())
}