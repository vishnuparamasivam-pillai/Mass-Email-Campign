function getvalues(responseapex){
  let allvalues = new Map();
  for(var i = 1; i < responseapex.split('**').length; i++) {
    if(responseapex.split('**')[i].length < 10){
      allvalues.set( responseapex.split('**')[i] , getfldname(responseapex.split('**')[i+1]));
    } 
  }
  return allvalues
}

function getfldname(responsedata){
  let fldvalues = new Map();
  for(var i = 1; i < responsedata.split('@@').length; i++) {
    fldvalues.set(responsedata.split('@@')[i],getvalname(responsedata.split('@@')[i+1]));
    i = i+1;
  }
  return fldvalues;
}

function getvalname(valdata){
  let valvalues = new Map();
  for(var i = 0; i < valdata.split('++').length; i++) {
    if(valdata.split('++')[i].length == null || valdata.split('++')[i] == '][' || valdata.split('++')[i] == '' || valdata.split('++')[i] == '])' || valdata.split('++')[i] == '(['){
      
    }
    else{
      valvalues.set(valdata.split('++')[i],valdata.split('++')[i]);
    }
  }
  return valvalues;
}

function optionmaker(data){
    let dictvalue = [];
    for(var i=0; i < data.length ; i++){
      let eachval = data[i].split('^-^');
        let value = {'label': eachval[1], 'value': eachval[0]}
        dictvalue.push(value);
    }
    return dictvalue;
}

export { getvalues,optionmaker };