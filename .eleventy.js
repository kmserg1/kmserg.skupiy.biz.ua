module.exports = function (eleventyConfig) {
  // Input directory: src
  // Output directory: _site
  // Filters
  const dateFilter = require('./src/filters/date-filter.js');
  const timeFilter = require('./src/filters/time-filter.js');
  const w3DateFilter = require('./src/filters/w3-date-filter.js');
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy('./src/images/');
  eleventyConfig.addPassthroughCopy("*.html");
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addFilter('dateFilter', dateFilter);
  eleventyConfig.addFilter('timeFilter', timeFilter);
  eleventyConfig.addFilter('w3DateFilter', w3DateFilter);


  eleventyConfig.addCollection("anyTag", function(collectionApi) {
    const tagsToMatch = ["humors", "it-posts", "commons"];

      return collectionApi.getAll().filter(
	item => {
		const itemTags = Array.isArray(item.data.tags) ? item.data.tags : [item.data.tags];
		// Перевіряємо, чи є хоча б один спільний тег
		return itemTags.some(tag => tagsToMatch.includes(tag))
		}
     )
  .sort((a, b) => b.date - a.date)  // сортування за датою у спадному порядку
  .slice(0, 6);  // обмеження кількості елементів;

  });



  eleventyConfig.addCollection("tags", function(collection) {
        let tags = new Set();
        collection.getAll().forEach(item => {
            if ("tags" in item.data) {
                item.data.tags.forEach( tag => {return tags.add(tag)});
            }
        });
        return [...tags];
    });
}
