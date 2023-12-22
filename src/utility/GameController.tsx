const handleGatherDataShards = () => {
  setGameState((prevGameState) => {
    const totalDataShards = prevGameState.dataShards + 1;
    const showAddProcessingCoreBtn = totalDataShards >= 10;
    return {
      ...prevGameState,
      dataShards: totalDataShards,
      showAddProcessingCoreBtn,
    };
  });
};

export { handleGatherDataShards };
