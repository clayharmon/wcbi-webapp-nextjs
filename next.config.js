const env = process.env.NODE_ENV;
const imageSetup = {
  development: {
    loader: "default",
    domains: ["www.wcbi.com"],
  },
  production: {
    loader: "cloudinary",
    path: "https://res.cloudinary.com/rwrwdf/image/fetch/",
    domains: ["res.cloudinary.com"],
  },
};

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: imageSetup[env],
};
