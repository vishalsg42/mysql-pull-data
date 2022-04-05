const QUERY_REPO = require("../constants/queryRepo");
const mysql = require("../db/mysql");
const ExcelBiz = require("./helpers/excel.biz");

class PublicationBiz {
  constructor() {
    this.excelBiz = new ExcelBiz();
  }
  generate() {
    try {
      // execute queries here
      // mysql.execute(QUERY_REPO.sql.SELECT)
      // businness logic
    } catch (error) {
      console.log("error", error);
    }
  }
}

module.exports = PublicationBiz;