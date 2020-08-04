module.exports = {
  title: "Edward McFarlane",
  tagline: "Blog",
  url: "https://emcfarlane.github.io",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "emcfarlane", // Usually your GitHub org/user name.
  projectName: "emcfarlane.github.io", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Edward McFarlane",
      logo: {
        alt: "Pic of me",
        src: "img/edward.png",
      },
      items: [
        {
          href: "https://www.linkedin.com/in/edward-mcfarlane-b5493375/",
          position: "right",
          className: "header-linkedin header-logo",
        },
        {
          href: "https://twitter.com/EdwardMcFarlane",
          position: "right",
          className: "header-twitter header-logo",
        },
        {
          href: "https://www.instagram.com/edwardmcfarlane/",
          position: "right",
          className: "header-instagram header-logo",
        },
        {
          href: "https://github.com/emcfarlane",
          position: "right",
          className: "header-github header-logo",
        },
      ],
      hideOnScroll: false,
    },
    footer: {
      style: "light",
      copyright: `Copyright © ${new Date().getFullYear()} Edward McFarlane.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        blog: {
          path: "blog",
          feedOptions: {
            type: "all",
            copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
          },
          routeBasePath: "/",
          showReadingTime: true,
          editUrl:
            "https://github.com/emcfarlane/emcfarlane.github.io/edit/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
