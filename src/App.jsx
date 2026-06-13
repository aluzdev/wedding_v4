import { LangProvider } from './i18n.jsx'
import { useReveal } from './useReveal.js'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Countdown from './sections/Countdown.jsx'
import Story from './sections/Story.jsx'

function Page() {
  useReveal()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Countdown />
        <Story />
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
