import { LangProvider } from './i18n.jsx'
import { GuestProvider } from './guest.jsx'
import { useReveal } from './useReveal.js'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Story from './sections/Story.jsx'
import Ceremony from './sections/Ceremony.jsx'
import Location from './sections/Location.jsx'
import Modals from './sections/Modals.jsx'
import Registry from './sections/Registry.jsx'
import Rsvp from './sections/Rsvp.jsx'
import Photos from './sections/Photos.jsx'
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
        <Location />
        <Modals />
        <Registry />
        <Rsvp />
        <Photos />
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
