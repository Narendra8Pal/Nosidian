import '@/styles/globals.css'
import { UserProvider } from './product/userContext'

export default function App({ Component, pageProps }) {
  return (
<UserProvider>
  <Component {...pageProps} />
</UserProvider>

  )
}
