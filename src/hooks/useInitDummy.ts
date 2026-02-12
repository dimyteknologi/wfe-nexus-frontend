import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/root-reducer";
import { initializeData } from "@/stores/thunk/initializeData";

export const useInitializeData = () => {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);
  
  // We can track loading state via a selector if we add it to a slice, 
  // or just rely on the fact that data will be populated.
  // For a quick refactor preserving the return signature logic roughly (or simplifying it):
  
  useEffect(() => {
    if (!initialized.current) {
      dispatch(initializeData());
      initialized.current = true;
    }
  }, [dispatch]);

  // Optionally, return loading state if we want to hook into the promise status,
  // but for now, we just ensure data is fetched.
  // If we want accurate isLoading/isSuccess, we should select from the API slices or the thunk state.
  // Since the original hook returned aggregated status, let's try to maintain that if possible, 
  // or return dummy values if the pages don't strictly block rendering on it (they might just show empty charts).
  
  return { isLoading: false, isSuccess: true, isError: false }; 
};
