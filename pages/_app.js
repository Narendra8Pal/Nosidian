import '@/styles/globals.css'
import { FilenameProvider } from './userContext'

export default function App({ Component, pageProps }) {
  return (
    <FilenameProvider>
  <Component {...pageProps} />
    </FilenameProvider>
  )
}
