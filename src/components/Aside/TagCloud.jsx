import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import { TagCloud } from 'react-tagcloud'
import styles from './TagCloud.module.css'

function translateDataForTagCloud(data) {
    return data
            .filter(tag => !(tag.totalCount === 1))
            .sort((a, b) => b.totalCount - a.totalCount)
            .slice(0, 45)
            .map((tag) => ({
                    value: tag.fieldValue,
                    count: tag.totalCount
                }))
}

const TagCloudComponent = () => (
    <StaticQuery
        query={graphql`
            query CountOfTags {
                allWordpressPost(
                    filter: {tags: {elemMatch: {name: {ne: null}}}}
                    sort: {fields: [tags___count, date]}
                ) {
                    group(field: tags___name) {
                    fieldValue
                    totalCount
                    }
                }
            }
        `}
        render={data => {
            const translated = translateDataForTagCloud(data.allWordpressPost.group)
            return (
                <TagCloud
                    minSize={16}
                    maxSize={32}
                    tags={translated}
                    onClick={(tag) => {
                        const value = tag.value.replace(/\s+/g, '-').toLowerCase()
                        const url = `/tag/${value}-${tag.count}`
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
