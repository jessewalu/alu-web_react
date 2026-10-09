import { Map } from 'immutable';
import { rootReducer } from './rootReducer';
import { initialState as notificationInitialState } from './notificationReducer';
import { initialState as uiInitialState } from './uiReducer';

describe('rootReducer', () => {
  it('has the initial state { courses: Map {}, notifications: Map {}, ui: Map {} }', () => {
    const state = rootReducer(undefined, {});

    expect(Object.keys(state)).toEqual(['courses', 'notifications', 'ui']);
    expect(Map.isMap(state.courses)).toBe(true);
    expect(Map.isMap(state.notifications)).toBe(true);
    expect(Map.isMap(state.ui)).toBe(true);
    expect(state.courses.toJS()).toEqual({});
    expect(state.notifications).toBe(notificationInitialState);
    expect(state.ui).toBe(uiInitialState);
  });

  it('maps every slice to its own reducer', () => {
    const state = rootReducer(undefined, { type: 'DISPLAY_NOTIFICATION_DRAWER' });
    expect(state.ui.get('isNotificationDrawerVisible')).toBe(true);
    expect(state.notifications).toBe(notificationInitialState);
  });
});
