function setup() {
  m = makeMatrix(4,5)
  prettyPrintMatrix(m)
  zeroMatrix(m)
  prettyPrintMatrix(m)
 
}

function checkUnique(string) {
  arr = new Array(256);
  
  for(var i=0; i<string.length; i++) {
    code = string.charCodeAt(i)
    if(code != 32) {
      var content = arr[code];
      if(content == 1) return 0;
      else arr[string.charCodeAt(i)] = 1;
    }
  }
  return 1;
}

function spaceReplace(string) {
  var newstr = string.replace(/ /ig, "%20");
  return newstr;
}

function compressText(string) {
  var count = 0;
  var newstr = [];
  newstr+=string[0]
  for(var i=1; i<string.length; i++) {
    if(string[i] == string[i-1]) count ++;
    else {
      if(count > 0) {
        newstr+=(count+1)+'';
        count = 0;
      }
      newstr+=string[i]
    }
  }
  return newstr
}

function reverseText(string) {
  var newstr = "";
  for(var i=1; i<=string.length; i++) {
    newstr += string[string.length-i]
  }
  return newstr;
}

function makeMatrix(n,m) {
  var matrix = []
  for(var i=0; i<n; i++) {
    var tmparray = []
    for(var g=0; g<m; g++) {
      tmparray.push(round(random(10)))
    }
    matrix.push(tmparray)
  }
  return matrix;
}

function prettyPrintMatrix(matrix) {
  console.log("")
  for(var i=0; i<matrix.length; i++) {
    outstring = ""
    for(var g=0; g<matrix[i].length; g++) {
      outstring+=matrix[i][g]+"  "
    }
    
    console.log(outstring)
  }
}

function zeroMatrix(matrix) {
  problems = []
  for(var i=0; i<matrix.length; i++) {
    for(var g=0; g<matrix[i].length; g++) {
      if(matrix[i][g] === 0) {
        problems.push([i,g])
      }
    }
  }
  
  for(var ii=0; ii<problems.length; ii++) {
   for(var h=0; h<matrix[0].length; h++) {
           matrix[problems[ii][0]][h]=0;
           if (h<matrix.length) matrix[h][problems[ii][1]] = 0;
    }
  }
}