const sectionFields = {
  hero: {
    strings: [
      "role",
      "titleLead",
      "titleAccent",
      "titleSupporting",
      "titleEmphasis",
      "description",

      "profileImage",
      "yearsExperience",
      "githubUrl",
      "linkedinUrl",
    ],
    arrays: ["skills"],
  },
  about: {
    strings: ["label", "headingLead", "headingEmphasis", "quote"],
    arrays: ["paragraphs", "highlights"],
  },
  projects: {
    strings: [
      "label",
      "headingLead",
      "headingEmphasis",
      "description",
      "viewAllUrl",
    ],
    arrays: ["items"],
  },
  experience: {
    strings: ["label", "headingLead", "headingEmphasis", "description"],
    arrays: ["items"],
  },
  learning: {
    strings: ["label", "headingLead", "headingEmphasis"],
    arrays: ["items"],
  },
  contact: {
    strings: [
      "label",
      "headingLead",
      "headingEmphasis",
      "description",
      "email",
      "phone",
      "location",
      "availabilityTitle",
      "availabilityDescription",
    ],
  },
  navigation: {
    strings: ["name", "surname"],
    arrays: ["links"],
  },
  footer: {
    strings: ["copyrightName"],
    arrays: ["links", "socials"],
  },
};

const objectArrays = {
  "about.highlights": [["icon", "title", "description"]],
  "projects.items": [
    ["title", "description", "image", "link", "github", "tags"],
    ["tags"],
  ],
  "experience.items": [
    ["period", "role", "company", "description", "technologies", "current"],
    ["technologies"],
  ],
  "learning.items": [["title", "why", "icon", "recommendedResources", "image"]],
  "navigation.links": [["href", "label"]],
  "footer.links": [["href", "label"]],
  "footer.socials": [["label", "href", "icon"]],
};

const stringArrays = ["hero.skills", "about.paragraphs"];

const allowedIcons = {
  "about.highlights": ["Code2", "Rocket", "Users", "Lightbulb"],
  "learning.items": ["FileCode", "Server", "Component", "Database"],
  "footer.socials": ["Github", "Linkedin"],
};

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isSafeLink(value) {
  if (typeof value !== "string" || value.length > 2048) return false;
  if (value.startsWith("#") || value.startsWith("/")) return true;

  try {
    return ["https:", "http:", "mailto:", "tel:"].includes(
      new URL(value).protocol,
    );
  } catch {
    return false;
  }
}

export function validatePortfolio(portfolio) {
  if (!isRecord(portfolio)) return "Content must be an object.";

  for (const [section, fields] of Object.entries(sectionFields)) {
    if (!isRecord(portfolio[section]))
      return `Missing or invalid "${section}" section.`;

    for (const field of fields.strings || []) {
      if (
        typeof portfolio[section][field] !== "string" ||
        portfolio[section][field].length > 10000
      ) {
        return `"${section}.${field}" must be a string under 10,000 characters.`;
      }
    }

    for (const field of fields.arrays || []) {
      if (
        !Array.isArray(portfolio[section][field]) ||
        portfolio[section][field].length > 100
      ) {
        return `"${section}.${field}" must be an array with at most 100 entries.`;
      }
    }
  }

  for (const [path, [requiredFields, stringArrayFields = []]] of Object.entries(
    objectArrays,
  )) {
    const [section, field] = path.split(".");
    for (const item of portfolio[section][field]) {
      if (!isRecord(item)) return `"${path}" must contain objects.`;

      for (const required of requiredFields) {
        const value = item[required];
        const valid =
          typeof value === "string" ||
          (stringArrayFields.includes(required) && Array.isArray(value)) ||
          (required === "current" && typeof value === "boolean");
        if (!valid) return `"${path}.${required}" has an invalid value.`;

        if (typeof value === "string" && value.length > 10000) {
          return `"${path}.${required}" exceeds 10,000 characters.`;
        }

        for (const path of stringArrays) {
          const [section, field] = path.split(".");
          const values = portfolio[section][field];
          if (
            !Array.isArray(values) ||
            values.length > 100 ||
            values.some(
              (value) => typeof value !== "string" || value.length > 10000,
            )
          ) {
            return `"${path}" must be a list of at most 100 text values.`;
          }
        }

        for (const [path, options] of Object.entries(allowedIcons)) {
          const [section, field] = path.split(".");
          const items = portfolio[section][field];
          const invalid = items.find((item) => !options.includes(item.icon));
          if (invalid)
            return `"${path}.icon" must be one of the supported icons.`;
        }

        if (
          stringArrayFields.includes(required) &&
          (!Array.isArray(value) ||
            value.length > 100 ||
            value.some((entry) => typeof entry !== "string"))
        ) {
          return `"${path}.${required}" must be a list of at most 100 text values.`;
        }
      }
    }
  }

  for (const value of [
    portfolio.hero.githubUrl,
    portfolio.hero.linkedinUrl,
    portfolio.projects.viewAllUrl,
    ...portfolio.projects.items.flatMap((item) => [item.link, item.github]),
    ...portfolio.learning.items.map((item) => item.recommendedResources),
    ...portfolio.navigation.links.map((link) => link.href),
    ...portfolio.footer.links.map((link) => link.href),
    ...portfolio.footer.socials.map((link) => link.href),
  ]) {
    if (!isSafeLink(value))
      return "Links must use http, https, mailto, tel, /, or #.";
  }

  return null;
}
