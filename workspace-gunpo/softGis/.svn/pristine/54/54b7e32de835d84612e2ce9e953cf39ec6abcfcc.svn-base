class FileReaderAsync {
	constructor() {
		this.reader = new FileReader;
	}

	read(method, file, encoding='utf-8') {
		return new Promise((resolve, reject) => {
			this.reader.onload = e => resolve(e.target.result);
			this.reader.onerror = reject;
			this.reader[method](file, encoding);
		});
	}

	readAsArrayBuffer(file, encoding) {
		return this.read('readAsArrayBuffer', file, encoding);
	}

	readAsBinaryString(file, encoding) {
		return this.read('readAsBinaryString', file, encoding);
	}

	readAsDataURL(file, encoding) {
		return this.read('readAsDataURL', file, encoding);
	}

	readAsText(file, encoding) {
		return this.read('readAsText', file, encoding);
	}
}

export default FileReaderAsync;