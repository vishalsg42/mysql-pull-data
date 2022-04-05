const PublicationBiz = require("./biz/publication.biz");
async function main() {
  try {
    const publicationBiz = new PublicationBiz();
    await publicationBiz.generate();
  } catch (error) {
    console.log("error");
  }
}

main()
  .then(() => {
    console.log("======= Sucessfully executed the script ======\n");
    process.exit(1);
  })
  .catch((err) => {
    console.log("index file", err);
    process.exit(1);
  })