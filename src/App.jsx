import { LangProvider } from './i18n.jsx'
import { useReveal } from './useReveal.js'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Countdown from './sections/Countdown.jsx'
import Story from './sections/Story.jsx'
import Ceremony from './sections/Ceremony.jsx'
import Dress from './sections/Dress.jsx'
import Rsvp from './sections/Rsvp.jsx'
import Registry from './sections/Registry.jsx'
import Hotels from './sections/Hotels.jsx'
import Footer from './sections/Footer.jsx'

function Page() {
  useReveal()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Story />
        <Countdown />
        <Ceremony />
        <Dress />
        <Rsvp />
        <Registry />
        <Hotels />
      </main>
      <Footer />
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
