const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { blogService } = require("../services");
const ApiError = require("./../utils/ApiError");
const puppeteer = require("puppeteer");
const logger = require("./../config/logger");

const createBlog = catchAsync(async (req, res) => {
  let body = req.body;
  const { _id } = req.user;
  body.createdBy = _id;
  const blog = await blogService.createBlog(body);
  res.status(httpStatus.CREATED).send(blog);
});

const getAllBlog = catchAsync(async (req, res) => {
  let filter = {};
  if (req.query.search) {
    filter = {
      $or: [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ],
    };
  }
  const blog = await blogService.getAllBlog(filter);
  res.status(httpStatus.CREATED).send(blog);
});

const updateBlog = catchAsync(async (req, res) => {
  let body = req.body;
  const { blogId } = req.params;
  const blog = await blogService.updateBlog(body, blogId);
  res.status(httpStatus.CREATED).send(blog);
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const blog = await blogService.getSingleBlog(blogId);
  res.status(httpStatus.CREATED).send(blog);
});

const deleteBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const userId = req.user._id;
  const blog = await blogService.deleteBlog(blogId,userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const favouriteABlog = catchAsync(async (req,res)=>{
  const {blogId} = req.params;
  const { _id } = req.user;
  const blog = await blogService.favouriteABlog(blogId,_id);
  res.status(httpStatus.CREATED).send(blog);

})

const getCandaApiRates = catchAsync(async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    try {
      await page.goto("https://www.oakbankcapital.com/");
      const primeRateText = await page.waitForXPath(
        "/html/body/div/main/header/div[1]/div/div/div/div[2]/div[2]/span/div/div[2]/div[2]/div[2]/a"
      );
      const fiveYearText = await page.waitForXPath(
        "/html/body/div/main/header/div[1]/div/div/div/div[2]/div[2]/span/div/div[2]/div[3]/div[2]/a"
      );
      const tenYearText = await page.waitForXPath(
        "/html/body/div/main/header/div[1]/div/div/div/div[2]/div[2]/span/div/div[2]/div[4]/div[2]/a"
      );
      const primeRate = await primeRateText.evaluate(
        (node) => node.textContent
      );
      const fiveYear = await fiveYearText.evaluate((node) => node.textContent);
      const tenYear = await tenYearText.evaluate((node) => node.textContent);
      let finalResult = {
        primeRate: primeRate,
        fiveYear: fiveYear,
        tenYear: tenYear,
      };
      res.status(httpStatus.CREATED).send(finalResult);
    } finally {
      await browser.close();
    }
  } catch (error) {
    logger.info(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
});


module.exports = {
  createBlog,
  getAllBlog,
  updateBlog,
  getSingleBlog,
  deleteBlog,
  favouriteABlog,
  getCandaApiRates
};
