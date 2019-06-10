import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout/Layout'
import PageTemplate from '../components/Page/Page'

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
        <PageTemplate title={page.title} content={page.content} slug={page.slug}/>
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
