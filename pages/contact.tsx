import React, { Component } from 'react';
import { sleep } from '~utils/utils';
import { Button } from '../src/components/ui/Button';

export default class Contact extends Component {
  state = {
    email: '',
    password: '',
    saved: false,
  };

  onChange = (e: any) => this.setState({ [e.target.name]: e.target.value });

  saveForm = async (e: any) => {
    e.preventDefault();
    await sleep(2000);
    this.setState({ saved: true });
  };

  render() {
    const { saved, email, password } = this.state;
    return (
      <div>
        {saved && <p className="saved">Saved Email: {email}</p>}
        <form>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={this.onChange}
            value={email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={this.onChange}
            value={password}
          />
          <Button id="saveForm" onClick={this.saveForm}>
            Save
          </Button>
        </form>
      </div>
    );
  }
}
