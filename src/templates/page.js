import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import AuthorFooter from '../components/AuthorFooter'

export const PageTemplate = ({ title, content }) => (
  <section className="section section--gradient">
    <div className="container">
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <div className="section">
            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
              {title}
            </h2>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
)

export const AuthorTemplate = ({title, content, slug}) => (
  <section className="section section--gradient">
    <div className="container">
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <div className="section">
            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
              {title}
            </h2>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <AuthorFooter slug={slug}/>
          </div>
        </div>
      </div>
    </div>
  </section>
)


PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
}

const authorPageSlugs = ["kimcooper", "nathanmarsak", "larryharnish", "joanrenner", "marymccoy", "lynn-peril"]

const Page = ({ data }) => {
  const { wordpressPage: page } = data

  if (authorPageSlugs.includes(page.slug)) {
    return (
      <Layout>
        <AuthorTemplate title={page.title} content={page.content} slug={page.slug}/>
      </Layout>
    )
  }

  return (
    <Layout>
      <PageTemplate title={page.title} content={page.content} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query PageById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      slug
      title
      content
    }
  }
`
