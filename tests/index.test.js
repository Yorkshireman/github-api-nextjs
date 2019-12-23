import { fireEvent, render, wait } from '@testing-library/react';

import { githubApi } from '../services/githubApi';
import Index from '../pages/index';
import UserNotFoundError from '../errors/UserNotFoundError';

jest.mock('../services/githubApi');

describe('index page', () => {
  test('input is rendered', () => {
    render(<Index />);
    const input = document.querySelector('#username');
    expect(input).toBeVisible();
  });

  test('User not found message is not displayed', () => {
    const { queryByText } = render(<Index />);
    expect(queryByText('User not found, please try again')).toBeNull();
  });

  describe('when user is searched for and found', () => {
    let wrapper;
    beforeEach(async () => {
      wrapper = render(<Index />);
      const searchButton = wrapper.getByText('Search');
      githubApi.searchForUser.mockReturnValue({
        company: 'Yorkshireman\'s company',
        login: 'Yorkshireman',
        name: 'Yorkshireman\'s name'
      });

      fireEvent.click(searchButton);
      await wait();
    });

    test('displays user\'s login', () => {
      const { getByText } = wrapper;
      expect(getByText('Yorkshireman')).toBeVisible();
    });

    test('displays user\'s company', () => {
      const { getByText } = wrapper;
      expect(getByText('Yorkshireman\'s company')).toBeVisible();
    });

    test('displays user\'s name', () => {
      const { getByText } = wrapper;
      expect(getByText('Yorkshireman\'s name')).toBeVisible();
    });
  });

  describe('when no user is found', () => {
    let wrapper;
    beforeEach(async () => {
      wrapper = render(<Index />);
      const searchButton = wrapper.getByText('Search');
      githubApi.searchForUser.mockImplementation(() => {
        throw new UserNotFoundError('User not found, please try again');
      });

      fireEvent.click(searchButton);
      await wait();
    });

    test('User not found message is displayed', () => {
      const { getByText } = render(<Index />);
      expect(getByText('User not found, please try again')).toBeVisible();
    });
  });
});
