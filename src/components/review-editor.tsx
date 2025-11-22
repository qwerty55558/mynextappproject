"use client";

import style from "./review-editor.module.css";
import {createReviewAction} from "@/actions/create-review.action";
import {useActionState, useEffect} from "react";

export default function ReviewEditor({bookId}: { bookId: string; }) {

    const [state, formAction, isPending] = useActionState(
        createReviewAction,
        null
    );

    useEffect(() => {
        if (state && !state.status) {
            alert(`리뷰 작성 실패: ${state.error}`);
        }
    }, [state]);

    return (
        <>
            <section>
                <form
                    className={style.form_container}
                    action={formAction}
                >
                    <input name={"bookId"} value={bookId} hidden readOnly/>
                    <textarea required disabled={isPending} name={"content"} placeholder={"리뷰 내용"}/>
                    <div className={style.submit_container}>
                        <input required disabled={isPending} name={"author"} placeholder={"작성자"}/>
                        <button disabled={isPending} type={"submit"}>{isPending ? "..." : "작성하기"}</button>
                    </div>
                </form>
            </section>
        </>
    );
}