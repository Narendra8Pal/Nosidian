import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import Head from "next/head";
//styles
import styles from "@/styles/showcase.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <img src="/logo2.png" />

      <div className={styles.head_btn}>
        <h1 className={styles.heading}>
          get things done faster with Nosidian.
        </h1>

        <button className={styles.button}>
          <Link href="/auth">let's begin </Link>
        </button>
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
        get access to both, block-editor and canvas at the same time
      </h1>

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

      <div className={styles.footer}>
        <div className="flex space-x-2 h-7">
          <Link href="https://github.com/Narendra8Pal">
            <img src="/GitHub.png" className="cursor-pointer h-7" />
          </Link>

          <Link href="https://twitter.com/Narendra8Pal">
            <img src="/TwitterX.png" className="cursor-pointer h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}
