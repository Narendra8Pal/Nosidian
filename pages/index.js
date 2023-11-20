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
      <Image src="/logo.svg" height={330} width={1199} alt="" />

      <div className={styles.head_btn}>
        <h1 className={styles.heading}>
          get things done faster with Nosidian.
        </h1>

        <Link href="/auth" className={styles.button}>
          <button className="flex items-center h-full m-auto">
            let&apos;s begin
          </button>
        </Link>
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
            <Image
              src="/GitHub.png"
              className="cursor-pointer h-7"
              width={28}
              height={28}
              alt=""
            />
          </Link>

          <Link href="https://twitter.com/Narendra8Pal">
            <Image
              width={28}
              height={28}
              src="/TwitterX.png"
              className="cursor-pointer h-7"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
