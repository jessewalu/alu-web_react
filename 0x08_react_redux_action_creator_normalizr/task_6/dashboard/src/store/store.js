import { createStore } from 'redux';

// Placeholder root reducer: the reducers are built in the next project.
// It only exists so the store can receive (and hand back) dispatched actions.
const rootReducer = (state = {}) => state;

const store = createStore(rootReducer);

export default store;
