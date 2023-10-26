import { Card, CardBody } from "react-bootstrap";
interface blogProps {
  title: string;
  author: string;
  body: string;
  id: string;
}
function BlogCard({ title, author, body, id }: blogProps) {
  return (
    <>
      <a style={{ textDecoration: "none" }} href={`/blog/${id}`}>
        <Card>
          <CardBody>
            <h3>{title}</h3>
            <h6>{author}</h6>
            <p>{body}</p>
          </CardBody>
        </Card>
      </a>
    </>
  );
}

export default BlogCard;
