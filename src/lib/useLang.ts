"use client";
import { useSyncExternalStore } from "react";
import { getLang, subscribeLang, type Lang } from "./lang";

export function useLang(): Lang {
  return useSyncExternalStore(subscribeLang, getLang, () => "en" as Lang);
}
