import style from "./page.module.css";
import {BookData, ReviewData} from "@/types";
import {notFound} from "next/navigation";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";

// export const dynamicParams = false;

export function generateStaticParams() {
    return [{id: "1"}, {id: "2"}, {id: "3"}]
}

async function BookDetail({bookId}: { bookId: string; }) {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`);
    if (!resp.ok) {
        if (resp.status === 404) {
            notFound();
        }
        return <div>오류가 발생했습니다.</div>;
    }

    const bookData: BookData = await resp.json();
    const {title, subTitle, description, author, publisher, coverImgUrl} = bookData;

    return (
        <section>
            <div
                className={style.cover_img_container}
                style={{backgroundImage: `url('${coverImgUrl}')`}}
            >
                <img src={coverImgUrl}/>
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </section>
    );
}


async function ReviewList({bookId}: { bookId: string; }) {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
        {next: {tags: [`review-${bookId}`]}});


    if (!resp.ok) {
        throw new Error(`Review fetch failed : ${resp.statusText}`);
    }

    const review: ReviewData[] = await resp.json();

    return (
        <>
            <section>
                {review.map((review) => {
                    return <ReviewItem key={`review-item-${review.id}`} {...review} />;
                })}
            </section>
        </>
    );
}

export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ id: string }>;
}) {
    const {id} = await params;

    return (
        <>
            <div className={style.container}>
                <BookDetail bookId={id as string}/>
                <ReviewEditor bookId={id as string}/>
                <ReviewList bookId={id as string}/>
            </div>
        </>

    );
}
