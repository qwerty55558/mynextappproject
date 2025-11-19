import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import {BookData} from "@/types";

async function AllBooks() {

    const resp = await fetch(`https://onebite-books-server-ochre-nine.vercel.app/book`);
    const allBooks: BookData[] = await resp.json();

    return (
        <div>
            {allBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

function RecoBooks() {

}

export default function Home() {


    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>

            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                {AllBooks()}
            </section>
        </div>
    );
}
