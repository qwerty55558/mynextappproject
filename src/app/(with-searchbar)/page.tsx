import BookItem from "@/components/book-item";
import style from "./page.module.css";
import {BookData} from "@/types";
import {Suspense} from "react";
import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";


/**
 * auto = 자동
 * force-static = 스태틱 고정
 * force-dynamic = 다이나믹 고정
 * error = 스태틱 고정 + 스태틱으로 설정하면 구동이 안되는 요소가 있으면 빌드 에러가 생김
 */
// export const dynamic = "force-static";
export const dynamic = "force-dynamic";

async function AllBooks() {

    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
        {cache: "no-cache"});
    if (!resp.ok) {
        return <div>오류가 발생했습니다.</div>;
    }

    const allBooks: BookData[] = await resp.json();

    return (
        <div>
            {allBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

async function RecoBooks() {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`);
        // {next: {revalidate: 3}});
    // if (!resp.ok) {
    //     return <div>오류가 발생했습니다.</div>;
    // }

    const recoBooks: BookData[] = await resp.json();

    return (
        <div>
            {recoBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );

}

export default function Home() {


    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <Suspense fallback={
                    <>
                        <BookListSkeleton count={3}/>
                    </>
                }>
                    {RecoBooks()}
                </Suspense>
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <Suspense fallback={
                    <>
                        <BookListSkeleton count={10}/>
                    </>
                }>
                    {AllBooks()}
                </Suspense>
            </section>
        </div>
    );
}
