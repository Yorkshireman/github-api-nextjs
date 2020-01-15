import RemoteServiceError from '../errors/RemoteServiceError';

const baseUrl = 'https://api.github.com';
const method = 'GET';
const headers = { 'Accept': 'application/vnd.github.v3+json' };

const githubApi = {
  fetchRecentActivity: async username => {
    const url = `${baseUrl}/users/${username}/events/public`;
    const response = await fetch(url, { headers, method });

    if (!response.ok) {
      const message = await response.text();
      throw new RemoteServiceError(response.status, message);
    }

    return await response.json();
  },
  fetchUserRepos: async username => {
    const url = `${baseUrl}/users/${username}/repos?sort=updated&visibility=public`;
    const response = await fetch(url, { headers, method });

    if (!response.ok) {
      const message = await response.text();
      throw new RemoteServiceError(response.status, message);
    }

    return await response.json();
  },
  searchForUser: async username => {
    const url = `${baseUrl}/users/${username}`;
    const response = await fetch(url, { headers, method});

    if (!response.ok) {
      const message = response.status === 404 ? 'User not found, please try again' : await response.text();
      throw new RemoteServiceError(response.status, message);
    }

    return await response.json();
  }
};

export { githubApi };
