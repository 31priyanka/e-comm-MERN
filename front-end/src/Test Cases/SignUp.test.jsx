import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from '../components/SignUp';

describe('<SignUp />', () => {
  it('renders input fields and a button', () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <SignUp />
      </Router>
    );

    expect(getByPlaceholderText('Enter Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter Password')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    const { getByPlaceholderText } = render(
      <Router>
        <SignUp />
      </Router>
    );
    const nameInput = getByPlaceholderText('Enter Name');
    const emailInput = getByPlaceholderText('Enter Email');
    const passwordInput = getByPlaceholderText('Enter Password');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('calls collectData function on button click', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ name: 'John Doe', email: 'john@example.com', password: 'password123' })
      })
    );
    global.fetch = mockFetch;
    
    const { getByText, getByPlaceholderText } = render(
      <Router>
        <SignUp />
      </Router>
    );
    const nameInput = getByPlaceholderText('Enter Name');
    const emailInput = getByPlaceholderText('Enter Email');
    const passwordInput = getByPlaceholderText('Enter Password');
    const signUpButton = getByText('Sign Up');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9009/register', {
        method: 'post',
        body: JSON.stringify({ name: 'John Doe', email: 'john@example.com', password: 'password123' }),
        headers: { 'Content-Type': 'application/json' }
      });
    });

    // Optionally, you can also test if localStorage was set
    await waitFor(() => {
      const user = localStorage.getItem('user');
      expect(user).toBe(JSON.stringify({ name: 'John Doe', email: 'john@example.com', password: 'password123' }));
    });
  });
});
