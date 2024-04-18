import CommentList from "@/components/CommentList";
import Image from "next/image";
async function getEvent(id) {
  let headersList = {
    Accept: "application/json",
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    Prefer: "return=representation",
  };
  let response = await fetch(
    "https://uwrwptibotlxlvcdeicv.supabase.co/rest/v1/erus?id=eq." + id,
    {
      headers: headersList,
    }
  );
  return await response.json();
}
async function getComments(id) {
  let headersList = {
    Accept: "application/json",
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
  let response = await fetch(
    "https://uwrwptibotlxlvcdeicv.supabase.co/rest/v1/erus_comments?event_id=eq." +
      id,
    {
      headers: headersList,
    }
  );
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
}
export default async function Event({ params: { id } }) {
  const data = await getEvent(id);
  const event = data[0];
  const comments = await getComments(id);
  console.log(comments);
  return (
    <>
      <h1>{event.name}</h1>
      <h2>{event.when}</h2>
      <p>{event.description}</p>
      <CommentList event_id={id} comments={comments} />
    </>
  );
}
