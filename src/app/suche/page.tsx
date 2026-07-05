import { SearchView } from "@/features/search/SearchView";

export const metadata = { title: "Suche" };

export default function SuchePage() {
  return <SearchView title="Suche" autoFocus />;
}
