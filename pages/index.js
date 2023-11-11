import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import Head from "next/head";
//styles
import styles from "@/styles/showcase.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* <Image
src="/logo.png"
width={400}
height={157}
/> */}

      <img src="/logo.png" />

      <div className={styles.head_btn}>
        <h1 className={styles.heading}>get things done faster with Nosidian</h1>
        <button className={styles.button}>let's begin</button>
      </div>

      <div className={styles.preview}>
        <div className={styles.preview_screen}></div>
        <Image
          src="/canvas-screen.png"
          alt="canvas"
          className={styles.screen_img1}
          width={1029}
          height={579}
        />
      </div>

      <h1 className={styles.desc}>
        get access to both block-editor and canvas at the same time
      </h1>

      {/* <img src="/Ellipse-white.png" className={styles.eclipse_white} /> */}

      <div className={styles.preview}>
        <div className={styles.preview_screen}></div>
        <Image
          src="/block-screen.png"
          alt="block-editor"
          className={styles.screen_img2}
          width={1029}
          height={579}
        />
      </div>
    </div>
  );
}
