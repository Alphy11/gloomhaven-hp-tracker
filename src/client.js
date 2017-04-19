import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { uri, wsUri } from '../endpoint';

const networkInterface = createNetworkInterface({ uri });
const wsClient = new SubscriptionClient(wsUri);
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

export default new ApolloClient({ networkInterface: networkInterfaceWithSubscriptions });
