import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import styles from './Aside.module.css'
import esotouriclogo from '../../img/esotouriclogo.png'
import keptGirl from '../../img/keptGirl.jpg'
import TagCloudComponent from './TagCloud'
import Archive from './Archive'
import Topics from './Topics'

const Aside = () => (
    <StaticQuery
      query={graphql`
        query RecentPostQuery {
            allWordpressPost(limit: 5) {
                edges {
                    node {
                        id
                        title
                        slug
                        date
                    }
                }
            }
        }
      `}
      render={data => (
        <div className={styles.aside}>
            <div className={styles.widget}>
                <h4 className={styles.widgetTitle}>
                THE ESOTOURIC BUS!
                </h4>
                <img className={styles.esotouric} src={esotouriclogo} alt="esotouric"/>
            </div>
            <div className={styles.widget}>
                <h4 className={styles.widgetTitle}>
                THE KEPT GIRL
                </h4>
                <img className={styles.keptGirl} src={keptGirl} alt="keptGirl"/>
            </div>
            <div className={styles.widget}>
                <h4 className={styles.widgetTitle}>
                Recent Posts
                </h4>
                {
                    data.allWordpressPost.edges.map((post) => {
                        const date = new Date(post.node.date)
                        const year = date.getFullYear()
                        const month = date.getMonth() + 1
                        const day = date.getDay() + 1
                        return (
                            <Link className={styles.recentPost} key={post.node.id} to={`/${year}/${month}/${day}/${post.node.slug}`} dangerouslySetInnerHTML={{ __html: post.node.title }}/>
                        )
                    })
                }
            </div>
            <div className={styles.widget}>
                <h4 className={styles.widgetTitle}>
                Tag Cloud
                </h4>
                <TagCloudComponent/>
            </div>
            <div className={styles.widget}>
                <h4 className={styles.widgetTitle}>
                Archive
                </h4>
                <Archive/>
            </div>
            <div className={styles.widget}>
                <h4 className={styles.widgetTitle}>
                Topics
                </h4>
                <Topics/>
            </div>
        </div>
      )}
    />
)

export default Aside
