const baseUrl = 'https://api.github.com';
const method = 'GET';
const headers = { 'Accept': 'application/vnd.github.v3+json' };

const githubApi = {
  searchForUser: async username => {
    const url = `${baseUrl}/users/${username}`;
    const response = await fetch(url, { headers, method});
    return await response.json();
  }
};

export { githubApi };
