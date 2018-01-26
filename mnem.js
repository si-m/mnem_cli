#!/usr/bin/env babel-node
import {readFilePromise, saver}  from './fileFunctions'
import cipher 									 from './cipher.js'
import inquirer 								 from 'inquirer-promise'
import program 									 from 'commander'

//Mnemonic simple app to encrypt and decrypt txt files.
program
	.version('0.1.0')
	.description('Mnemonic cipher app to encrypt and decrypt text files.')
  .usage('<command> <path>')
  .command('<encrypt> <path>', 'Encrypt a file')
  .command('<decrypt> <path>',	'Decrypt a file')

program.parse(process.argv)

if(program.args[0] === undefined){
	console.log("No command given!")
	process.exit(1)
}

if(program.args[1] === undefined){
	console.log("No path to file given!")
	process.exit(1)
}

const action = program.args[0]

console.log(action[0].toUpperCase() + action.substring(1))

const pathValue = program.args[1]

//ask for password
let passPromise = inquirer
  .prompt([
    {
      type: 'password',
      message: 'Enter your password',
      name: 'password',
      mask: '*'
    }
  ])

//read file
let filePromise = readFilePromise(pathValue)

let data = ''
//wait for promises to complete
Promise.all([passPromise, filePromise]).then(values =>{
	saver(cipher[action](values[0].password, values[1]), action, pathValue).then(result => console.log(result))
}, reason => {
  console.log(reason)
})
// console.log(encrypt("hola", "este es un mensaje"))

// console.log(decrypt("hola","803842a39f76ece392646321618a357f07d5"))

