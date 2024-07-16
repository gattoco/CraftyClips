import axios from 'axios';
import { twitchAuth } from '../store/config';

const getTwitchAuth = async () => {
  try {
    const response = await axios.post(import.meta.env.VITE_TWITCH_TOKEN_URL, null, {
      params: {
        client_id: import.meta.env.VITE_TWITCH_CLIENT_ID,
        client_secret: import.meta.env.VITE_TWITCH_CLIENT_SECRET,
        grant_type: 'client_credentials'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

const getDataFromApi = async (url: string, params: any) => {
  try {
    if (!twitchAuth.access_token) {
      throw new Error('No access token available');
    }
    const response = await axios.get(url, {
      headers: {
        'Client-ID': import.meta.env.VITE_TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${twitchAuth.access_token}`
      },
      params: {
        ...params
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error;
  }
};

export { getTwitchAuth, getDataFromApi };
