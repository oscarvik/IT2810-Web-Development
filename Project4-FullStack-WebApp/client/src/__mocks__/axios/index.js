export default {
  get: jest.fn(() => Promise.resolve({ data: { movies: [] }})),
  post: jest.fn(() => Promise.resolve({ data: { token: "", user: {favorites: [], email: ""} } }))
};
