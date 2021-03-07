import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  // Callback function, function in parameters area only goes once first function is done.
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      // Add a .then statement bc "init" returns a Promise.
      window.gapi.client.init({
        clientId: '4961460059-o0a9b6rekbta2698rvm24ko9qqvfr1c3.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        // GoogleAuth.isSignedIn.listen(listener)
        // listener: A function that takes a boolean value. listen() passes true to this function when the user signs in, and false when the user signs out.
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }
  // make an arrow function bc it is being used as a callback function, so that it context is bound to the component.
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  // make arrow function bc it will used as a callback function
  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  // for onClick, do not include parantheses bc it will be ran as soon as component is rendered.. not what we want.
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui blue google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      )
    }
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(
  mapStateToProps, 
  { signIn, signOut }
  )(GoogleAuth);