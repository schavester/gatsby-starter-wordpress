import React from 'react'
import { StaticQuery, graphql, Link } from "gatsby";
import styles from './Archive.module.css'

const months = ["January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"]

function translateDataForDisplay(data) {
    const counts = {}

    data.map((val) => ({ date: new Date(val.node.date) }))
        .forEach((date) => {
            const monthNum = date.date.getMonth()
            const year = date.date.getFullYear()
            const key = `${months[monthNum]} ${year}`
            counts[key] = {
                count: (counts[key] ? counts[key].count : 0) + 1,
                year,
                month: monthNum
            }
        })
    return counts
}

const Archive = () => (
    <StaticQuery
        query={graphql`
            query DatesOfPosts {
                allWordpressPost {
                    edges {
                        node {
                            date
                        }
                    }
                }
            }
        `}
        render={data => {
            const groupedData = translateDataForDisplay(data.allWordpressPost.edges)
            return (
                Object.keys(groupedData).map((key) => {
                    let monthNumForRoute = (groupedData[key].month + 1).toString()
                    if (monthNumForRoute < 10) {
                        monthNumForRoute = monthNumForRoute.padStart(2, '0')
                    }
                    return (
                        <div key={key} className={styles.link}>
                            <Link className={styles.date} to={`/${groupedData[key].year}/${monthNumForRoute}`} title={key}>
                                {key}
                            </Link>
                            <div className={styles.count}>
                                {`(${groupedData[key].count})`}
                            </div>
                        </div>
                    )
                })
            )
        }}
    />
)

export default Archive
