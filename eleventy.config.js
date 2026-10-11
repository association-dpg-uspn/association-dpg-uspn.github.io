module.exports = async function (eleventyConfig) {
  const { eleventyImageTransformPlugin } = await import("@11ty/eleventy-img");

  eleventyConfig.addPassthroughCopy("src/assets");

  // Resizes every <img> in the generated HTML (including photos uploaded via
  // Pages CMS) and serves WebP with a JPEG fallback.
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    widths: [160, 400, 800, "auto"],
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
        sizes: "(max-width: 40rem) 100vw, 20rem",
      },
    },
  });

  // Front matter dates have no time, so they are parsed as UTC midnight:
  // format them in UTC so the day never shifts.
  eleventyConfig.addFilter("dateFr", (value) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(value));
  });

  // "Today" in Paris as YYYY-MM-DD, compared against event dates (also YYYY-MM-DD).
  // The site is rebuilt daily (see .github/workflows/deploy.yml) so this stays current.
  const todayInParis = () =>
    new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Paris" });
  const eventDay = (event) => new Date(event.data.date).toISOString().slice(0, 10);

  eleventyConfig.addCollection("upcomingEvents", (collectionApi) => {
    const today = todayInParis();
    return collectionApi
      .getFilteredByTag("events")
      .filter((event) => eventDay(event) >= today)
      .sort((a, b) => a.date - b.date);
  });

  eleventyConfig.addCollection("pastEvents", (collectionApi) => {
    const today = todayInParis();
    return collectionApi
      .getFilteredByTag("events")
      .filter((event) => eventDay(event) < today)
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("chroniques", (collectionApi) => {
    return collectionApi.getFilteredByTag("chroniques").sort((a, b) =>
      (a.data.title || "").localeCompare(b.data.title || "")
    );
  });

  eleventyConfig.addCollection("bureau", (collectionApi) => {
    return collectionApi.getFilteredByTag("bureau").sort(
      (a, b) => (a.data.order ?? 0) - (b.data.order ?? 0)
    );
  });

  eleventyConfig.addCollection("partners", (collectionApi) => {
    return collectionApi.getFilteredByTag("partners").sort(
      (a, b) => (a.data.order ?? 0) - (b.data.order ?? 0)
    );
  });

  eleventyConfig.addCollection("boutique", (collectionApi) => {
    return collectionApi.getFilteredByTag("boutique").sort(
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
