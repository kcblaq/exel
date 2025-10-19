import { PageLayout } from '@/util/PageLayout'
import React from 'react'
// import ContactFormSubmit from './component/ContactFormSubmit'
import ContactForm from './component/ContactForm'

export default function page() {
  return (
    <section className={`${PageLayout}`}>
      <ContactForm />
      {/* <ContactFormSubmit /> */}
    </section>
  )
}
