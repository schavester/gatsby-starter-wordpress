import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import { TagCloud } from 'react-tagcloud'
import styles from './TagCloud.module.css'

function translateDataForTagCloud(data) {
    return data
            .filter(tag => !(tag.node.count === 1))
            .sort((a, b) => b.node.count - a.node.count)
            .slice(0, 45)
            .map((tag) => ({
                    value: tag.node.name,
                    count: tag.node.count,
                    slug: tag.node.slug
                }))
}

const TagCloudComponent = () => (
    <StaticQuery
        query={graphql`
            query CountOfTags {
                allWordpressTag(
                    sort: {fields: name}
                ) {
                    edges {
                        node {
                            slug
                            name
                            count
                        }
                    }
                }
            }
        `}
        render={data => {
            const translated = translateDataForTagCloud(data.allWordpressTag.edges)
            return (
                <TagCloud
                    minSize={16}
                    maxSize={32}
                    tags={translated}
                    onClick={(tag) => {
                        const url = `/tag/${tag.slug}`
                        window.location = url
                    }}
                    disableRandomColor
                    className={styles.tag}
                />
            )
        }}
    />
)

export default TagCloudComponent
