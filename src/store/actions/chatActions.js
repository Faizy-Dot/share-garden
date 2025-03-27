import axios from 'axios';
import { API_URL } from '../../config/Constants';

export const sendMessage = (messageData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/chat/send-message`, messageData);
      
      dispatch({
        type: 'SEND_MESSAGE_SUCCESS',
        payload: response.data
      });

      return response.data;
    } catch (error) {
      dispatch({
        type: 'SEND_MESSAGE_ERROR',
        payload: error.message
      });
      throw error;
    }
  };
}; 