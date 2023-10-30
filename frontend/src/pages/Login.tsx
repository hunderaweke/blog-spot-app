import { Container } from "react-bootstrap";
import * as z from "zod";
import styles from "../styles/login.module.css";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router";
const schema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid Email address" })
    .min(4, { message: "Must be atleast 4 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(4, { message: "Must be at least 8 characters" }),
});
type FormData = z.infer<typeof schema>;

function Login() {
  // const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();
  const onSubmit = (data: FieldValues) => {
    try {
      axios
        .post("http://10.240.69.158:8000/api/auth/login/", data)
        .then((res) => {
          navigate("/");
          localStorage.setItem("refresh", res.data.refresh);
          localStorage.setItem("public_id", res.data.user.id);
          localStorage.setItem("logged_in", "true");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container
        fluid
        className={`d-flex flex-column align-items-center justify-content-center ${styles.container}`}
      >
        <Container className="flex-item d-flex justify-content-center pb-3">
          <div
            className={`shadow-lg p-2 pb-3 card text-center w-auto flex-item`}
          >
            <form
              method="POST"
              className={`card-body`}
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3 className="py-2 fw-bolder ">Login</h3>
              <div
                className={`gap-2 d-flex align-items-start flex-column justify`}
              >
                <label htmlFor="email" className={`d-block`}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className={`d-block ${styles.input}`}
                  id=""
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
                <label htmlFor="email" className={`d-block`}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className={`d-block ${styles.input}`}
                  id=""
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
                <button type="submit" className={`btn my-3 btn-dark  w-100`}>
                  Login
                </button>
              </div>
            </form>
            <h6 className="mb-3">
              Don't an Have Account{" "}
              <span className="mx-2 ">
                <a href="/signup" className="link-dark">
                  Sign Up
                </a>
              </span>
            </h6>
          </div>
        </Container>
      </Container>
    </>
  );
}

export default Login;
