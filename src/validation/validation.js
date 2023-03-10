const authorModel = require("../models/authorModel")
var validator = require('validator')

const mongoose = require('mongoose')


const isValidRequest = function(data){
    if(Object.keys(data).length == 0){
      return false
    }
    return true
  }

  const isValidString = function (value) {
    if (!value) return false;
    if (typeof value === "undefined" || value === null) return false;
    if (value.length === 0) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    else if (typeof value === "string") return true;
  };
  

const isValidName = function(name){
    return /^[a-z A-Z]+$/.test(name)
} 

const isValidTitle = function(title){
    if(["Mr", "Mrs", "Miss"].indexOf(title) == -1)return false
    return true
}

// function for email verification
const isValidMail = function (email) {
    return /^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(email);
};

//function for verifying mobile number
const isValidPhone = function(phone){
    return  /^((\+91(-| )+)|0)?[6-9][0-9]{9}$/.test(phone); 
  };

// function for password verification
const isValidPassword = function (pass) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(pass);
  };

const isValidId = function(id){
    if(!mongoose.Types.ObjectId.isValid(id)){
     return false
    }return true
 }

const isValidPublish = function (publish){
  return /^(true|false|True|False|TRUE|FALSE)$/.test(publish)
}

const isValidPrice = function(rating){
  return  /^([0-9]+\.?[0-9]*)$/.test(rating); 
};

const isValidSize = function(size){
  let existingSize = ["S", "XS","M","X", "L","XXL", "XL"]
  size = size.split(',').map(x=> x.toUpperCase())
  for(i=0; i<size.length; i++){
      if(!(existingSize.includes(size[i].trim()))){
        return false
      }
  }
 return true
}

const isValidValue = function(data){
  if(!data){
    return false
  }
  if(Object.values(data).length == 0) return false
  if(Object.values(data).length > 0){
    const found = Object.values(data).filter((value)=> value);
    if(found.length == 0) return false
  }
  return true
}

module.exports = {  isValidRequest,
    isValidString,
    isValidName,
    isValidMail,
    isValidPhone,
    isValidPassword,
    isValidId,
    isValidTitle,
    isValidPrice,
    isValidSize,
    isValidValue,
    isValidPublish
    }
