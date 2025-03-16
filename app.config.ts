import 'dotenv/config'; // Optional: If you still want to use .env with this method

export default ({ config }: any) => {
  return {
    ...config,
    extra: {
      apiUrl: process.env.API_URL || 'https://api.example.com',
    },
  };
};