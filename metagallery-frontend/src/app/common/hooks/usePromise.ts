import { useCallback, useEffect, useMemo, useState } from "react";
import { throttle } from "../../utils/fn.utils";

type Data<T> = {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
};

type PromiseFunction<T, Args extends any[]> = (...args: Args) => Promise<T>;
type Options = {
  enabled?: boolean;
};

const usePromise = <T, Args extends any[]>(
  promise: PromiseFunction<T, Args>,
  options?: Options,
  ...args: Args
) => {
  const [data, setData] = useState<Data<T>>({
    isLoading: false,
    error: null,
    data: null,
  });

  const callPromise = useCallback(async () => {
    if (typeof options === "object" && "enabled" in options && !options.enabled) {
      return;
    }
    console.log("callPromise", promise.name, ...args);
    setData({ isLoading: true, error: null, data: null });
    try {
      const data = await promise(...args);
      setData({ isLoading: false, error: null, data });
    } catch (error) {
      setData({ isLoading: false, error: error as Error, data: null });
      console.log(error);
    }
  }, [promise]);

  useEffect(throttle(callPromise, 10), [callPromise]);

  return useMemo(() => ({ ...data, recall: callPromise }), [data, callPromise]);
};

export default usePromise;
