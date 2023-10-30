import React, { ChangeEvent } from "react";
import { Container } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "../styles/newblog.module.css";
import axios from "axios";
import { useNavigate } from "react-router";

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

const NewBlog: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(BlogSchema) });

  const onSubmit = (data: FieldValues) => {
    try {
      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        axios
          .post("http://10.240.69.158:8000/api/auth/refresh/", {
            refresh: refreshToken,
          })
          .then((res) => {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("body", data.body);
            formData.append("photo", data.photo.file);
            const accessToken = res.data.access;
            const authorId = localStorage.getItem("public_id");
            if (authorId && accessToken) {
              const headers = {
                Authorization: `Bearer ${accessToken}`,
              };
              data.author = authorId;
              formData.append("author", authorId);
              axios.post("http://10.240.69.158:8000/api/blog/", formData, {
                headers,
              });
            }
          });
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
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
        <input type="text" className="w-75" id="title" {...register("title")} />
        {errors.title && <p>{errors.title.message}</p>}

        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          className={`w-75 h-50 ${styles.textArea}`}
          {...register("body")}
        ></textarea>
        {errors.body && <p>{errors.body.message}</p>}
        <label htmlFor="photo">Thumbnail</label>
        <input type="file" id="photo" onChange={handleImage} accept="image/*" />
        {errors.photo && <p>{errors.photo.message}</p>}
        <button type="submit" className={`btn btn-dark w-25`}>
          Post
        </button>
      </form>
    </Container>
  );
};

export default NewBlog;
