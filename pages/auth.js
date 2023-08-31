// NEXT, REACT
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
//styles, files
import styles from "@/styles/auth.module.css";
// import { useUser } from "./product/userContext.js";

// libraries
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import cookies from "js-cookie";

const auth = () => {
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // const { updateUser } = useUser();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const verificationToken = uuidv4();
    const requestBody = {
      name: name,
      email: email,
      password: password,
      verificationToken: verificationToken,
    };
    const response = await fetch("/api/mongodb/controllers/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data); // Handle successful response
      inputEmpty();
      toast("Verification link has been sent to your email");
    } else {
      const error = await response.json();
      inputEmpty();
      console.error(error, "this error in client signup"); // Handle error response
      toast("Ooops! Email already exists");
    }
  };

  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/mongodb/controllers/auth", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data, "data from login in try catch");

      setEmail("");
      setPassword("");

      if (response.ok) {
        cookies.set("token", data.token, {
          expires: 7,
          path: "/",
          domain: "localhost:3000",
          secure: process.env.NODE_ENV === "production" ? true : false,
        });
        // updateUser(data.userId);
        // console.log(data.userId);
        router.push("/product/home");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error, "this error in client login");
    }
  };

  const inputEmpty = () => {
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <Head>
        <title>Auth</title>
        <link rel="icon" href="" alt="motion-v2 logo" />
      </Head>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />

      <div className={styles.container}>
        <div className={styles.blur}></div>
        <form className={styles.form} onSubmit={(e) => e.preventDefault}>
          <h1 className={styles.heading}>{login ? "Log In" : "Sign Up"}</h1>
          <hr className={styles.divider} />
          {!login && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="narendrapal"
              required
              className={styles.input}
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            required
            className={styles.input}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
            className={styles.input}
          />

          <button onClick={login ? handleLogin : handleSignUp}>
            {login ? "Log In" : "Sign Up"}
          </button>

          <p>
            {login ? "create a account?" : "already have an account?"}{" "}
            <span onClick={() => setLogin(!login)}>
              {login ? "SignUp" : "LogIn"}{" "}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default auth;
