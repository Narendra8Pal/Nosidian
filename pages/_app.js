import '@/styles/globals.css'
import { FilenameProvider } from './product/userContext'

export default function App({ Component, pageProps }) {
  return (
    <FilenameProvider>
  <Component {...pageProps} />
    </FilenameProvider>
  )
}
