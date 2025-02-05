import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets';

export const fetchCoins = async (page = 1) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
