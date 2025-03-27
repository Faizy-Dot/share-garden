const initialState = {
  messages: [],
  loading: false,
  error: null
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case 'SEND_MESSAGE_SUCCESS':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        error: null
      };
    case 'SEND_MESSAGE_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
} 