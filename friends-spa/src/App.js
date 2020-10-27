import React from "react";
import _ from "lodash";
import User from "./components/User";
import { Heading } from "evergreen-ui";

function App() {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:8080/api/users/")
      .then((results) => results.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <div>
      <center>
        <Heading margin={30} size={900}>
          RESTFUL Friends
        </Heading>
        {_.map(users, (u) => (
          <User key={u.id} user={u} />
        ))}
      </center>
    </div>
  );
}

export default App;
