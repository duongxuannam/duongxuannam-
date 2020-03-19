const getIsConnected = state => state.services.networkInfo.isConnected;

const NetworkInfoSelector = {
  getIsConnected,
};

export default NetworkInfoSelector;
