import React, { Component } from "react";
import {
  Header,
  Form,
  Container,
  Input,
  Button,
  Message
} from "semantic-ui-react";

import UsersAPI from "../../services/UsersAPI";
import UserTaskAPI from "../../services/UserTasksAPI";
import history from "../../history";

const stateOptions = [
  { key: "to_do", text: "To Do", value: "to do" },
  { key: "completed", text: "Completed", value: "completed" }
];

export default class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      users: [],
      task: [],
      defaultState: {},
      defaultUser: {},
      user_id: "",
      state: "",
      loading: false,
      errors: {},
      success: false,
      failed: false,
      errorMessage: "",
      successMessage: ""
    };
  }

  async componentDidMount() {
    const { userId, taskId } = this.props.match.params;
    try {
      const data = await UserTaskAPI.fetchAllUserTasks(userId);
      const task = data.data.tasks.find((task) => task.id = taskId);
       let currentState = task.state
         ? stateOptions.find(state => task.state == state.text)
         : "";
      const users = await UsersAPI.fetchAllUsers();
      const currentUser = users.data.users.find((user) => user.id == task.user_id);
      this.setState({
        task,
        description: task.description,
        state: task.state,
        user_id: currentUser.name,
        users: users.data.users,
        loading: false,
        defaultState: currentState.value,
        defaultUser: currentUser.id
      });
    } catch (error) {
      this.setState({
        users: [],
        loading: false
      });
    }
  }

  handleOnChange(value) {
    console.log(value)
    const values = Object.values(value);
    const keys = Object.keys(value);
    const { errors } = this.state;

    if (keys[0] === "description" && !values[0].trim()) {
      errors[keys[0]] = `Please enter a valid ${keys[0]}`;
      this.setState({
        errors
      });
    } else {
      errors[keys[0]] = false;
      this.setState({
        errors,
        ...value
      });
    }
  }

  viewUsers() {
    history.push("/users");
  }

  async handleUpdateTask() {
    this.setState({
      loading: true
    });
    const { users, description, user_id, state, errors, task } = this.state;

    if (!description) {
      errors.description = `Please enter a valid description}`;
      this.setState({
        errors,
        loading: false
      });
      return;
    }

    if (!state) {
      errors.state = `Please enter a valid state}`;
      this.setState({
        errors,
        loading: false
      });
      return;
    }

    if (!user_id) {
      errors.user_id = `Please enter a valid User}`;
      this.setState({
        errors,
        loading: false
      });
      return;
    }
    const user = users.find(userValue => userValue.name === user_id);

    try {
      let response = await UserTaskAPI.updateTask(
        {
          description,
          userId: user.id,
          state
        },
        task.id
      );
      const { data } = response;
      if (data.success) {
        this.setState({
          success: true,
          successMessage: data.message,
          loading: false,
          failed: false
        });
      }
    } catch (error) {
      const { error: errorMessage } = error.response.data;
      this.setState({
        failed: true,
        errorMessage: errorMessage,
        success: false,
        loading: false
      });
    }
  }

  render() {
    const {
      loading,
      errors,
      failed,
      task,
      defaultState,
      defaultUser,
      users,
      success,
      successMessage,
      errorMessage
    } = this.state;
    console.log(task);
    const userOptions = users.map(user => {
      return {
        key: user.id,
        text: user.name,
        value: user.id
      };
    });
    return (
      <Form loading={loading}>
        <Form.Group widths="equal">
          <Container>
            <Header as="h2">Update Task</Header>
            <Header as="h3">Provide the task details to continue</Header>
          </Container>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="State"
            options={stateOptions}
            value={defaultState}
            error={errors.state}
            placeholder="State"
            onChange={e => this.handleOnChange({ state: e.target.textContent })}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="User"
            error={errors.user_id}
            value={defaultUser}
            options={userOptions}
            placeholder="User"
            onChange={e =>
              this.handleOnChange({ user_id: e.target.textContent })
            }
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            fluid
            label="Description"
            placeholder="Description"
            control="textarea"
            defaultValue={task.description}
            rows={10}
            column={8}
            error={errors.description}
            onChange={e => this.handleOnChange({ description: e.target.value })}
          />
        </Form.Group>
        <Form.Field
          fluid
          control={Button}
          content="Save task"
          onClick={() => this.handleUpdateTask()}
        />
        <Form.Field
          fluid
          control={Button}
          content="View Users"
          onClick={() => this.viewUsers()}
        />
        {success || failed ? (
          <Message
            success={success}
            error={failed}
            header={success ? " Success" : "Error"}
            content={success ? successMessage : errorMessage}
          />
        ) : (
          ""
        )}
      </Form>
    );
  }
}
