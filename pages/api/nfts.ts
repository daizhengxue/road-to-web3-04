// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query
  console.log(req.query)
  const options = {method: 'GET', headers: {accept: 'application/json', 'x-api-key': 'demo'}};
  const response = await fetch(
    `https://api.chainbase.online/v1/account/nfts?chain_id=1&address=${query.address}&page=1&limit=20`,
    options
  )
  const data = await response.json()
  res.status(200).json(data)
}
