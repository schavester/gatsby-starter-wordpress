/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { months } from '../../Helpers/DateMappings'
import { slugToNameMapping } from '../../Helpers/AuthorMappings'
import styles from './AuthorFooter.module.css'

const AuthorFooter = (slug) => (
    <StaticQuery
      query={graphql`
        query {
            allWordpressPost{
                edges {
                    node {
                        author {
                            name
                        }
                        title
                        date
                        slug
                    }
                }
            }
        }
      `}
      render={data => {
        const filteredData = data.allWordpressPost.edges.filter(post => post.node.author.name === slugToNameMapping[slug.slug])
        return (
            <div>
                {
                    filteredData.map((val) => {
                        const date = new Date(val.node.date)
                        const dateString = `${months[date.getMonth()]} ${(date.getDay() + 1)}, ${date.getFullYear()}`
                        return (
                            <div key={val.node.slug} className={styles.card}>
                                <Link
                                    to={`/${val.node.slug}`}
                                    dangerouslySetInnerHTML={{
                                        __html: val.node.title
                                    }} 
                                />
                                <div>
                                    {dateString}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
      }}
    />
)

export default AuthorFooter
