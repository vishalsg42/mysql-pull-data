const json2xls = require('json2xls');
const XLSX = require('xlsx');
const fs = require('fs');
const { DOC_DIRECTORY, EXCEL_EXTENSION, SHEET_NAME } = require('../../constants/appConstants');

class ExcelBiz {
	read(data, sheet_name = false) {
		return new Promise(async (resolve, reject) => {
			try {
				const SHEET = sheet_name || SHEET_NAME
				if (!data) return reject({ error: 'No data in excel file ' });
				const rows = XLSX.read(data, { type: 'buffer' });
				const sheet = rows.Sheets[SHEET];
				if (!sheet || !Object.keys(sheet).length) {
					console.log('Excel file doesnt not have template sheet');
					return reject({ error: 'Excel file doesnt not have template sheet' });
				}
				const result = XLSX.utils.sheet_to_json(sheet);
				resolve(result);
			} catch (error) {
				return reject(error);
			}
		});
	}

	write(rows) {
		return new Promise(async (resolve, reject) => {
			try {
				if (!rows[0]) return resolve(null);
				const xls = json2xls(rows);
				const name = `${new Date().getTime()}${EXCEL_EXTENSION}`;
				const path = `${DOC_DIRECTORY}/${name}`;
				fs.writeFileSync(path, xls, 'binary');
				resolve({ name, path });
			} catch (error) {
				return reject(error);
			}
		});
	}
	buffer(rows) {
		return new Promise(async (resolve, reject) => {
			try {
				if (!rows[0]) return resolve(null);
				const file = await this.write(rows);
				if (!file) return resolve(null);
				const buffer = fs.createReadStream(file.path);
				fs.unlink(file.path, (err) => { });
				resolve({ name: file.name, buffer })
			} catch (error) {
				return reject(error);
			}
		});
	}
}


module.exports = ExcelBiz;
