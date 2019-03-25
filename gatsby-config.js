module.exports = {
    siteMetadata: {
        title: 'Title from siteMetaData',
        subtitle: 'Subtitle  from siteMetaData'
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-source-wordpress',
            options: {
                baseUrl: 'localhost/wp',
                hostingWPCOM: false,
                protocol: 'http',
                useACF: false,
                verboseOutput: true,
            },
        },
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        'gatsby-plugin-purgecss',
        'gatsby-plugin-netlify', // make sure to keep it last in the array
    ]
}
