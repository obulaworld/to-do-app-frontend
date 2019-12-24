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
import history from "../../history";

export default class CreateUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loading: false,
      errors: {},
      success: false,
      failed: false,
      errorMessage: "",
      successMessage: ""
    };
  }

  handleOnChange(value) {
    if (!value.trim()) {
      this.setState({
        errors: {
          name: "Please enter a valid name"
        }
      });
    } else {
      this.setState({
        errors: {},
        name: value
      });
    }
  }

  viewUsers() {
    history.push("/users");
  }

  async handleCreateUser() {
    this.setState({
      loading: true
    });
    const { name } = this.state;
    try {
      if (name) {
        let response = await UsersAPI.createUser({ name });
        console.log("response", response);
        const { data } = response;

        if (data.success) {
          this.setState({
            success: true,
            successMessage: data.message,
            loading: false,
            failed: false
          });
        }
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
      success,
      successMessage,
      errorMessage
    } = this.state;
    return (
      <Form loading={loading}>
        <Form.Group widths="equal">
          <Container>
            <Header as="h2">Create New User</Header>
            <Header as="h3">Provide the user's name to continue</Header>
          </Container>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            fluid
            label="Name"
            placeholder="Name"
            id="form-input-control-error-first"
            control={Input}
            error={errors.name}
            onChange={e => this.handleOnChange(e.target.value)}
          />
        </Form.Group>
        <Form.Field
          fluid
          control={Button}
          content="Create"
          onClick={() => this.handleCreateUser()}
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
