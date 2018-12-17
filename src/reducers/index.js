import produce from "immer";

import initialState from "./initialState";

export { initialState };

const replaceItem = (items, item) => {
  const index = items.findIndex(x => x.id === item.id);
  if (index >= 0) {
    items[index] = item;
  } else {
    items.push(item);
  }
};

const deleteItem = (items, id) => {
  const index = items.findIndex(x => x.id === id);
  if (index >= 0) {
    items.splice(index, index);
  }
};

export default (state = initialState, action) => {
  return produce(state, draft => {
    let event, id;
    switch (action.type) {
      case "RESET":
        draft = initialState;
        break;
      case "FETCH_EVENTS_START":
        draft.events.loading = true;
        break;
      case "FETCH_EVENTS_SUCCESS":
        draft.events.loading = false;
        const { payload: events } = action;
        draft.events = { data: events, loading: false };
        break;
      case "FETCH_EVENTS_FAILURE":
        draft.events.loading = false;
        draft.events = { data: [], loading: false };
        break;
      case "FETCH_EVENT_START":
        draft.events.loading = true;
        break;
      case "FETCH_EVENT_SUCCESS":
        draft.events.loading = false;
        event = action.payload.event;
        replaceItem(draft.events.data, event);
        break;
      case "FETCH_EVENT_FAILURE":
        draft.events.loading = false;
        break;
      case "DELETE_EVENT_START":
        draft.events.loading = true;
        break;
      case "DELETE_EVENT_SUCCESS":
        draft.events.loading = false;
        id = action.payload.id;
        deleteItem(draft.events.data, id);
        break;
      case "DELETE_EVENT_FAILURE":
        draft.events.loading = false;
        break;
      case "CREATE_COMMENT_START":
        draft.events.loading = true;
        break;
      case "CREATE_COMMENT_SUCCESS":
        draft.events.loading = false;
        break;
      case "CREATE_COMMENT_FAILURE":
        draft.events.loading = false;
        break;
      default:
        return state;
    }
  });
};
