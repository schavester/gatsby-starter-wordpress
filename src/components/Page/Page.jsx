import React from 'react'
import AuthorFooter from '../Footers/AuthorFooter/AuthorFooter'
import styles from './Page.module.css'

const PageTemplate = ({ title, content, slug }) => (
  <section className="section section--gradient">
    <div className="container">
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <div className={styles.section}>
            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
              {title}
            </h2>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            { slug && <AuthorFooter slug={slug}/> }
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default PageTemplate
