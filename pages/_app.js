import '@/styles/globals.css'
import { FilenameProvider } from '../utils/userContext.js'

export default function App({ Component, pageProps }) {
  return (
    <FilenameProvider>
  <Component {...pageProps} />
    </FilenameProvider>
  )
}
