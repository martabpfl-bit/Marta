import type { Metadata } from "next";
import { UnderTheHoodView } from "@/components/UnderTheHoodView";

export const metadata: Metadata = { title: "Under the hood — Marta Lopes", robots: { index: false, follow: false } };

export default function UnderTheHood() {
  return <UnderTheHoodView />;
}
