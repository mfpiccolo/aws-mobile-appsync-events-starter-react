import mqtt from "mqtt";

import fetchGQL from "./fetchGQL";
import { getEventsQuery } from "../GraphQL/QueryAllEvents";
import { getEventQuery } from "../GraphQL/QueryGetEvent";
import { deleteEventQuery } from "../GraphQL/MutationDeleteEvent";
import { commentOnEventQuery } from "../GraphQL/MutationCommentOnEvent";
import { createEventQuery } from "../GraphQL/MutationCreateEvent";
import { subscribeToEventCommentsQuery } from "../GraphQL/SubsriptionEventComments";

export const fetchEvents = async dispatch => {
  try {
    dispatch({ type: "FETCH_EVENTS_START" });
    const response = await fetchGQL(getEventsQuery);
    const {
      data: {
        listEvents: { items: events }
      }
    } = response;

    dispatch({ type: "FETCH_EVENTS_SUCCESS", payload: events });
  } catch (error) {
    dispatch({ type: "FETCH_EVENTS_FAILURE" });
    console.log("error", error);
  }
};

export const fetchEvent = async (dispatch, id) => {
  try {
    dispatch({ type: "FETCH_EVENT_START" });
    const response = await fetchGQL(getEventQuery, { id });
    const {
      data: { getEvent: event }
    } = response;
    dispatch({ type: "FETCH_EVENT_SUCCESS", payload: { event } });
  } catch (error) {
    dispatch({ type: "FETCH_EVENT_FAILURE" });
    console.log("error", error);
  }
};

export const createEvent = async (dispatch, event, history) => {
  try {
    dispatch({ type: "CREATE_EVENT_START" });
    await fetchGQL(createEventQuery, event);
    dispatch({ type: "CREATE_EVENT_SUCCESS", payload: { event } });
    history.push("/");
  } catch (error) {
    dispatch({ type: "CREATE_EVENT_FAILURE" });
    console.log("error", error);
  }
};

export const deleteEvent = async (dispatch, id) => {
  try {
    dispatch({ type: "DELETE_EVENT_START" });
    await fetchGQL(deleteEventQuery, { id });
    dispatch({ type: "DELETE_EVENT_SUCCESS", payload: { id } });
  } catch (error) {
    dispatch({ type: "DELETE_EVENT_FAILURE" });
    console.log("error", error);
  }
};

export const createComment = async (dispatch, eventId, comment) => {
  try {
    dispatch({ type: "CREATE_COMMENT_START" });
    await fetchGQL(commentOnEventQuery, comment);
    dispatch({ type: "CREATE_COMMENT_SUCCESS", payload: { eventId, comment } });
    fetchEvent(dispatch, eventId);
  } catch (error) {
    dispatch({ type: "CREATE_COMMENT_FAILURE" });
    console.log("error", error);
  }
};

export const subscribeToComments = async (dispatch, eventId) => {
  try {
    dispatch({ type: "SUBSCRIBE_COMMENT_START" });
    const subscription = await fetchGQL(subscribeToEventCommentsQuery, {
      eventId
    });

    const {
      url,
      client: clientId,
      topics: [topic]
    } = subscription.extensions.subscription.mqttConnections[0];

    const client = mqtt.connect(
      url,
      { clientId }
    );
    client.subscribe(topic);

    client.on("message", function(topic, payload) {
      const {
        data: { subscribeToEventComments: comment }
      } = JSON.parse(payload.toString());
      dispatch({
        type: "SUBSCRIBE_COMMENT_SUCCESS",
        payload: { eventId, comment }
      });
    });
    return client;
  } catch (error) {
    dispatch({ type: "SUBSCRIBE_COMMENT_FAILURE" });
    console.log("error", error);
  }
};
