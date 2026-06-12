import { LangProvider } from './i18n.jsx'
import { useReveal } from './useReveal.js'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'

function Page() {
  useReveal()
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  )
}
