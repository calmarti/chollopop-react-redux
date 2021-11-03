import React from 'react';

function useMutation(mutation) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const resetError = () => setError(null);

  const startExecution = () => {
    resetError();
    setIsLoading(true);
  };

  const finishExecution = error => {
    setIsLoading(false);
    if (error) {
      return setError(error);
    }
  };

  const execute = async function (...args) {
    startExecution();
    try {
      const result = await mutation(...args);
      finishExecution(null, result);
      return result;
    } catch (error) {
      finishExecution(error);
      throw error;
    }
  };

  return {
    isLoading,
    error,
    execute,
    resetError,
  };
}

export default useMutation;
