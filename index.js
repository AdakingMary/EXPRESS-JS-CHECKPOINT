import express from "express";
import fs from "fs";

const app = express();
const port = 4000;

app.use((req, res, next) => {
  const timeOfDay = new Date().getHours();
  const dayOfWeek = new Date().getDay();

  if (timeOfDay < 9 || timeOfDay > 16 || dayOfWeek === 0 || dayOfWeek === 6) {
    res.send("Our office is not open now");
  } else {
    next();
  }
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  const homepageContent = fs.readFileSync("./Public/homepage.html", "utf8");
  res.send(homepageContent);
});

app.get("/services", (req, res) => {
  const ourserviceContent = fs.readFileSync(
    "./Public/ourservices.html",
    "utf8"
  );
  res.send(ourserviceContent);
});

app.get("/contact", (req, res) => {
  const contactusContent = fs.readFileSync("./Public/contact-us.html", "utf8");
  res.send(contactusContent);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
