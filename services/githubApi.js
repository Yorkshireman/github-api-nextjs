import RemoteServiceError from '../errors/RemoteServiceError';
import UserNotFoundError from '../errors/UserNotFoundError';

const baseUrl = 'https://api.github.com';
const method = 'GET';
const headers = { 'Accept': 'application/vnd.github.v3+json' };

const githubApi = {
  searchForUser: async username => {
    const url = `${baseUrl}/users/${username}`;
    const response = await fetch(url, { headers, method});

    if (!response.ok) {
      if (response.status === 404) throw new UserNotFoundError('User not found, please try again');
      const message = await response.text();
      throw new RemoteServiceError(response.status, message);
    }

    return await response.json();
  }
};

export { githubApi };
