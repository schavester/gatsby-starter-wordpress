import React from 'react'
import Helmet from 'react-helmet'

import '../all.sass'
import Navbar from '../Navigation/NavBar/Navbar'
import Aside from '../Aside/Aside'
import Footer from '../Footers/PageFooter/Footer'
import styles from './Layout.module.css'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="1947 Project - Los Angeles De-Mythified" />
    <Navbar />
    <section className={styles.body}>
      <div className={styles.content}>{children}</div>
      <div className={styles.aside}>
        <Aside/>
      </div>
    </section>
    <Footer />
  </div>
)

export default TemplateWrapper
