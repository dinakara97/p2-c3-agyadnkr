import axios from 'axios'

// const url = "http://localhost:3000"
const url = "https://p2-server-agyadnkr.herokuapp.com"

const customer = axios.create({
  baseURL: `${url}/public`
})

const origin = axios.create({
  baseURL: url
})

const qr = axios.create({
  baseURL: " https://api.happi.dev/v1/qrcode"
})

export { customer, origin, qr }