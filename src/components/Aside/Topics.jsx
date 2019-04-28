import React from 'react'
import { StaticQuery, graphql, Link } from "gatsby"
import styles from './Topics.module.css'

const Topics = () => (
    <StaticQuery
        query={graphql`
            query CountOfCategories {
                allWordpressCategory(
                    filter: {count: {ne: 0}}
                ) {
                    edges {
                        node {
                            name
                            count
                            slug
                        }
                    }
                }
            }
        `}
        render={data => (
            data.allWordpressCategory.edges.map((key) => (
                <div key={`${key.node.slug} ${key.node.name} ${key.node.count}`} className={styles.link}>
                    <Link className={styles.category} to={`/category/${key.node.slug}`} title={key.node.name}>
                        {key.node.name}
                    </Link>
                    <div className={styles.count}>
                        {`(${key.node.count})`}
                    </div>
                </div>
            ))
        )}
    />
)

export default Topics
