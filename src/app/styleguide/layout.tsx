import type { Metadata } from "next";

/**
 * The styleguide is the Phase 1 visual-regression reference (docs ROADMAP
 * Phase 1). It is a hidden dev route — not linked from navigation and kept out
 * of search indexes.
 */
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
