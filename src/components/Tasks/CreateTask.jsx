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

export default class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      users: [],
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

  handleOnChange(value) {
    console.log(value);
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

  async handleCreateTask() {
    this.setState({
      loading: true
    });
    const { users,description, user_id, state, errors } = this.state;

    if(!description){
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
    console.log("user", user);
    try {
      let response = await UserTaskAPI.createTask({
        description,
        userId: user.id,
        state
      });
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
      console.log(error)
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
      users,
      success,
      successMessage,
      errorMessage
    } = this.state;
    const stateOptions = [
      { key: "to_do", text: "To Do", value: "to do" },
      { key: "completed", text: "Completed", value: "completed" }
    ];

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
            <Header as="h2">Create New Task</Header>
            <Header as="h3">Provide the task details to continue</Header>
          </Container>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="State"
            options={stateOptions}
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
            rows={10}
            column={8}
            error={errors.description}
            onChange={e => this.handleOnChange({ description: e.target.value })}
          />
        </Form.Group>
        <Form.Field
          fluid
          control={Button}
          content="Create task"
          onClick={() => this.handleCreateTask()}
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
