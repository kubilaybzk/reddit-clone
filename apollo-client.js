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
    Authorization: `Apikey ${process.env.NEXT_PUBLİC_STEPZEN_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default client;