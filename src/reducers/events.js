import produce from "immer";

const initialState = {
  data: [],
  loading: false
};

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

const spread = produce(Object.assign);

export default (state = initialState, action) => {
  return produce(state, draft => {
    let event, id;
    switch (action.type) {
      case "RESET":
        draft = initialState;
        break;
      case "FETCH_EVENTS_START":
        draft.loading = true;
        break;
      case "FETCH_EVENTS_SUCCESS":
        draft.loading = false;
        const { payload: events } = action;
        spread(draft, { data: events, loading: false });
        break;
      case "FETCH_EVENTS_FAILURE":
        draft.loading = false;
        spread(draft, { data: [], loading: false });
        break;
      case "FETCH_EVENT_START":
        draft.loading = true;
        break;
      case "FETCH_EVENT_SUCCESS":
        draft.loading = false;
        event = action.payload.event;
        replaceItem(draft.data, event);
        break;
      case "FETCH_EVENT_FAILURE":
        draft.loading = false;
        break;
      case "CREATE_EVENT_START":
        draft.loading = true;
        break;
      case "CREATE_EVENT_SUCCESS":
        draft.loading = false;
        break;
      case "CREATE_EVENT_FAILURE":
        draft.loading = false;
        break;
      case "DELETE_EVENT_START":
        draft.loading = true;
        break;
      case "DELETE_EVENT_SUCCESS":
        draft.loading = false;
        id = action.payload.id;
        deleteItem(draft.data, id);
        break;
      case "DELETE_EVENT_FAILURE":
        draft.loading = false;
        break;
      default:
        return state;
    }
  });
};
