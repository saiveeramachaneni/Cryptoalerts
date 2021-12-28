import React, { useEffect } from "react";
//import "./App.css";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  }),
  fetchOptions: { 
    mode: "no-cors",
  },
  cache: new InMemoryCache(),
});

const DAI_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`;

const ETH_PRICE_QUERY = gql`
  query bundles {
    bundles(where: { id: "1" }) {
      ethPrice
    }
  }
`;


function Tokenprice() {
  
  const MINUTE_MS = 1000;

useEffect(() => {
  const interval = setInterval(() => {
  }, MINUTE_MS);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);
  const { loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY);
  const { loading: daiLoading, data: daiData } = useQuery(DAI_QUERY, {
    variables: {
      tokenAddress: "0x8d3e855f3f55109d473735ab76f753218400fe96",
    },
  });


  const daiPriceInEth = daiData && daiData.tokens[0].derivedETH;
  const daiTotalLiquidity = daiData && daiData.tokens[0].totalLiquidity;
  const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice;
  const daiPriceInUSD = (parseFloat(daiPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(5);


  
  var xhr = new XMLHttpRequest();
  xhr.open('POST', "https://api.telegram.org/bot2131954261:AAHxZdKsVKB5QJsSoezja7I9CQiZSGlu_Qo/sendMessage?chat_id=341336187&parse_mode=Markdown&text="+daiPriceInUSD);
     

  return (
    <div>
      <div>
        Bund price:{" "}
        {ethLoading || daiLoading
          ? "Loading token data..."
          : "$" +
            // parse responses as floats and fix to 2 decimals
            (parseFloat(daiPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(5)}
            {daiPriceInUSD <= 100? xhr.send() : "test"}
      </div>
      <div>
        Dai total liquidity:{" "}
        {daiLoading
          ? "Loading token data..."
          : // display the total amount of DAI spread across all pools
            parseFloat(daiTotalLiquidity).toFixed(0)}
      </div>
    </div>
  );
}

export default Tokenprice;