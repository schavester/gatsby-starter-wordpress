import React from 'react'
import Helmet from 'react-helmet'

import Navbar from './Navbar'
import Aside from './Aside'
import Footer from './Footer'
import './all.sass'
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
