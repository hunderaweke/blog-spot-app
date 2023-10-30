import { Container } from "react-bootstrap";
import * as z from "zod";
import styles from "../styles/signup.module.css";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
const schema = z
  .object({
    first_name: z.string({ required_error: "First name is required" }),
    last_name: z.string(),
    username: z.string({ required_error: "Username is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid Email address" })
      .min(4, { message: "Must be atleast 4 characters" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Must be at least 8 characters" }),
    confirm_password: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password's don't match",
    path: ["confirm_password"],
  });
type FormData = z.infer<typeof schema>;

function SignUp() {
  // const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => {
    try {
      axios
        .post("http://10.240.69.158:8000/api/auth/register/", data)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("refresh", res.data.refresh);
          localStorage.setItem("public_id", res.data.user.id);
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
            className={`shadow-lg pb-3 p-3 card text-center w-auto flex-item`}
          >
            <form
              method="POST"
              className={`card-body`}
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3 className="py-2 fw-bolder ">Sign Up</h3>
              <div
                className={`gap-2 d-flex align-items-start flex-column justify`}
              >
                <div
                  className={`d-flex flex-column flex-lg-row gap-3 text-start `}
                >
                  <div className="d-flex flex-column">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      {...register("first_name")}
                      className={`${styles.inputName}`}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      {...register("last_name")}
                      className={`${styles.inputName} w-100`}
                    />
                  </div>
                </div>
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
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className={`d-block ${styles.input}`}
                  id=""
                  {...register("username")}
                />
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
                <label htmlFor="email" className={`d-block`}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`d-block ${styles.input}`}
                  id=""
                  {...register("confirm_password")}
                />
                {errors.confirm_password?.message && (
                  <p className="text-danger">
                    {errors.confirm_password?.message}
                  </p>
                )}
                <button type="submit" className={`btn my-3 btn-dark  w-100`}>
                  Sign Up
                </button>
              </div>
            </form>
            <h6 className="mb-3">
              Already have an Account{" "}
              <span className="mx-2 ">
                <a href="/login" className="link-dark">
                  Login
                </a>
              </span>
            </h6>
          </div>
        </Container>
      </Container>
    </>
  );
}

export default SignUp;
