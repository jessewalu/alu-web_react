import React from 'react';
import { mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import fetchMock from 'fetch-mock';
import App from '../App/App';
import { rootReducer } from '../reducers/rootReducer';
import notificationsData from '../../dist/notifications.json';
import coursesData from '../../dist/courses.json';

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('<App /> wired to the Redux store', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    fetchMock.get('/login-success.json', { first_name: 'Johann' });
    fetchMock.get('/notifications.json', notificationsData);
    fetchMock.get('/courses.json', coursesData);
    store = createStore(rootReducer, applyMiddleware(thunk));
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
    fetchMock.restore();
  });

  it('displays and hides the notification drawer through the store', () => {
    expect(wrapper.find('#menuItem')).toHaveLength(1);
    wrapper.find('#menuItem').simulate('click');
    expect(store.getState().ui.get('isNotificationDrawerVisible')).toBe(true);
    wrapper.update();
    expect(wrapper.find('#Notifications')).toHaveLength(1);

    wrapper.find('#Notifications button').first().simulate('click');
    expect(store.getState().ui.get('isNotificationDrawerVisible')).toBe(false);
  });

  it('logs the user in and out through the store', async () => {
    expect(wrapper.find('#logoutSection')).toHaveLength(0);

    wrapper.find('input#email').simulate('change', {
      target: { name: 'email', value: 'jesse@example.com' },
    });
    wrapper.find('input#password').simulate('change', {
      target: { name: 'password', value: 'secret' },
    });
    wrapper.find('form').simulate('submit');
    await flush();
    wrapper.update();

    expect(store.getState().ui.get('isUserLoggedIn')).toBe(true);
    expect(wrapper.find('#logoutSection').text()).toContain('jesse@example.com');
    expect(wrapper.find('footer a')).toHaveLength(1);
    expect(wrapper.find('#CourseList')).toHaveLength(1);

    wrapper.find('#logoutSection button').simulate('click');
    wrapper.update();
    expect(store.getState().ui.get('isUserLoggedIn')).toBe(false);
    expect(store.getState().ui.get('user')).toBeNull();
    expect(wrapper.find('#logoutSection')).toHaveLength(0);
    expect(wrapper.find('footer a')).toHaveLength(0);
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('does not log the user in when the API fails', async () => {
    fetchMock.restore();
    fetchMock.get('/login-success.json', 500);

    wrapper.find('input#email').simulate('change', {
      target: { name: 'email', value: 'jesse@example.com' },
    });
    wrapper.find('input#password').simulate('change', {
      target: { name: 'password', value: 'secret' },
    });
    wrapper.find('form').simulate('submit');
    await flush();
    wrapper.update();

    expect(store.getState().ui.get('isUserLoggedIn')).toBe(false);
    expect(wrapper.find('#logoutSection')).toHaveLength(0);
    expect(wrapper.find('footer a')).toHaveLength(0);
  });

  it('fetches the notifications on mount and lists them in the drawer', async () => {
    await flush();
    wrapper.update();

    expect(store.getState().notifications.get('loading')).toBe(false);
    expect(store.getState().notifications.getIn(['notifications', 'messages']).size).toBe(14);

    wrapper.find('#menuItem').simulate('click');
    wrapper.update();
    // 4 of the 14 notifications of the API are already read
    expect(wrapper.find('#Notifications li')).toHaveLength(10);
  });

  it('removes a notification from the list when it is clicked', async () => {
    await flush();
    wrapper.find('#menuItem').simulate('click');
    wrapper.update();

    const firstText = wrapper.find('#Notifications li').first().text();
    wrapper.find('#Notifications li').first().simulate('click');
    wrapper.update();

    expect(wrapper.find('#Notifications li')).toHaveLength(9);
    expect(wrapper.find('#Notifications li').map((li) => li.text())).not.toContain(firstText);
  });

  it('lists the courses after login and selects / unselects a row', async () => {
    wrapper.find('input#email').simulate('change', {
      target: { name: 'email', value: 'jesse@example.com' },
    });
    wrapper.find('input#password').simulate('change', {
      target: { name: 'password', value: 'secret' },
    });
    wrapper.find('form').simulate('submit');
    await flush();
    await flush();
    wrapper.update();

    expect(wrapper.find('#CourseList input[type="checkbox"]')).toHaveLength(3);

    wrapper.find('#CourseList input[type="checkbox"]').at(1).simulate('change', {
      target: { checked: true },
    });
    wrapper.update();
    expect(store.getState().courses.getIn(['courses', '2', 'isSelected'])).toBe(true);
    expect(wrapper.find('#CourseList input[type="checkbox"]').at(1).prop('checked')).toBe(true);

    wrapper.find('#CourseList input[type="checkbox"]').at(1).simulate('change', {
      target: { checked: false },
    });
    wrapper.update();
    expect(store.getState().courses.getIn(['courses', '2', 'isSelected'])).toBe(false);
    expect(wrapper.find('#CourseList input[type="checkbox"]').at(1).prop('checked')).toBe(false);
  });

  it('filters the notifications with the two buttons', async () => {
    await flush();
    wrapper.find('#menuItem').simulate('click');
    wrapper.update();
    expect(wrapper.find('#Notifications li')).toHaveLength(10);

    wrapper.find('#buttonFilterUrgent').simulate('click');
    wrapper.update();
    // unread urgent notifications of the API
    expect(wrapper.find('#Notifications li')).toHaveLength(5);
    wrapper.find('#Notifications li').forEach((li) => {
      expect(li.prop('data-notification-type')).toBe('urgent');
    });

    wrapper.find('#buttonFilterDefault').simulate('click');
    wrapper.update();
    expect(wrapper.find('#Notifications li')).toHaveLength(10);
  });
});
