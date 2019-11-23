### https://orderbookdelta.netlify.com - link to hosted app

# Delta Coding Challenge

### Problem Statement:

Create an `orderbook` [component](assets/image.png) using [create-react-app](https://create-react-app.dev/)

Specs:
- [ ] It should do live updates to the component, there should be no lags in updation.
- [ ] It should be performant (If the incoming data is 3-4 Mbps, it should work smoothly)
- [ ] It should be extensible (If I ask you to add any new component dependent on socket, architecture should be able to support it)
- [ ] It should be reasonable (You should be able to reason every line of code)
- [ ] It should have minimum bundle size.
- [ ] It should be hosted. (You are free to choose the hosting provider)


You can use state management libraries like redux or mobx or any library you like.

App_link: https://www.delta.exchange/app/trade/BTC/BTCUSD

Docs: https://docs.delta.exchange/

Helpful resources:

Use `wscat` to fiddle with socket. Refer: https://www.npmjs.com/package/wscat

socket_url:`wss://api.delta.exchange:2096`

sample_payload : `{"type":"subscribe","payload":{"channels":[{"name":"l2_orderbook","symbols":["BTCUSD"]}]}}`

cmd:
```bash
wscat -c wss://api.delta.exchange:2096
> {"type":"subscribe","payload":{"channels":[{"name":"l2_orderbook","symbols":["BTCUSD"]}]}}
```
