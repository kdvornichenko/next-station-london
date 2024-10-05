export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Game",
      href: "/game",
    },
    {
      label: "Private",
      href: "/private",
    },
    {
      label: "Error",
      href: "/error",
    },
    {
      label: "Login",
      href: "/login",
    },
  ],
};
