module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("dateFr", (value) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  });

  eleventyConfig.addCollection("events", (collectionApi) => {
    return collectionApi.getFilteredByTag("events").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("resources", (collectionApi) => {
    return collectionApi.getFilteredByTag("resources").sort((a, b) =>
      (a.data.title || "").localeCompare(b.data.title || "")
    );
  });

  eleventyConfig.addCollection("bureau", (collectionApi) => {
    return collectionApi.getFilteredByTag("bureau").sort(
      (a, b) => (a.data.order ?? 0) - (b.data.order ?? 0)
    );
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
