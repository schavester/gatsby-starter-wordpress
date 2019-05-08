import React from 'react'
import { Link } from 'gatsby'
import styles from "./PostHeader.module.css"
import { tagToAuthorMapping } from '../../Helpers/AuthorMappings'

export const PostHeader = ({
    id,
    content,
    categories,
    tags,
    title,
    date,
    slug,
    author
}) => (
    <div className="content" key={`${id}-${title}`}>
        <div className={styles.post_meta}>
            <Link className={styles.inLine_Link} to={`/${tagToAuthorMapping[author.slug]}`}>
                {author.name}
            </Link>
            {` / `}
            { categories ? 
                categories.map((category, index) => {
                    let comma = ""
                    if (index > 0) {
                        comma = ", "
                    }
                    return (
                        <span key={`${id}-${category.id}-${category.name}`}>
                            {comma}
                            <Link className={styles.inLine_Link} to={`/category/${category.slug}`}>
                                {category.name}
                            </Link>
                        </span>
                )}) : null
            }
            {` / `}
            { tags ? 
                tags.map((tag, index) => {
                    let comma = ""
                    if (index > 0) {
                        comma = ", "
                    }
                    return (
                        <span key={`${id}-${tag.id}`}>
                            {comma}
                            <Link className={styles.inLine_Link} to={`/tag/${tag.slug}`}>
                                {tag.name}
                            </Link>
                        </span>
                    )
                }) : null
                
            }
        </div>
        <div>
            <Link className={`${styles.post_title} ${styles.inLine_Link}`} to={`/${slug}`} dangerouslySetInnerHTML={{ __html: title }}/>
        </div>
        <p className={`entry-meta ${styles.date}`}>
            {date}
        </p>
        <div className="entry-content">
        <div
            dangerouslySetInnerHTML={{
            __html: content
            }}
        />
        </div>
    </div>
)

export default PostHeader
