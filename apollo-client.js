import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  //2 tane seçenek var stepzen ile localde çalışan yada dışarıya açık olarak çalışan .
  // Burada dışarıya açık olanı kullanalım.
  uri: "https://liege.stepzen.net/api/iced-bison/__graphql",
  headers: {
    Authorization: `Apikey liege::stepzen.net+1000::dd6d238aaaf57b731c5ad36ea18dd289af2b5631a82cfbd0f294b6f1d98f704f`,
  },
  cache: new InMemoryCache(),
});

export default client;