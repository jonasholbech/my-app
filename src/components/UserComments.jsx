"use client";
import { useState } from "react";
export default function UserComments({ event_id }) {
  const [userComments, setUserComments] = useState([]);
  async function submit(e) {
    e.preventDefault();
    let headersList = {
      Accept: "application/json",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Prefer: "return=representation",
      "Content-Type": "application/json",
    };

    const formData = new FormData(e.target);
    let bodyContent = JSON.stringify({
      comment: formData.get("comment"),
      event_id,
    });

    let response = await fetch(
      "https://uwrwptibotlxlvcdeicv.supabase.co/rest/v1/erus_comments",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();
    setUserComments((old) => [...old, ...data]);
  }
  return (
    <>
      {userComments.map((c) => (
        <p key={c.id}>{c.comment}</p>
      ))}
      <form onSubmit={submit}>
        <label>
          Kommentar
          <input type="text" name="comment" className="border-2 border-black" />
          <button>Send</button>
        </label>
      </form>
    </>
  );
}
