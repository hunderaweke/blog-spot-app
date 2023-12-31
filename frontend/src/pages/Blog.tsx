import { useParams } from "react-router";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
interface authorData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}
interface blogType {
  author: authorData;
  id: string;
  title: string;
  body: string;
  edited: boolean;
  updated: string;
  photo: string;
  created: string;
}
function Blog() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState<blogType>();
  useEffect(() => {
    axios
      .get<blogType>(`http://10.240.69.158:8000/api/blog/${id}`)
      .then((res) => {
        setBlogData(res.data);
      });
  }, [id]);
  return (
    <>
      <Container>
        <img src={blogData?.photo} alt="" className={`img-thumbnail h-25`} />
        <Container className="text-left">
          <h1>{blogData?.title}</h1>
          <p>{blogData?.body}</p>
        </Container>
      </Container>
    </>
  );
}

export default Blog;
