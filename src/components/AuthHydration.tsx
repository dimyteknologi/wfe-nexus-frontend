"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/stores/root-reducer";
import { setUser, setAccessToken, logout } from "@/stores/slicers/auth/AuthSlice";

const AuthHydration = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      dispatch(
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          username: session.user.username,
          role: session.user.role,
          permissions: session.user.permissions,
          cityId: session.user.cityId,
          access_token: session.accessToken,
        })
      );
      dispatch(setAccessToken(session.accessToken));
    } else {
        dispatch(logout()); 
    }
  }, [session, status, dispatch]);

  return null;
};

export default AuthHydration;
