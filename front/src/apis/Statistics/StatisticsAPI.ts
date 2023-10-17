import { instance } from "@/apis/instance";

const getStaisticDiscount = async (month: number) => {
  const response = await instance.get(`/cards/total/discount/${month}`);
  return response.data;
};
const getStaisticConsume = async (month: number) => {
  const response = await instance.get(`/cards/total/price/${month}`);
  return response.data;
};

export { getStaisticDiscount, getStaisticConsume };
