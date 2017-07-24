import slugify from "slugify";

/**
 * Creates a permlink for a new post.
 * @param title - The title of the post
 * @returns {string|*} -
 */
export const createPermLink = title => {
  // Converting post title to a permlink.
  // Thanks to @good-karma, copied that from eSteem.
  var permlink;
  var t = new Date();
  var timeformat =
    t.getFullYear().toString() +
    (t.getMonth() + 1).toString() +
    t.getDate().toString() +
    "t" +
    t.getHours().toString() +
    t.getMinutes().toString() +
    t.getSeconds().toString() +
    t.getMilliseconds().toString() +
    "z";
  if (title && title.trim() !== "") {
    var s = slugify(title);
    permlink = s.toString() + "-" + timeformat;
    if (permlink.length > 255) {
      // STEEMIT_MAX_PERMLINK_LENGTH
      permlink = permlink.substring(permlink.length - 255, permlink.length);
    }
    // only letters numbers and dashes shall survive
    permlink = permlink.toLowerCase().replace(/[^a-z0-9-]+/g, "");
    return permlink;
  }
};

/**
 * Create array from 'tag' input field.
 * @param {string} tagString - A list of tags separated by a space (' ').
 * @returns {Array|*}
 */
export const createTagArray = tagString => {
  console.log(tagString);
  return tagString.split(",");
};

export const createJSONMetadata = data => {
  const json = {
    app: data.app || "steemQL",
    tags: data.tags,
    format: "markdown",
    community: "steemQL"
  };
  return JSON.stringify(json);
};
