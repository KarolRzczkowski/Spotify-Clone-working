
module.exports = {
    async rewrites() {
      return [
        { source: '/emails', destination: 'http://localhost:9000/emails' },
        { source: '/passwords', destination: 'http://localhost:9000/passwords' },
      ];
    },
  };
  