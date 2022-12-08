// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  // api.createPages(({ createPage }) => {
  //   createPage({
  //     path: "/service/:slug",
  //     component: "./src/templates/Service.vue",
  //   });
  // });
  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`
      {
        strapi {
          articles {
            slug
          }
          categories {
            slug
          }
          properties {
            slug
          }
          areaGuides {
            slug
          }
          tags {
            slug
          }
        }
      }
    `);

    // Create blog articles pages.
    const articles = data.strapi.articles;
    const categories = data.strapi.categories;
    const properties = data.strapi.properties;
    const areaGuides = data.strapi.areaGuides;
    const tags = data.strapi.tags;

    articles.forEach((article) => {
      createPage({
        path: `/article/${article.slug}`,
        component: "./src/templates/Article.vue",
        context: {
          slug: article.slug,
        },
      });
    });

    categories.forEach((category) => {
      createPage({
        path: `/category/${category.slug}`,
        component: "./src/templates/Category.vue",
        context: {
          slug: category.slug,
        },
      });
    });

    properties.forEach((property) => {
      createPage({
        path: `/property/${property.slug}`,
        component: "./src/templates/Property.vue",
        context: {
          slug: property.slug,
        },
      });
    });

    areaGuides.forEach((areaGuide) => {
      createPage({
        path: `/area-guide/${areaGuide.slug}`,
        component: "./src/templates/areaGuide.vue",
        context: {
          slug: areaGuide.slug,
        },
      });
    });

    tags.forEach((tag) => {
      //console.log(tag);
      createPage({
        path: `/service/${tag.slug}`,
        component: "./src/templates/Service.vue",
        context: {
          slug: tag.slug,
        },
      });
    });
  });
};
