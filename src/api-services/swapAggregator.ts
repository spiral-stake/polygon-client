import axios from "axios";
import FlashLeverage from "../contract-hooks/FlashLeverage.ts";
import { CollateralToken, InternalSwapData, Token } from "../types";
import { parseUnits } from "../utils/formatUnits";
import BigNumber from "bignumber.js";

const HOSTED_SDK_URL = "https://aggregator-api.kyberswap.com";

export async function getSwapData(
  flashLeverageAddress: string,
  params: Record<string, any> = {}
): Promise<InternalSwapData> {
  const swapRoutes = (
    await axios.get(HOSTED_SDK_URL + "/polygon/api/v1/routes", {
      params,
    })
  ).data.data;

  const swapData = (
    await axios.post(HOSTED_SDK_URL + "/polygon/api/v1/route/build", {
      ...swapRoutes,
      sender: flashLeverageAddress,
      recipient: flashLeverageAddress,
      slippageTolerance: 100, // hardcoded slippage
    })
  ).data.data;

  return {
    swapData: swapData.data,
  } as InternalSwapData;
}

// Slippage hardcoded to 0.1%
export async function getInternalSwapData(
  flashLeverage: FlashLeverage,
  collateralToken: CollateralToken,
  desiredLtv: string,
  amountCollateral: string | bigint | BigInt
): Promise<InternalSwapData> {
  // Need to do this calculation in client itself
  const amountLoan = await flashLeverage.calcLeverageFlashLoan(
    desiredLtv,
    collateralToken,
    amountCollateral
  );

  const params = {
    tokenIn: collateralToken.loanToken.address,
    tokenOut: collateralToken.address,
    amountIn: amountLoan,
  };

  const swapData = await getSwapData(flashLeverage.address, params);
  return swapData;
}

// Slippage hardcoded to 0.1%
export async function getInternalReswapData(
  flashLeverage: FlashLeverage,
  collateralToken: CollateralToken,
  amountLeveragedCollateral: BigNumber
): Promise<InternalSwapData> {
  const params = {
    tokenIn: collateralToken.address,
    tokenOut: collateralToken.loanToken.address,
    amountIn: parseUnits(amountLeveragedCollateral.toString(), collateralToken.decimals),
  };

  const swapData = await getSwapData(flashLeverage.address, params);
  return swapData;
}
