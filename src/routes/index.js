const express = require("express");
const adminRoute = require("./admin.route");
const blogRoute = require("./blog.route");
const contactUsRoute = require("./contactUs.route");
const userAuthRoute = require("./userAuth.route")
const userRoute = require("./user.route")
const router = express.Router();

const defaultRoutes = [
  {
    path: "/admin",
    route: adminRoute,
  },
  {
    path: "/blog",
    route: blogRoute,
  },
  {
    path: "/contactUs",
    route: contactUsRoute,
  },
  {
    path: "/auth",
    route: userAuthRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
