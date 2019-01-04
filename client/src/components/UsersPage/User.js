<<<<<<< HEAD:client/src/components/Users/User.js
import React from 'react';

class User extends React.Component {
  state = { showUser: false };

  handleShowUser = () => this.setState({ showUser: !this.state.showUser });

  render() {
    const { showUser } = this.state;
    const { user } = this.props;

    let userDetails;

    if (showUser) {
      userDetails = (
        <>
          <p>
            {user.email} - {user.accessType}
          </p>
          <button onClick={this.props.deleteUser}>Delete User</button>
        </>
      );
    }

    return (
      <div>
        <p onClick={this.handleShowUser}>
          {user.fullName} {user.UserList}
        </p>
        <div>{userDetails}</div>
      </div>
    );
  }
}

export default User;
=======
import React from 'react';
import Button from '../UI/Generic/Button'

class User extends React.Component {
  state = { showUser: false };

  handleShowUser = () => this.setState({ showUser: !this.state.showUser });

  render() {
    const { showUser } = this.state;
    const { user } = this.props;

    let userDetails;

    if (showUser) {
      userDetails = (
        <>
          <p>
            {user.email} - {user.accessType}
          </p>
          <Button delete name='Delete User' onClick={this.props.deleteUser}/>
        </>
      );
    }

    return (
      <div>
        <p onClick={this.handleShowUser}>
          {user.fullName} {user.UserList}
        </p>
        <div>{userDetails}</div>
      </div>
    );
  }
}

export default User;
>>>>>>> master:client/src/components/UsersPage/User.js
