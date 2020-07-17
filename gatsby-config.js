console.log(process.env.PATH_PREFIX)
module.exports = {
  siteMetadata: {
    title: `DEV LOGS`,
    author: {
      name: `신철헌`,
      summary: `즐겁게 개발하고 싶은 초보 프론트엔드 개발자입니다`,
    },
    description: `신철헌의 공부한 것들 및 포토폴리오 등등을 올릴 페이지`,
    siteUrl: `https://devcheolheon.github.io/`,
    social: {
      twitter: `devcheolheon`,
      github: `devcheolheon`,
    },
  },
  plugins: [
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Song+Myung", "Do+Hyeon", "Sunflower"],
        },
      },
    },
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `BIR`,
        remote: `https://github.com/devcheolheon/BIR`,
        branch: `master`,
        // Only import the docs folder from a codebase.
        patterns: ["**/*.md"],
      },
    },
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `TIL`,
        remote: `https://github.com/devcheolheon/TIL`,
        branch: `master`,
        // Only import the docs folder from a codebase.
        patterns: ["**/*.md"],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  pathPrefix: `/${process.env.PATH_PREFIX || ""}`,
}
