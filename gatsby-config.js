module.exports = {
    siteMetadata: {
        title: '1947 Project',
        subtitle: 'Los Angeles De-Mythified'
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-source-wordpress',
            options: {
                baseUrl: '1947project.hiddenhistoryblogs.com',
                hostingWPCOM: false,
                protocol: 'http',
                useACF: false,
                verboseOutput: true,
			auth: {
		      htaccess_user: "rest",
		      htaccess_pass: "8JhYLZ83t7aBQ",
		      htaccess_sendImmediately: false
    					}	
            },
        },
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        'gatsby-plugin-purgecss',
        'gatsby-plugin-netlify', // make sure to keep it last in the array
    ]
}
