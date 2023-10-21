interface blogProps {
  author: string;
  body: string;
}
function Blog({ author, body }: blogProps) {
  return (
    <>
      <h1>{author}</h1>
      <p>{body}</p>
    </>
  );
}

export default Blog;
