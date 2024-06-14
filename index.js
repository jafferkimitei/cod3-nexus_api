const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://cod3nexus.netlify.app/', 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// GitHub API Base URL
const GITHUB_API_URL = 'https://api.github.com';

// Route to get user stats
app.get('/api/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user statistics' });
  }
});

// Route to get user repositories
app.get('/api/user/:username/repos', async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching repositories' });
  }
});

// Route to create a repository
app.post('/api/repos', async (req, res) => {
  const { token, repoName, isPrivate, includeReadme } = req.body;
  try {
    const response = await axios.post(`${GITHUB_API_URL}/user/repos`, {
      name: repoName,
      private: isPrivate,
      auto_init: includeReadme
    }, {
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error creating repository' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
