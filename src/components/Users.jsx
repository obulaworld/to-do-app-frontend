import React, { Component } from "react";
import {
  Dimmer,
  Loader,
  Image,
  Segment,
  Table,
  Message,
  Form,
  Button
} from "semantic-ui-react";

import UsersAPI from "../services/UsersAPI";
import history from "../history";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { users: {}, loading: true };
  }

  async componentDidMount() {
    try {
      const data = await UsersAPI.fetchAllUsers();
      this.setState({
        users: data.users,
        loading: false
      });
    } catch (error) {
      this.setState({
        users: [],
        loading: false
      });
    }
  }

  displayTable(users) {
    if (users.length > 0) {
      return (
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Registration Date</Table.HeaderCell>
              <Table.HeaderCell>E-mail address</Table.HeaderCell>
              <Table.HeaderCell>Premium Plan</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>John Lilki</Table.Cell>
              <Table.Cell>September 14, 2013</Table.Cell>
              <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
              <Table.Cell>No</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jamie Harington</Table.Cell>
              <Table.Cell>January 11, 2014</Table.Cell>
              <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
              <Table.Cell>Yes</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jill Lewis</Table.Cell>
              <Table.Cell>May 11, 2014</Table.Cell>
              <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
              <Table.Cell>Yes</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
    } else {
      return (
        <Message
          onDismiss={this.handleDismiss}
          header="Oops!"
          content="No user has been created yet."
        />
      );
    }
  }

  handleCreateUser() {
    history.push("/user/create");
  }

  render() {
    const { loading, users } = this.state;
    return loading ? (
      <Segment>
        <Dimmer active inverted>
          <Loader size="medium">Loading</Loader>
        </Dimmer>
        <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
      </Segment>
    ) : (
      <React.Fragment>
        <Form.Field
          fluid
          control={Button}
          content="Create User"
          onClick={this.handleCreateUser}
        />
        {this.displayTable(users)}
      </React.Fragment>
    );
  }
}
