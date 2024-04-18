import UserComments from "./UserComments";

export default function CommentList({ comments, event_id }) {
  console.log(comments);
  return (
    <section>
      <h2>Kommentarer</h2>
      {comments.map((c) => (
        <p key={c.id}>{c.comment}</p>
      ))}
      <UserComments event_id={event_id} />
    </section>
  );
}
