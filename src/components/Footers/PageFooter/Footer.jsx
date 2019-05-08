import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from "./Footer.module.css"

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

const Footer = () => (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => {
          const date = new Date();
          return (
          <div className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.centering}>
                    <div className={styles.socialMediaButtonRow}>
                        <a className={styles.iconButton} href="https://www.facebook.com/1947project#" target="_blank" rel="noopener noreferrer">
                            <span className="fa-layers">
                            <FontAwesomeIcon className={`${styles.circleIcon}`} icon={["fas", "circle"]} size="2x"/>
                            <FontAwesomeIcon className={`${styles.icon}`} icon={["fab", "facebook-f"]} transform="right-5"/>
                            </span>
                        </a>
                        <a className={styles.iconButton} href="https://twitter.com/1947project" target="_blank" rel="noopener noreferrer">
                            <span className="fa-layers">
                            <FontAwesomeIcon className={`${styles.circleIcon}`} icon={["fas", "circle"]} size="2x"/>
                            <FontAwesomeIcon className={styles.icon} icon={["fab", "twitter"]} transform="right-3"/>
                            </span>
                        </a>
                        <a className={styles.iconButton} href="https://www.youtube.com/user/esotouric" target="_blank" rel="noopener noreferrer">
                            <span className="fa-layers">
                            <FontAwesomeIcon className={`${styles.circleIcon}`} icon={["fas", "circle"]} size="2x"/>
                            <FontAwesomeIcon className={styles.icon} icon={["fab", "youtube"]} transform="right-2"/>
                            </span>
                        </a>
                    </div>
                    <div className={styles.scrollToTop}>
                        <button className={styles.arrowButton} type="button" onClick={scrollToTop}>
                            <FontAwesomeIcon icon={["fas", "arrow-up"]} />
                        </button>
                    </div>
                    <div className={styles.navBar}>
                        <Link className={styles.navBarOption} to="/1947project-mission-statement">About</Link>
                        <Link className={styles.navBarOption} to="/authors">Authors</Link>
                        <Link className={styles.navBarOption} to="/timetravelblogs">Our Time Travel Blogs</Link>
                        <Link className={styles.navBarOption} to="/blog">Blog</Link>
                    </div>
                    <div className={styles.copyright}>
                        {"© "}
                        <Link className={styles.title} to="/" title={data.site.siteMetadata.title}>
                            {data.site.siteMetadata.title}
                        </Link>
                        {` ${date.getFullYear()}`}
                    </div>
                </div>
            </div>
          </div>
      )}}
    />
  )

export default Footer
