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

import UsersTaskAPI from "../../services/UserTasksAPI";
import history from "../../history";

export default class UserTasks extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [], loading: true, deleteLoading: {} };
  }

  async componentDidMount() {
    const { userId } = this.props.match.params;
    try {
      const data = await UsersTaskAPI.fetchAllUserTasks(userId);
      console.log(data);
      this.setState({
        tasks: data.data.tasks,
        loading: false
      });
    } catch (error) {
      this.setState({
        tasks: [],
        loading: false
      });
    }
  }

  async handleEditTask(id, taskId) {
    history.push(`/task/edit/${id}/${taskId}`);
  }
  async handleDeleteTask(id) {
    this.setState({
      deleteLoading: {
        id
      },
      loading: false
    });
    const { tasks } = this.state;
    try {
      const data = await UsersTaskAPI.deleteTask(id);
      const newTasks= tasks.filter(task => {
        return task.id !== id;
      });
      this.setState({
        tasks: newTasks,
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

  displayTable(tasks) {
    const { deleteLoading } = this.state;
    if (tasks.length > 0) {
      return (
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>State</Table.HeaderCell>
              <Table.HeaderCell>Created</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tasks.map(task => (
              <Table.Row>
                <Table.Cell>{task.description}</Table.Cell>
                <Table.Cell>{task.state}</Table.Cell>
                <Table.Cell>{task.createdAt}</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    fluid
                    control={Button}
                    content="Edit"
                    onClick={() => this.handleEditTask(task.user_id, task.id)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    fluid
                    color="red"
                    loading={deleteLoading.id == task.id}
                    control={Button}
                    content="Delete"
                    onClick={() => this.handleDeleteTask(task.id)}
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
          content="No task has been created yet."
        />
      );
    }
  }

  handleCreateTask() {
    history.push("/task/create");
  }

  render() {
    const { loading, tasks } = this.state;
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
          content="Create Task"
          onClick={this.handleCreateTask}
        />
        {this.displayTable(tasks)}
      </React.Fragment>
    );
  }
}
