module.exports = {
  async rewrites() {
    return [
      { source: '/emails', destination: 'http://localhost:9000/emails' },
      { source: '/passwords', destination: 'http://localhost:9000/passwords' },
      { source: '/auth', destination: 'http://localhost:9000/auth' },
      { source: '/existsemail', destination: 'http://localhost:9000/existsemail' } // Dodane przekierowanie
    ];
  },
};
