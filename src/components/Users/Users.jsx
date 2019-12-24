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

import UsersAPI from "../../services/UsersAPI";
import history from "../../history";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], loading: true, deleteLoading: {} };
  }

  async componentDidMount() {
    try {
      const data = await UsersAPI.fetchAllUsers();
      this.setState({
        users: data.data.users,
        loading: false
      });
    } catch (error) {
      this.setState({
        users: [],
        loading: false
      });
    }
  }

  handleEditUser(id, name) {
    history.push(`/user/edit/${id}/${name}`);
  }

  async handleViewTasks(id) {
    history.push(`/tasks/${id}`);
  }

  async handleDeleteUser(id) {
    this.setState({
      deleteLoading: {
        id
      },
      loading: false
    });
    const { users } = this.state;
    try {
      const data = await UsersAPI.deleteUser(id);
      const newUsers = users.filter(user => {
        return user.id !== id;
      });
      this.setState({
        users: newUsers,
        deleteLoading: {},
        loading: false
      });
    } catch (error) {
      this.setState({
        users: [],
        deleteLoading: {},
        loading: false
      });
    }
  }

  displayTable(users) {
    const { deleteLoading } = this.state;
    if (users.length > 0) {
      return (
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Created At</Table.HeaderCell>
              <Table.HeaderCell>View Tasks</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map(user => (
              <Table.Row>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.createdAt}</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    fluid
                    control={Button}
                    content="View"
                    onClick={() => this.handleViewTasks(user.id)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    fluid
                    control={Button}
                    content="Edit"
                    onClick={() => this.handleEditUser(user.id, user.name)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    fluid
                    color="red"
                    loading={deleteLoading.id == user.id}
                    control={Button}
                    content="Delete"
                    onClick={() => this.handleDeleteUser(user.id)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
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
