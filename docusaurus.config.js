module.exports = {
  title: "Edward McFarlane",
  tagline: "Blog",
  url: "https://afking.github.io",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "afking", // Usually your GitHub org/user name.
  projectName: "afking.github.io", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Edward McFarlane",
      logo: {
        alt: "Pic of me",
        src: "img/edward.png",
      },
      links: [
        {
          href: "https://www.linkedin.com/in/edward-mcfarlane-b5493375/",
          position: "right",
          className: ["header-linkedin", "header-logo"],
        },
        {
          href: "https://twitter.com/EdwardMcFarlane",
          position: "right",
          className: ["header-twitter", "header-logo"],
        },
        {
          href: "https://www.instagram.com/edwardmcfarlane/",
          position: "right",
          className: ["header-instagram", "header-logo"],
        },
        {
          href: "https://github.com/afking",
          position: "right",
          className: ["header-github", "header-logo"],
        },
      ],
    },
    footer: {
      style: "light",
      copyright: `Copyright © ${new Date().getFullYear()} Edward McFarlane. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        blog: {
          path: "blog",
          routeBasePath: "/",
          showReadingTime: true,
          editUrl: "https://github.com/afking/afking.github.io/edit/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
