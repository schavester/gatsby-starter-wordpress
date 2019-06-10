import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faArrowUp, faBars } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import styles from "./Navbar.module.css"

library.add(faFacebookF, faTwitter, faYoutube, faCircle, faArrowUp, faBars)


const showNavDropdown = () => {
    const topNav = document.getElementById("topNav")
    if (topNav.className === styles.navBar) {
      topNav.classList.add(styles.responsive)
    } else {
      topNav.className = styles.navBar
    }
}

const NavBar = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            subtitle
          }
        }
      }
    `}
    render={data => (
        <div className={styles.header}>
          <div className={styles.header_img}>
            <div className={styles.title_container}>
                <Link className={styles.title} to="/" title={data.site.siteMetadata.title}>
                  {data.site.siteMetadata.title}
                </Link>
            </div>
            <div className={styles.subtitle}>
                {data.site.siteMetadata.subtitle}
            </div>
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
            <div id="topNav" className={styles.navBar}>
              <Link className={styles.navBarOption} to="/1947project-mission-statement">About</Link>
              <Link className={styles.navBarOption} to="/authors">Authors</Link>
              <Link className={styles.navBarOption} to="/timetravelblogs">Our Time Travel Blogs</Link>
              <Link className={styles.navBarOption} to="/blog">Blog</Link>
              <button type="button" className={styles.navIcon} onClick={showNavDropdown}>
                <FontAwesomeIcon icon={["fas", "bars"]} />
              </button>
            </div>
          </div>
        </div>
    )}
  />
)

export default NavBar
