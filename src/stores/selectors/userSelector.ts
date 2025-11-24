import { IRootState } from "..";


export const selectCurrentUser = (state: IRootState) => state.user.currentUser;
