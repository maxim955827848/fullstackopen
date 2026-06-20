const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

app.get('/health', (req, res) => {
  res.send('ok');
});

app.get('/version', (req, res) => {
  res.send('1.0.0 (CI/CD deployment)');
});

app.use(express.static('dist'));

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
