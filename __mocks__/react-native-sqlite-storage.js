const mockDB = {
  executeSql: jest.fn(() => Promise.resolve([{ rows: { length: 0, item: () => ({}) } }])),
  close: jest.fn(() => Promise.resolve()),
};

export default {
  openDatabase: jest.fn(() => Promise.resolve(mockDB)),
  enablePromise: jest.fn(),
};
