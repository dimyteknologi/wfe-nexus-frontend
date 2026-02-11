"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/stores/root-reducer";
import { setRegion } from "@/stores/slicers/siteSpecificInputSlicer";

interface RegionSetterProps {
  region: "KARAWANG" | "SIDOARJO";
}

export default function RegionSetter({ region }: RegionSetterProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (region) {
      dispatch(setRegion(region));
    }
  }, [region, dispatch]);

  return null;
}
