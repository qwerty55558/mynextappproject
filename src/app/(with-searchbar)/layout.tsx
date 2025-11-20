import {ReactNode, Suspense} from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
        <Suspense fallback={<div>검색 바 로딩...</div>}>
            <Searchbar />
        </Suspense>
      {children}
    </div>
  );
}
