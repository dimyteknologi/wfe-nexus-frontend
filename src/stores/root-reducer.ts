import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { store } from "@/stores/index";

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
