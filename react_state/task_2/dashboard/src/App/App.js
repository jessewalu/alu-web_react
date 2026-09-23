import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { AppContext, user, logOut } from './AppContext';

const styles = StyleSheet.create({
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    flex: 1,
    padding: '20px',
  },
});

const listCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

const listNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayDrawer: false,
      user,
      logOut,
    };

    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logIn(email, password) {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    });
  }

  logOut() {
    this.setState({ user });
  }

  handleDisplayDrawer() {
    this.setState({ displayDrawer: true });
  }

  handleHideDrawer() {
    this.setState({ displayDrawer: false });
  }

  render() {
    const { displayDrawer, user: stateUser } = this.state;

    return (
      <AppContext.Provider value={{ user: stateUser, logOut: this.logOut }}>
        <React.Fragment>
          <Notifications
            displayDrawer={displayDrawer}
            listNotifications={listNotifications}
            handleDisplayDrawer={this.handleDisplayDrawer}
            handleHideDrawer={this.handleHideDrawer}
          />
          <div className={css(styles.app)}>
            <Header />
            <div className={css(styles.body)}>
              {stateUser.isLoggedIn ? (
                <CourseList listCourses={listCourses} />
              ) : (
                <Login logIn={this.logIn} />
              )}
            </div>
            <Footer />
          </div>
        </React.Fragment>
      </AppContext.Provider>
    );
  }
}

export default App;
