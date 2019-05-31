/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { paginate } = require('gatsby-awesome-pagination')
const createPaginatedPages = require('gatsby-paginate')

const getOnlyPublished = edges =>
  _.filter(edges, ({ node }) => node.status === 'publish')

exports.createPages = ({ actions, graphql }) => { // Pages Begin
  const { createPage } = actions
  return graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            slug
            status
          }
        }
      }
    }
  `)
    .then(result => { // Pages End
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const pageTemplate = path.resolve(`./src/templates/page.js`)

      // Only publish pages with a `status === 'publish'` in production. This
      // excludes drafts, future posts, etc. They will appear in development,
      // but not in a production build.

      const allPages = result.data.allWordpressPage.edges
      const pages =
        process.env.NODE_ENV === 'production'
          ? getOnlyPublished(allPages)
          : allPages

      // Call `createPage()` once per WordPress page
      _.each(pages, ({ node: page }) => {
        createPage({
          path: `/${page.slug}/`,
          component: pageTemplate,
          context: {
            id: page.id,
          },
        })
      })
    })
    .then(() => { // Posts Begin
      return graphql(`
        {
          allWordpressPost {
            edges {
              node {
                id
                content
                categories {
                  id
                  slug
                  name
                }
                tags {
                  id
                  slug
                  name
                }
                title
                date(formatString: "MMMM DD, YYYY")
                slug
                author {
                  id
                  slug
                  name
                }
                status
              }
            }
          }
        }
      `)
    })
    .then(result => { // Posts End
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const postTemplate = path.resolve(`./src/templates/post.js`)
      const blogTemplate = path.resolve(`./src/templates/blog.js`)

      // In production builds, filter for only published posts.
      const allPosts = result.data.allWordpressPost.edges
      const posts =
        process.env.NODE_ENV === 'production'
          ? getOnlyPublished(allPosts)
          : allPosts

      // Iterate over the array of posts
      _.each(posts, ({ node: post }) => {
        const date = new Date(post.date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        // Create the Gatsby page for this WordPress post
        createPage({
          path: `${year}/${month}/${day}/${post.slug}/`,
          component: postTemplate,
          context: {
            id: post.id,
          },
        })
      })

      // Create a paginated blog, e.g., /, /page/2, /page/3
      paginate({
        createPage,
        items: posts,
        itemsPerPage: 10,
        pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? `/` : `/page`),
        component: blogTemplate,
      })

      // Should look like { 'year' : [{data}, {data}]}
      const postsByYear = {}
      // Should look like { 'year' : { 'month' : [{data}, {data}]}}
      const postsByYearAndMonth = {}
      // Should look like { 'year' : { 'month' : { 'day' : [{data}, {data}]}}}
      const postsByYearAndMonthAndDay = {}

      posts.forEach((post) => {
        const date = new Date(post.node.date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        if (year in postsByYear) {
          postsByYear[year].push(post)
        } else {
          postsByYear[year] = [post]
        }

        if (year in postsByYearAndMonth) {
          if (month in postsByYearAndMonth[year]) {
            postsByYearAndMonth[year][month].push(post)
          } else {
            postsByYearAndMonth[year][month] = [post]
          }
        } else {
          postsByYearAndMonth[year] = { [month] : [post] }
        }

        if (year in postsByYearAndMonthAndDay) {
          if (month in postsByYearAndMonthAndDay[year]) {
            if (day in postsByYearAndMonthAndDay[year][month]) {
              postsByYearAndMonthAndDay[year][month][day].push(post)
            } else {
              postsByYearAndMonthAndDay[year][month][day] = [post]
            }
          } else {
            postsByYearAndMonthAndDay[year][month] = { [day] : [post] }
          }
        } else {
          postsByYearAndMonthAndDay[year] = { [month]: { [day] : [post] } }
        }
      })

      // const testTemplate = path.resolve(`./src/templates/test.js`)
      Object.keys(postsByYear).forEach((key) => {
        // Create pagination for years
        createPaginatedPages({
          createPage,
          edges: postsByYear[key],
          pageLength: 10,
          pageTemplate: `./src/templates/blogYear.js`,
          pathPrefix: key,
          buildPath: ( index, pathPrefix ) => (index > 1 ? `/${pathPrefix}/page/${index}` : `/${pathPrefix}`),
        })
      })

      Object.keys(postsByYearAndMonth).forEach((year) => {
        Object.keys(postsByYearAndMonth[year]).forEach((month) => {
          createPaginatedPages({
            createPage,
            edges: postsByYearAndMonth[year][month],
            pageLenght: 10,
            pageTemplate: `./src/templates/blogMonth.js`,
            pathPrefix: `${year}/${month}`,
            buildPath: ( index, pathPrefix ) => (index > 1 ? `/${pathPrefix}/page/${index}` : `/${pathPrefix}`)
          })
        })
      })

      Object.keys(postsByYearAndMonthAndDay).forEach((year) => {
        Object.keys(postsByYearAndMonthAndDay[year]).forEach((month) => {
          Object.keys(postsByYearAndMonthAndDay[year][month]).forEach((day) => {
            createPaginatedPages({
              createPage,
              edges: postsByYearAndMonthAndDay[year][month][day],
              pageLength: 10,
              pageTemplate: `./src/templates/blogDay.js`,
              pathPrefix: `${year}/${month}/${day}`,
              buildPath: ( index, pathPrefix ) => (index > 1 ? `/${pathPrefix}/page/${index}` : `/${pathPrefix}`)
            })
          })
        })
      })
    })
    .then(() => { // Categories Begin
      return graphql(`
        {
          allWordpressCategory(filter: { count: { gt: 0 } }) {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
        }
      `)
    })
    .then(result => { // Categories End
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const categoriesTemplate = path.resolve(`./src/templates/category.js`)

      // Create a Gatsby page for each WordPress Category
      _.each(result.data.allWordpressCategory.edges, ({ node: cat }) => {
        createPage({
          path: `/category/${cat.slug}/`,
          component: categoriesTemplate,
          context: {
            name: cat.name,
            slug: cat.slug,
          },
        })
      })
    })
    .then(() => { // Tags Begin
      return graphql(`
        {
          allWordpressTag(filter: { count: { gt: 0 } }) {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
        }
      `)
    })
    .then(result => { // Tags End
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const tagsTemplate = path.resolve(`./src/templates/tag.js`)

      // Create a Gatsby page for each WordPress tag
      _.each(result.data.allWordpressTag.edges, ({ node: tag }) => {
        createPage({
          path: `/tag/${tag.slug}/`,
          component: tagsTemplate,
          context: {
            name: tag.name,
            slug: tag.slug,
          },
        })
      })
    })  
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
