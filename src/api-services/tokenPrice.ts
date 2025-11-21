import axios from "axios";
import BigNumber from "bignumber.js";

export const getTokenPrice = async (tokenId: string): Promise<BigNumber> => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd&x_cg_demo_api_key=${
      import.meta.env.VITE_COINGECKO_API_KEY
    }`
  );

  const price = response.data[tokenId].usd;
  return BigNumber(price); // convert number → string
};
