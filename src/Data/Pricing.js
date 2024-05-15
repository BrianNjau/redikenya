// Data

const pricingDataMonth = [
  {
    icon: "line-icon-Boy",
    title: "Basic",
    subtitle: "",
    price: "$9.99",
    term: "monthly rolling",
    plans: [
      `<strong>5</strong> Domains`,
      `<strong>2 GB</strong> File upload`,
      `<strong>20 GB</strong> Secure storage`,
    ],
    buttonTitle: "Register now",
    buttonLink: "/page/pricing-packages",
  },
  {
    icon: "line-icon-Business-ManWoman",
    title: "STANDARD ",
    subtitle: "MOST POPULAR",
    price: "$19.99",
    term: "monthly rolling",
    plans: [
      `<strong>10</strong> Domains`,
      `<strong>2 GB</strong> File upload`,
      `<strong>40 GB</strong> Secure storage`,
    ],
    buttonTitle: "Register now",
    buttonLink: "/page/pricing-packages",
    popular: {
      isPopular: true,
    },
  },
  {
    icon: "line-icon-Business-Mens",
    title: "PREMIUM ",
    subtitle: "",
    price: "$29.99",
    term: "monthly rolling",
    plans: [
      `<strong>20</strong> Domains`,
      `<strong>4 GB</strong> File upload`,
      `<strong>60 GB</strong> Secure storage`,
    ],
    buttonTitle: "Register now",
    buttonLink: "/page/pricing-packages",
  },
];

const pricingDataYear = [
  {
    icon: "line-icon-Boy",
    title: "BASIC PLAN",
    subtitle: "Basic features",
    price: "$90.99",
    term: "yearly",
    plans: [
      `<strong>5</strong> Domains`,
      `<strong>2 GB</strong> File upload`,
      `<strong>20 GB</strong> Secure storage`,
      `<strong>Unlimited</strong> bandwidth`,
    ],
    buttonTitle: "Register now",
    buttonLink: "/page/pricing-packages",
  },
  {
    icon: "line-icon-Business-ManWoman",
    title: "STANDARD PLAN",
    subtitle: "MOST POPULAR",
    price: "$199.99",
    term: "yearly",
    plans: [
      `<strong>10</strong> Domains`,
      `<strong>2 GB</strong> File upload`,
      `<strong>40 GB</strong> Secure storage`,
      `<strong>Unlimited</strong> bandwidth`,
    ],
    buttonTitle: "Register now",
    buttonLink: "/page/pricing-packages",
    popular: {
      isPopular: true,
    },
  },
  {
    icon: "line-icon-Business-Mens",
    title: "PREMIUM PLAN",
    subtitle: "ALL YOU MAY NEED",
    price: "$290.99",
    term: "yearly",
    plans: [
      `<strong>20</strong> Domains`,
      `<strong>4 GB</strong> File upload`,
      `<strong>60 GB</strong> Secure storage`,
      `<strong>Unlimited</strong> bandwidth`,
    ],
    buttonTitle: "Register now",
    buttonLink: "/page/pricing-packages",
  },
];

export { pricingDataMonth, pricingDataYear };
