import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Container } from "react-bootstrap";
import styles from "../styles/newblog.module.css";

const BlogSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  body: z.string({ required_error: "Body is required" }),
  photo: z
    .object({
      file: z.instanceof(File).nullable(),
    })
    .nullable(),
});

type FormData = z.infer<typeof BlogSchema>;

const EditBlog: React.FC = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [blogData, setBlogData] = useState(null);
  const [blogBody, setBlogBody] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://10.240.69.158:8000/api/blog/${id}`).then((res) => {
      setBlogData(res.data);
      setBlogBody(res.data?.body);
      setTitle(res.data?.title);
    });
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(BlogSchema) });

  const onSubmit = (data: FormData) => {
    try {
      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        axios
          .post("http://10.240.69.158:8000/api/auth/refresh/", {
            refresh: refreshToken,
          })
          .then((res) => {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("body", blogBody);
            formData.append("photo", data.photo?.file || "");
            const accessToken = res.data.access;
            const authorId = localStorage.getItem("public_id");
            if (authorId && accessToken) {
              const headers = {
                Authorization: `Bearer ${accessToken}`,
              };
              data.author = authorId;
              formData.append("author", authorId);
              axios.put(`http://10.240.69.158:8000/api/blog/${id}/`, formData, {
                headers,
              });
              navigate(`/blog/${id}`);
            }
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      register("photo.file", { value: selectedFile });
    }
  };

  return (
    <Container>
      <form
        method="post"
        className={`d-flex flex-column gap-2 mx-lg-5 px-5 ${styles.form}`}
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          className="w-75"
          id="title"
          {...register("title")}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {errors.title && <p className="text-danger">{errors.title.message}</p>}

        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          value={blogBody}
          className={`w-75 h-50 ${styles.textArea}`}
          {...register("body")}
          onChange={(e) => {
            setBlogBody(e.target.value);
          }}
        ></textarea>
        {errors.body && <p className="text-danger">{errors.body.message}</p>}

        <label htmlFor="photo">Thumbnail</label>
        <input type="file" id="photo" onChange={handleImage} accept="image/*" />
        {errors.photo && <p className="text-danger">{errors.photo.message}</p>}
        <button type="submit" className={`btn btn-dark w-25`}>
          Update
        </button>
      </form>
    </Container>
  );
};

export default EditBlog;
