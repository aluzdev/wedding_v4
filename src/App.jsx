import { LangProvider } from './i18n.jsx'
import { GuestProvider } from './guest.jsx'
import { useReveal } from './useReveal.js'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Story from './sections/Story.jsx'
import Ceremony from './sections/Ceremony.jsx'
import Modals from './sections/Modals.jsx'
import Registry from './sections/Registry.jsx'
import Rsvp from './sections/Rsvp.jsx'
import Footer from './sections/Footer.jsx'

function Page() {
  useReveal()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Story />
        <Ceremony />
        <Modals />
        <Registry />
        <Rsvp />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <GuestProvider>
        <Page />
      </GuestProvider>
    </LangProvider>
  )
}
