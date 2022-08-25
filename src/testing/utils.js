/**
 * Following instructions from https://redux.js.org/usage/writing-tests on how to avoid mocking unnecesary stuff and make tests as close as possible to
 * an actual integration test.
 * 
 * For this we'll set up a store provider to wrap our components in tests
 */

import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from './../reducers';

export const UNAUTHENTICATED_STATE_FOR_TESTS = { 
    auth: {
        session: false,
        loading: false,
        error: false,
    },
    pizza: {
        loaded: false,
        loading: false,
        error: false,
    }
}

export const AUTHENTICATED_STATE_FOR_TESTS = { 
    auth: {
        session: {
            token: 'my token for tests',
            refreshToken: 'my refreshToken for tests',
        },
        loading: false,
        error: false,
    },
    pizza: {
        loaded: false,
        loading: false,
        error: false,
    }
}

export function setupStoreForTests(preloadedState = UNAUTHENTICATED_STATE_FOR_TESTS) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export function renderWithProviders(
  ui,
  {
    preloadedState = UNAUTHENTICATED_STATE_FOR_TESTS,
    store = setupStoreForTests(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}