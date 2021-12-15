const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'

const CHAR_MAP = {};

ALPHABET.split("").forEach((v, i) => {
  CHAR_MAP[v] = i;
});



/**
 * Method to convert radix64 value to base 10 number
 * @param {*} radix64String 
 * @returns 
 */
function radix64ToInt( radix64String ) {

    let base10number = 0
    let chars = radix64String.split('').reverse();
    for(let i = 0; i < chars.length; i++){
        base10number += CHAR_MAP[chars[i]] * Math.pow(64, i)
    }
    return base10number
}

/**
 * Method to convert base10 number to radix64 value
 * @param {*} base10Number 
 * @returns 
 */
function intToRadix64( base10Number ){
    let chars = []
    let q = base10Number
    while(q > 0){
        let r = q % 64;
        chars.push(ALPHABET.charAt(r))
        q = parseInt(q/64)
    }
    return chars.reverse().join('')
}

module.exports = {
    radix64ToInt,
    intToRadix64
}

// console.log(radix64ToInt('a'))
