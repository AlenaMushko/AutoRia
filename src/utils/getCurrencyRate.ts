import axios from "axios";

export const getCurrencyRate = async () => {
  const privateURL =
    "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5";

  const { data } = await axios.get(privateURL);
  return data;
};
