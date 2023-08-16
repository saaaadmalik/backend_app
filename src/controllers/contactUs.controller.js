const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { contactUsService, emailService } = require("../services");
const contactUsTemplate = require("./../templates/contactUsTemplate");

const createContactUs = catchAsync(async (req, res) => {
  let body = req.body;
  const blog = await contactUsService.createContactUs(body);
  let template = contactUsTemplate(body);
  emailService.sendEmail(process.env.EMAIL_FROM, "Contact Us Email", template);
  res.status(httpStatus.CREATED).send(blog);
});

module.exports = {
  createContactUs,
};
