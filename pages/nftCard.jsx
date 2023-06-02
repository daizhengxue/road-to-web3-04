export const NFTCard = ({ nft }) => {

    return (
        <div className="w-1/4 flex flex-col">
  <div className="rounded-md overflow-hidden">
    <img className="object-cover h-64 w-full" src={nft.metadata?.image} alt="NFT" />
  </div>
  <div className="flex flex-col bg-gray-100 rounded-b-md mt-4">
    <div className="p-4">
      <h2 className="text-xl text-gray-800 mb-2">{nft.name}</h2>
    </div>
    <div className="flex-grow p-4">
      <p className="text-gray-600 mb-4">{nft.metadata?.description}</p>
    </div>
    <div className="p-4 bg-gray-200 rounded-b-md">
      <p className="text-gray-600 overflow-hidden overflow-ellipsis">{nft.contract_address}</p>
    </div>
  </div>
</div>

    )
}