class ApiFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  /**
   * Filters the query based on the provided query string.
   * @returns {Object} The updated instance of the `apiFeatures` class.
   */
  filter() {
    const queryObj = { ...this.queryString };
    const excludedField = ["page", "sort", "limit", "fields", "search"];
    excludedField.forEach((field) => delete queryObj[field]);

    // Advance level filtering
    let queryStr = JSON.stringify(queryObj);

    /*G et the query string and replace the query string 
    with the query string with the dollar sign for monoDB match Properties */
    queryStr = queryStr.replace(
      /\b(gte|lte|gt|lt|in)\b/g,
      (match) => `$${match}`
    );

    let parsedQuery = JSON.parse(queryStr);

    // Search the query string based on TITLE and DESCRIPTION of Task List
    if (this.queryString.search) {
      const searchRegex = new RegExp(this.queryString.search, "i"); // 'i' for case-insensitive
      parsedQuery = {
        ...parsedQuery,
        $or: [{ title: searchRegex }, { description: searchRegex }],
      };
    }

    this.query = this.query.find(parsedQuery);

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query.sort(sortBy);
    } else {
      this.query.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const queryFields = this.queryString.fields.split(",").join(" ");
      this.query.select(queryFields);
    } else {
      this.query.select("-__v");
    }
    return this;
  }
  pagination() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 100;
    const skip = (page - 1) * limit;
    this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = ApiFeature;
