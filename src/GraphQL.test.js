import React from 'react';
import ReactDOM from 'react-dom';
import * as clients from './apollo/client';
import * as queries from './apollo/queries';

import { useQuery, gql } from '@apollo/client';



async function getLiquidityPositions(address, query_request ,blockNumber) {
  let result = await clients.client.query({
      query: query_request,
      variables: {
          address: address,
          blockNumber: blockNumber,
      },
      fetchPolicy: "no-cache", 
  });
  return result?.data?.user?.liquidityPositions?.[0]?.pair?.token0?.symbol + result?.data?.user?.liquidityPositions?.[0]?.pair?.token1?.symbol;
}


const UNI_LIQ_POS2 = gql`
        query client {
            user(id: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"){
                liquidityPositions {
                    pair {
                        createdAtBlockNumber
                        token0{
                            symbol
                        }
                        token1{
                            symbol
                        }
                    }
                }
            }
        }
    `


const UNI_LIQ_POS = gql`
    query liquidityPositions($address: ID!, $blockNumber: Int!) {
        user(id: $address, block: {number: $blockNumber}) {
            liquidityPositions {
                pair {
                    createdAtBlockNumber
                    token0{
                        id
                        symbol
                    }
                    token1{
                        symbol
                    }
                }
            }
        }
    }
`

const UNI_LIQ_POS3 = gql`
        query client {
            user(id: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"){
                id
            }
        }
        `

it('GQL queries', async () => {

  var adress_uniswap = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"

  var mypairs = queries.ALL_PAIRS
  var owen = clients.owenClient
  var query = queries.ALL_PAIRS

  var uniswap_liq = UNI_LIQ_POS2

  var query_request = UNI_LIQ_POS
  var block = 10900000
  const data = await getLiquidityPositions(adress_uniswap, query_request, block)
  console.log(data)                         
  expect(data).toBe('SAKEUSDT');

  console.log("Test 2:")

  
  const data2 = await getLiquidityPositions(adress_uniswap, query_request, block)
  console.log(data2)





});
