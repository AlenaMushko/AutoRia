import NodeCache from "node-cache";

import { ECurrency } from "../enums";
import { ApiError } from "../errors";
import { getCurrencyRate } from "./getCurrencyRate";

interface CurrencyData {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

const myCache = new NodeCache({ stdTTL: 60 * 60 * 24 });

export async function currencyConversion(currency: string, price: number) {
  const cachedDataUSD = myCache.get("dataUSD");
  const cachedDataEUR = myCache.get("dataEUR");

  let dataUSD = null;
  let dataEUR = null;

  if (!cachedDataUSD && !cachedDataEUR) {
    const data = await getCurrencyRate();
    dataUSD = data.find((value: CurrencyData) => value.ccy === "USD");
    dataEUR = data.find((value: CurrencyData) => value.ccy === "EUR");

    myCache.set("dataEUR", dataEUR);
    myCache.set("dataUSD", dataUSD);
  } else {
    dataUSD = cachedDataUSD;
    dataEUR = cachedDataEUR;
  }

  let priceUAN = 0;
  let priceEUR = 0;
  let priceUSD = 0;

  switch (currency) {
    case ECurrency.UAN:
      priceUAN = price;
      priceEUR = parseFloat((price / +dataEUR.sale).toFixed(2));
      priceUSD = parseFloat((price / dataUSD.sale).toFixed(2));
      break;
    case ECurrency.EUR:
      priceUAN = parseFloat((price * dataEUR.buy).toFixed(2));
      priceEUR = price;
      priceUSD = parseFloat(((price * dataEUR.buy) / dataUSD.sale).toFixed(2));
      break;
    case ECurrency.USD:
      priceUAN = parseFloat((price * dataUSD.buy).toFixed(2));
      priceEUR = parseFloat(((price * dataUSD.buy) / dataEUR.sale).toFixed(2));
      priceUSD = price;
      break;
    default:
      throw new ApiError("Enter currency", 404);
  }

  return {
    priceUAN: priceUAN + " " + ECurrency.UAN,
    priceEUR: priceEUR + " " + ECurrency.EUR,
    priceUSD: priceUSD + " " + ECurrency.USD,
    dataUSD,
    dataEUR,
  };
}
