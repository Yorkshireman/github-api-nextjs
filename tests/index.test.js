import { fireEvent, render, wait } from '@testing-library/react';

import { githubApi } from '../services/githubApi';
import Index from '../pages/index';
import RemoteServiceError from '../errors/RemoteServiceError';
import { usersSearch } from './fixtures/users-search';
import { recentActivityData } from './fixtures/recent-activity';
import { userRepos } from './fixtures/user-repos';

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
      githubApi.searchForUser.mockReturnValue(usersSearch);
      githubApi.fetchRecentActivity.mockReturnValue(recentActivityData);
      githubApi.fetchUserRepos.mockReturnValue(userRepos);
      fireEvent.click(searchButton);
      await wait();
    });

    test('displays user\'s login', () => {
      expect(wrapper.getByText('Yorkshireman')).toBeVisible();
    });

    test('displays user\'s company', () => {
      expect(wrapper.getByText('@sky-uk')).toBeVisible();
    });

    test('displays user\'s name', () => {
      expect(wrapper.getByText('Andrew Stelmach')).toBeVisible();
    });

    describe('Public Repositories', () => {
      userRepos.slice(0, 2).forEach(repo => { // first 3 to shorten test run time
        test('displays name', () => {
          expect(wrapper.getByText(repo.name)).toBeVisible();
        });

        test('displays date when created', () => {
          const expectedDate = new Date(repo.created_at).toDateString();
          expect(wrapper.getByText(`created ${expectedDate}`)).toBeVisible();
        });

        test('displays date last updated', () => {
          const expectedDate = new Date(repo.updated_at).toDateString();
          expect(wrapper.getByText(`last updated ${expectedDate}`)).toBeVisible();
        });
      });
    });

    describe('when viewing Recent Activity', () => {
      beforeEach(async () => {
        const recentActivityTab = wrapper.getByText('Recent Activity');
        fireEvent.click(recentActivityTab);
      });

      describe('PullRequestEvent', () => {
        test('displays title and action', () => {
          expect(wrapper.getAllByText('Pull Request event: opened')).toHaveLength(3);
        });

        test('displays repo name', () => {
          expect(wrapper.getByText('repo: salomonelli/best-resume-ever')).toBeVisible();
        });

        test('displays date of event', () => {
          expect(wrapper.getByText('Fri Jan 10 2020')).toBeVisible();
        });
      });

      describe('PushEvent', () => {
        test('displays title', () => {
          expect(wrapper.getAllByText('Push event')).toHaveLength(13);
        });

        test('displays repo name', () => {
          expect(wrapper.getByText('repo: Yorkshireman/best-resume-ever-99')).toBeVisible();
        });

        test('displays date of push', () => {
          expect(wrapper.getByText('Thu Jan 09 2020')).toBeVisible();
        });
      });
    });
  });

  // app has not been expanded to handle all event types yet
  describe('when no usable recent activity is found', () => {
    let wrapper;
    beforeEach(async () => {
      wrapper = render(<Index />);
      const searchButton = wrapper.getByText('Search');
      githubApi.searchForUser.mockReturnValue(usersSearch);
      githubApi.fetchRecentActivity.mockReturnValue([
        {
          type: 'ForkEvent'
        },
        {
          type: 'CreateEvent'
        }
      ]);
      fireEvent.click(searchButton);
      await wait();
      const recentActivityTab = wrapper.getByText('Recent Activity');
      fireEvent.click(recentActivityTab);
    });

    test('No Recent Activity text is displayed', () => {
      expect(wrapper.getByText('No recent Pushes or Pull Request events')).toBeVisible();
    });
  });

  describe('when no user is found', () => {
    let wrapper;
    beforeEach(async () => {
      wrapper = render(<Index />);
      const searchButton = wrapper.getByText('Search');
      githubApi.searchForUser.mockImplementation(() => {
        throw new RemoteServiceError(404, 'User not found, please try again');
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
