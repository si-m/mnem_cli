import fs 	from 'fs'
import path from 'path'
exports.readFilePromise = (path) =>{
	return new Promise((resolve, reject) =>{
		fs.readFile(path, 'utf8', (err, data) => {
		  err ? reject(err) : resolve(data);
		})
	})
}

exports.saver =  (data, prefix, originalName) =>{
	return new Promise((resolve, reject) =>{
		fs.writeFile(path.join(__dirname, prefix+'ed_'+originalName) , data, (err) =>{ err ? reject(err) : resolve("The file was saved!")})
	})
}