import { NFTCard } from "./nftCard"
import { useState } from 'react'

const Home = () => {
 const [wallet, setWalletAddress] = useState("");
 const [collection, setCollectionAddress] = useState("");
 const [NFTs, setNFTs] = useState([])
 const [fetchForCollection, setFetchForCollection]=useState(false)


  const fetchNFTs = async() => {
    let nfts; 
    console.log("fetching nfts");
    const api_key = "VsnAcFYVWP8ZgLfnMvAiZpI2CfUfimvM"
    const options = {method: 'GET', headers: {accept: 'application/json', 'x-api-key': 'demo'}};
    // fetch('https://api.chainbase.online/v1/account/nfts?chain_id=1&address=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045&page=1&limit=20', options)
    const baseURL = '/api/nfts'
    // const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    var requestOptions = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-api-key': 'demo'}
      };
     
    if (!collection.length) {
    
      // const fetchURL = `${baseURL}?owner=${wallet}`;
      const fetchURL = `${baseURL}?chain_id=1&address=${wallet}`;
  
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contract_address=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
    }
  
    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.data)
    }
  }
  
  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "VsnAcFYVWP8ZgLfnMvAiZpI2CfUfimvM"
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

 return (
   <div className="flex flex-col items-center justify-center py-8 gap-y-3">
     <div className="flex flex-col w-full justify-center items-center gap-y-2">
     <input disabled={fetchForCollection} type={"text"} placeholder="Add your wallet address" onChange={e => setWalletAddress(e.target.value)} value={wallet}></input>
       <input type={"text"} placeholder="Add the collection address"></input>
       <label className="text-gray-600 "><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
       <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          () => {
           if (fetchForCollection) {
             fetchNFTsForCollection()
           }else fetchNFTs()
         }
       }>Let's go! </button>
     </div>
     <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
       {
         NFTs.length && NFTs.map(nft => {
           return (
             <NFTCard nft={nft}></NFTCard>
           )
         })
       }
     </div>
   </div>
 )
}

export default Home
