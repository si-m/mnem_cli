import aesjs  from 'aes-js'
import crypto from 'crypto'

 
exports.encrypt = (password, salt, message) => {
	if(!password || !salt){
		return "Error salt or password missing"
	}
	const _key 	= new Buffer(password)
	const _salt = new Buffer(salt)
	// Key derivation function PBKDF2
	const derivedKey = crypto.pbkdf2Sync(_key, _salt, 10000, 32, 'sha512')
	// text to Bytes
	const textBytes = aesjs.utils.utf8.toBytes(message)
	// AES instanced
	const aesCtr = new aesjs.ModeOfOperation.ctr(derivedKey, new aesjs.Counter(5))
	//encrypt
	const encryptedBytes = aesCtr.encrypt(textBytes)

	//converts from Bytes to Hex
	return aesjs.utils.hex.fromBytes(encryptedBytes)
	
}

exports.decrypt = (password, salt, encryptedMessage) => {
	//Converts from Hex to Bytes
	const encryptedBytes = aesjs.utils.hex.toBytes(encryptedMessage)
	// decrypt a new instance must be instantiated. 
	const aesCtr = new aesjs.ModeOfOperation.ctr(derivedKey, new aesjs.Counter(5))

	// decrypt a new instance must be instantiated. 
	const decryptedBytes = aesCtr.decrypt(encryptedBytes)
	
  // Convert our bytes back into text 
	return aesjs.utils.utf8.fromBytes(decryptedBytes) 
}