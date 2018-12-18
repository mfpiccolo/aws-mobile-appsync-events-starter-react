import produce from "immer";

const initialState = { data: [], laoding: false };

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case "RESET":
        draft = initialState;
        break;
      case "CREATE_COMMENT_START":
        draft.loading = true;
        break;
      case "CREATE_COMMENT_SUCCESS":
        draft.loading = false;
        break;
      case "CREATE_COMMENT_FAILURE":
        draft.loading = false;
        break;
      case "SUBSCRIBE_COMMENT_SUCCESS":
        draft.data.push(action.payload.comment);
        break;
      default:
        return state;
    }
  });
};
