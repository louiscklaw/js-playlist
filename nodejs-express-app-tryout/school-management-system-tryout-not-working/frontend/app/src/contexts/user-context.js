import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { authApi } from '../__fake-api__/auth-api';
import { userApi } from 'src/api/user-api';

var ActionType;
(function (ActionType) {
  ActionType['INITIALIZE'] = 'INITIALIZE';
  ActionType['LOGIN'] = 'LOGIN';
  ActionType['LOGOUT'] = 'LOGOUT';
  ActionType['REGISTER'] = 'REGISTER';
  ActionType['UPDATE_BASIC_DETAILS'] = 'UPDATE_BASIC_DETAILS';
  ActionType['UPDATE_BASIC_DETAILS_DONE'] = 'UPDATE_BASIC_DETAILS_DONE';
})(ActionType || (ActionType = {}));

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  UPDATE_BASIC_DETAILS: (state, action) => {
    const { user } = action.payload;

    // console.log({ state, action });
    console.log('UPDATE_BASIC_DETAILS');

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  UPDATE_BASIC_DETAILS_DONE: (state, action) => {
    const { user } = action.payload;

    console.log('UPDATE_BASIC_DETAILS_DONE');
    // console.log({ state, action });

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const UserContext = createContext({
  ...initialState,
  platform: 'JWT',
  updateBasicDetails: () => Promise.resolve(),
  updateBasicDetailsDone: () => Promise.resolve(),
});

export const UserProvider = props => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
      } catch (err) {
        console.error(err);
      }
    };

    initialize();
  }, []);

  // NOTE: implementation of reducer
  const updateBasicDetails = async (user) => {

    await userApi.updateBasicDetail(user);

    dispatch({
      type: ActionType.UPDATE_BASIC_DETAILS,
      payload: { user, },
    });
  }

  const updateBasicDetailsDone = async (user) => {
    console.log('updateBasicDetailsDone');


    dispatch({
      type: ActionType.UPDATE_BASIC_DETAILS_DONE,
      payload: { user, },
    });
  }
  return (
    <UserContext.Provider value={{ ...state, updateBasicDetails, updateBasicDetailsDone }} >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const UserConsumer = UserContext.Consumer;
