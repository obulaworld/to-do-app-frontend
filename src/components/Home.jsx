import React from "react";
import { Message, Button, Container, Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../App.css";

const list = [
  "view the list the users.",
  "create the users.",
  "update the users.",
  "delete the users.",
  "select a single user and list its tasks",
  "update tasks..",
  "delete tasks.."
];

const Home = () => (
  <React.Fragment>
    <Container>
      <Message
        header="Welcome to the to-do micro service App. Here, you will be able to:"
        list={list}
      />
      <Form.Field
        fluid
        control={Button}
        content="Continue"
      />
    </Container>
  </React.Fragment>
);

export default Home;
