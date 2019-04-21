import React from 'react'
import styles from './Aside.module.css'

const Aside = () => (
    <div className={styles.aside}>
        <div>
            <h4 className={styles.widgetTitle}>
            THE ESOTOURIC BUS!
            </h4>
            <img className={styles.esotouric} src="/static/esotouriclogo.png" alt="esotouric"/>
        </div>
    </div>
)

export default Aside
