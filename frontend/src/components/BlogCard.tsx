import { Card, CardBody } from "react-bootstrap";
interface blogProps {
  title: string;
  author: string;
  body: string;
}
function BlogCard({ title, author, body }: blogProps) {
  return (
    <>
      <Card>
        <CardBody>
          <h3>{title}</h3>
          <h6>{author}</h6>
          <p>{body}</p>
        </CardBody>
      </Card>
    </>
  );
}

export default BlogCard;
