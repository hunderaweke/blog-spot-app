import { Card, CardBody } from "react-bootstrap";
import styles from "../styles/blogcard.module.css";
import { useNavigate } from "react-router";
import axios from "axios";
interface blogProps {
  title: string;
  author: string;
  body: string;
  id: string;
  photo: string;
  authorId: string;
}
function BlogCard({ title, author, body, id, photo, authorId }: blogProps) {
  let loggedIn = localStorage.getItem("logged_in");
  const userId = localStorage.getItem("public_id");
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };
  const handleDelete = () => {
    const refreshToken = localStorage.getItem("refresh");
    if (refreshToken) {
      axios
        .post("http://10.240.69.158:8000/api/auth/refresh/", {
          refresh: refreshToken,
        })
        .then((res) => {
          const accessToken = res.data.access;
          const authorId = localStorage.getItem("public_id");
          if (authorId && accessToken) {
            const headers = {
              Authorization: `Bearer ${accessToken}`,
            };
            axios
              .delete(`http://10.240.69.158:8000/api/blog/${id}/`, {
                headers,
              })
              .then(() => {
                window.location.reload();
              });
          }
        });
    }
  };
  loggedIn = loggedIn == "true";
  body.length > 400 ? (body = body.substring(0, 400) + "...") : body;
  return (
    <>
      <Card>
        <a style={{ textDecoration: "none" }} href={`/blog/${id}`}>
          <CardBody className={`${styles.cardContainer} text-black `}>
            <img src={photo} alt="" className={`img-thumbnail h-50`} />
            <h3>{title}</h3>
            <p className={`text-secondary`}>Author: {author}</p>
            <div>
              <p className={`${styles.cardBody}`}>{body}</p>
            </div>
          </CardBody>
        </a>
        {loggedIn && authorId == userId && (
          <div className="d-flex gap-3 p-3">
            <button
              className="btn btn-outline-warning"
              onClick={() => handleEdit()}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </button>
          </div>
        )}
      </Card>
    </>
  );
}

export default BlogCard;
