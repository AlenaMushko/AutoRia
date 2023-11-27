import { currencyConversion } from "../../../../src/utils/currencyConversion";
import { connection } from "../../../mongo-client";
import { ApiError } from "../../errors";

async function cronUpdatePrice(): Promise<void> {
  try {
    const cars = await connection
      .collection("cars")
      .find()
      .toArray();

    for (const car of cars) {
    const { priceUAN, priceEUR, priceUSD, dataUSD, dataEUR } = await currencyConversion(car.originalCurrency, car.originalPrice);

     await connection.collection('cars').updateOne(
        {_id: car._id},
        {
          $set: {
            priceUAN,
            priceEUR,
            priceUSD,
            dataUSD,
            dataEUR,
            originalCurrency: car.originalCurrency,
            originalPrice: car.originalPrice,
            updatedAt: new Date()
          }
        }
      )
    }
  } catch (err) {
    throw new ApiError(err.message, err.status);
  }
}

export const handler = cronUpdatePrice;
