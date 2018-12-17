import React, { useState } from "react";
import { Link } from "react-router-dom";

import { graphql, compose, withApollo } from "react-apollo";
import QueryAllEvents from "../GraphQL/QueryAllEvents";
import MutationDeleteEvent from "../GraphQL/MutationDeleteEvent";
import Event from "./Event";

const handleSync = async (setBusy, client) => {
  const query = QueryAllEvents;

  setBusy(true);

  await client.query({
    query,
    fetchPolicy: "network-only"
  });

  setBusy(false);
};

function AllEvents({ events, deleteEvent, client }) {
  const [busy, setBusy] = useState(false);

  return (
    <div>
      <div className="ui clearing basic segment">
        <h1 className="ui header left floated">All Events</h1>
        <button
          className="ui icon left basic button"
          onClick={() => {
            handleSync(setBusy, client);
          }}
          disabled={busy}
        >
          <i
            aria-hidden="true"
            className={`refresh icon ${busy && "loading"}`}
          />
          Sync with Server
        </button>
      </div>
      <div className="ui link cards">
        <div className="card blue">
          <Link to="/newEvent" className="new-event content center aligned">
            <i className="icon add massive" />
            <p>Create new event</p>
          </Link>
        </div>
        {[]
          .concat(events)
          .sort((a, b) => a.when.localeCompare(b.when))
          .map(event => Event(event, deleteEvent))}
      </div>
    </div>
  );
}

export default withApollo(
  compose(
    graphql(QueryAllEvents, {
      options: {
        fetchPolicy: "cache-first"
      },
      props: ({ data: { listEvents = { items: [] } } }) => ({
        events: listEvents.items
      })
    }),
    graphql(MutationDeleteEvent, {
      options: {
        update: (proxy, { data: { deleteEvent } }) => {
          const query = QueryAllEvents;
          const data = proxy.readQuery({ query });

          data.listEvents.items = data.listEvents.items.filter(
            event => event.id !== deleteEvent.id
          );

          proxy.writeQuery({ query, data });
        }
      },
      props: props => ({
        deleteEvent: event => {
          return props.mutate({
            variables: { id: event.id },
            optimisticResponse: () => ({
              deleteEvent: {
                ...event,
                __typename: "Event",
                comments: { __typename: "CommentConnection", items: [] }
              }
            })
          });
        }
      })
    })
  )(AllEvents)
);
