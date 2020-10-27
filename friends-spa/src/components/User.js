import React, { useState } from "react";
import _ from "lodash";
import { Pane, Button, Text, Heading, Avatar } from "evergreen-ui";

const URL = "http://localhost:8080/api";

const getName = (u) => `${u.first_name} ${u.last_name}`;

const FriendDisplay = ({ friend: f }) => (
  <>
    <Avatar margin={10} src={f.avatar} name={getName(f)} size={30} />
    <Heading margin={5} size={400}>
      {getName(f)}
    </Heading>
  </>
);

const getMutuals = (list) => {
  return _.uniq(_.flatten(_.map(list, (m) => m.friends)));
};

function User(props) {
  const { user } = props;

  const [friends, setFriends] = useState([]);
  const [showFriends, setShowFriends] = useState(false);

  const [mutuals, setMutuals] = useState([]);
  const [showMutuals, setShowMutuals] = useState(false);

  const fetchFriends = () => {
    setShowFriends(true);
    fetch(`${URL}/users/${user.id}/friends`)
      .then((results) => results.json())
      .then((data) => {
        setFriends(data.friends);
      });
  };

  const fetchMutuals = () => {
    setShowMutuals(true);
    fetch(`${URL}/users/${user.id}/mutuals`)
      .then((results) => results.json())
      .then((data) => {
        setMutuals(data.friends);
      });
  };

  return (
    <Pane margin={30}>
      <Pane
        height={120}
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="default"
      >
        <Pane flex={1} alignItems="center" display="flex">
          <Avatar
            margin={15}
            src={user.avatar}
            name={getName(user)}
            size={40}
          />
          <Heading margin={15} size={600}>
            {getName(user)}
          </Heading>
        </Pane>
        <Pane>
          <Button onClick={fetchFriends} marginRight={16} appearance="primary">
            Show Friends
          </Button>
          <Button onClick={fetchMutuals} appearance="primary" marginRight={16}>
            Show Friends of Friends
          </Button>
        </Pane>
      </Pane>
      {showFriends && (
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="default"
        >
          <Text>Friends:</Text>
          {_.map(friends, (f) => (
            <Pane key={f.id}>
              <FriendDisplay friend={f} />
            </Pane>
          ))}
        </Pane>
      )}
      {showMutuals && (
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="default"
        >
          <Text>Friends of Friends:</Text>
          {_.map(getMutuals(mutuals), (f) => (
            <Pane key={f.id}>
              <FriendDisplay friend={f} />
            </Pane>
          ))}
        </Pane>
      )}
    </Pane>
  );
}

export default User;
