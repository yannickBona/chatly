import { useCallback, useEffect, useState } from "react";

/***
 * This is used to track the states of the various async requests
 * @param func is the function that contains the request
 * @param dependencies is the dependency array used in the useCallback hook to re-run the hook when the values inside itself change
 */
export function useAsync(
  func: (...options: unknown[]) => Promise<any>,
  dependencies = []
) {
  const { execute, ...state } = useAsyncInternal(func, dependencies, true);

  // Call immediately the function
  useEffect(() => {
    execute();
  }, [execute]);

  return state;
}
/***
 * This is used to track the states of the various async requests, this is ran immediatly whenever we call it
 * @param func is the function that contains the request, this is passed to the internal function
 * @param dependencies is the dependency array used in the useCallback hook, this is passed to the internal function
 */
export function useAsyncFn(func: () => Promise<any>, dependencies = []) {
  return useAsyncInternal(func, dependencies, false);
}

/***
 * This is used to call the func and track the states of the various async requests
 * @param func is the function that contains the request
 * @param dependencies is the dependency array used in the useCallback hook to re-run the hook when the values inside itself change
 * @param initialLoadingState is the initial value of the loading state during the request
 */
function useAsyncInternal(
  func: (...params: any[]) => Promise<any>,
  dependencies = [],
  initialLoadingState = false
) {
  const [loading, setLoading] = useState(initialLoadingState);
  const [error, setError] = useState<unknown | undefined>();
  const [value, setValue] = useState<any>();

  /**
   * This is the function used to automatically run the function and set the different states
   */
  const execute = useCallback((...params: unknown[]) => {
    setLoading(true);
    return func(...params)
      .then((data: unknown) => {
        setValue(data);
        setError(undefined);
        return data;
      })
      .catch((err: unknown) => {
        setValue(undefined);
        setError(err);
        return Promise.reject(err);
      })
      .finally(() => setLoading(false));
  }, dependencies);

  return { loading, error, value, execute };
}
