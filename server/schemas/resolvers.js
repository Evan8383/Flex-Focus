const resolvers = {
  Query: {
    test: async () => {
      return {hello: 'Hello world!'};
    },
  }
}

module.exports = resolvers;