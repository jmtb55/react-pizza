import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen } from '@testing-library/react'
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from './../../testing/utils'

import Login from './login';

let mockServer = null;

function setupMockServer(responseForLogin) {
    const requests = [
        rest.post('http://localhost:2999/api/login', (req, res, ctx) => {
          return res(ctx.json(responseForLogin), ctx.delay(150))
        })
    ]
    const server = setupServer(...requests);
    return server;
}

describe('when not logged in already', () => {
    const userInputValue = 'jmtb55';
    const passwordInputValue = 'demo';

    it('should render component and controls', () => {
        const view = renderWithProviders(<Login/>);
        expect(view.getByPlaceholderText('user')).toBeTruthy();
        expect(view.getByPlaceholderText('password')).toBeTruthy();
        expect(view.getByText('Login')).toBeTruthy();
    })

    it('should handle failed login', async () => {
        // setup mock endpoint for calls
        if (mockServer && mockServer.close) {
            mockServer.close();
        }
        const error = 'Invalid user/password combination'
        mockServer = setupMockServer({error});
        mockServer.listen();

        const view = renderWithProviders(<Login/>);

        const userInput = view.getByPlaceholderText('user');
        const passwordInput = view.getByPlaceholderText('password');
        const loginForm = view.getByRole('login-form');
        fireEvent.change(userInput, {target: {value: userInputValue}});
        expect(userInput.value).toBe(userInputValue);
        fireEvent.change(passwordInput, {target: {value: passwordInputValue}});
        expect(passwordInput.value).toBe(passwordInputValue);

        jest.spyOn(window, 'alert').mockImplementation(() => {});

        fireEvent.submit(loginForm);
        await new Promise((r) => setTimeout(r, 1000));

        expect(window.alert).toHaveBeenCalledWith(error);
        mockServer.close();
    });
} );
