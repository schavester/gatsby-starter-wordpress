/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styles from "./PostList.module.css"

export default class IndexPage extends React.Component {
  render() {
    const { posts, title } = this.props

    return (
      <section className="section">
        <div className="container">
          <section className="content">
            <h1 className="has-text-weight-bold is-size-2">WELCOME TO THE 1947PROJECT</h1>
            <p>
              Gentle reader, welcome to 1947project.
              The site you’re visiting contains two years’ worth of blogging the crimes and oddities of 1907 and 1927,
              plus occasional fresh historical Los Angeles inquiries, among them Nathan Marsak’s L.A. Noire gameplay blog.
              If you’re looking for the original 1947project and crimes of that wild post-war year, click
              <a className={styles.inLine_Link} href="http://1947project.blogspot.com"> here</a>
              .
            </p>
            <p>
              There are two other time travel blogs in the 1947project stable:
              On Bunker Hill is a house-by-house survey, exploring the great lost downtown neighborhood of Bunker Hill from the 1880s to the 2000s.
              Join us
              <a className={styles.inLine_Link} href="https://www.onbunkerhill.org/"> On Bunker Hill </a>
              to meet the people, homes and peculiarities that called the hill their own.
              Can’t get enough of historic L.A. oddities? Then visit our other blog
              <a className={styles.inLine_Link} href="https://insroland.org/"> In SRO Land </a>
              , lost lore of the historic core.
              Or for that personal touch, join us on an
              <a className={styles.inLine_Link} href="https://esotouric.com/"> Esotouric </a>
              bus adventure into the secret heart of Los Angeles.
            </p>
          </section>
          {posts.map(({ node: post }) => (
            <div className="content" key={post.id}>
              <div className={styles.post_meta}>
                <Link className={styles.inLine_Link} to={`/author/${post.author.slug}`}>
                  {post.author.name}
                </Link>
                {` / `}
                {post.categories.map((category, index) => {
                  let comma = ""
                  if (index > 0) {
                    comma = ", "
                  }
                  return (
                  <span key={`${post.id}-${category.id}`}>
                    {comma}
                    <Link className={styles.inLine_Link} to={`/category/${category.slug}`}>
                      {category.name}
                    </Link>
                  </span>
                  )}
                )}
              </div>
              <div>
                <Link className={`${styles.post_title} ${styles.inLine_Link}`} to={post.slug}>
                  {post.title}
                </Link>
              </div>
              <p className="entry-meta">
                {post.date}
              </p>
              <div className="entry-content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export const pageQuery = graphql`
  fragment PostListFields on wordpress__POST {
    id
    title
    content
    author {
      name
      slug
      avatar_urls {
        wordpress_48
      }
    }
    categories {
      id
      name
      slug
    }
    date(formatString: "MMMM DD, YYYY")
    slug
  }
`
