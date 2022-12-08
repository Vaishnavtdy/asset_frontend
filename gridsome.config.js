// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Asset Homez",
  siteDescription: "Asset Homez international properties LLC",
  plugins: [
    {
      use: "@gridsome/source-graphql",
      options: {
        url:
          (process.env.GRIDSOME_STRAPI_URL || "http://localhost:1337") +
          "/graphql",
        fieldName: "strapi",
        typeName: "strapiTypes",
      },
    },
    {
      use: "@gridsome/source-strapi",
      options: {
        apiURL: process.env.GRIDSOME_STRAPI_URL || "http://localhost:1337",
        queryLimit: 1000, // Defaults to 100
        contentTypes: ["property"],
        //singleTypes: ['impressum'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        loginData: {
          identifier: "",
          password: "",
        },
      },
    },
    {
      use: "gridsome-plugin-modal",
    },
  ],
};
