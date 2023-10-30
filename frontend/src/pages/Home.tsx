import Container from "react-bootstrap/esm/Container";
import BlogCard from "../components/BlogCard";
import { useEffect, useState } from "react";
import axios from "axios";
interface author {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
}
interface blog {
  id: string;
  title: string;
  body: string;
  author: author;
  created: string;
  edited: boolean;
  updated: string;
  photo: string;
}
const Home = () => {
  const [blogs, setBlogs] = useState<blog[]>();
  useEffect(() => {
    axios.get<blog[]>("http://10.240.69.158:8000/api/blog/").then((res) => {
      setBlogs(res.data);
    });
  }, []);
  return (
    <section className={`container`}>
      <Container fluid className={`d-flex gap-5 flex-wrap`}>
        {blogs?.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            photo={blog.photo}
            title={blog.title}
            authorId={blog.author.id}
            author={blog.author.first_name}
            body={blog.body}
          ></BlogCard>
        ))}
      </Container>
    </section>
  );
};

export default Home;
