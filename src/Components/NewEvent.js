import React, { useState } from "react";
import { Link } from "react-router-dom";

import { v4 as uuid } from "uuid";
import { graphql } from "react-apollo";
import QueryAllEvents from "../GraphQL/QueryAllEvents";
import QueryGetEvent from "../GraphQL/QueryGetEvent";
import MutationCreateEvent from "../GraphQL/MutationCreateEvent";

import DatePicker from "react-datepicker";
import moment from "moment";

import { nearest15min } from "../Utils";
import DateTimePickerCustomInput from "./DateTimePickerCustomInput";

function NewEvent({ createEvent, history }) {
  const [event, setEvent] = useState({
    name: "",
    when: nearest15min().format(),
    where: "",
    description: ""
  });

  const handleChange = (field, { target: { value } }) => {
    event[field] = value;
    setEvent(event);
  };

  const handleDateChange = (field, value) => {
    handleChange(field, { target: { value: value.format() } });
  };

  const handleSave = async e => {
    e.stopPropagation();
    e.preventDefault();
    await createEvent({ ...event });
    history.push("/");
  };

  return (
    <div className="ui container raised very padded segment">
      <h1 className="ui header">Create an event</h1>
      <div className="ui form">
        <div className="field required eight wide">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={event.name}
            onChange={e => handleChange("name", e)}
          />
        </div>
        <div className="field required eight wide">
          <label htmlFor="when">When</label>
          <DatePicker
            className="ui container"
            customInput={<DateTimePickerCustomInput />}
            id="when"
            selected={moment(event.when)}
            onChange={value => handleDateChange("when", value)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            showTimeSelect
            timeFormat="hh:mm a"
            timeIntervals={15}
            dateFormat="LL LT"
          />
        </div>
        <div className="field required eight wide">
          <label htmlFor="where">Where</label>
          <input
            type="text"
            id="where"
            value={event.where}
            onChange={e => handleChange("where", e)}
          />
        </div>
        <div className="field required eight wide">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="10"
            value={event.description}
            onChange={e => handleChange("description", e)}
          />
        </div>
        <div className="ui buttons">
          <Link to="/" className="ui button">
            Cancel
          </Link>
          <div className="or" />
          <button className="ui positive button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default graphql(MutationCreateEvent, {
  props: props => ({
    createEvent: event => {
      return props.mutate({
        update: (proxy, { data: { createEvent } }) => {
          // Update QueryAllEvents
          const query = QueryAllEvents;
          const data = proxy.readQuery({ query });

          data.listEvents.items = [
            ...data.listEvents.items.filter(e => e.id !== createEvent.id),
            createEvent
          ];

          proxy.writeQuery({ query, data });

          // Create cache entry for QueryGetEvent
          const query2 = QueryGetEvent;
          const variables = { id: createEvent.id };
          const data2 = { getEvent: { ...createEvent } };

          proxy.writeQuery({ query: query2, variables, data: data2 });
        },
        variables: event,
        optimisticResponse: () => ({
          createEvent: {
            ...event,
            id: uuid(),
            __typename: "Event",
            comments: { __typename: "CommentConnection", items: [] }
          }
        })
      });
    }
  })
})(NewEvent);
