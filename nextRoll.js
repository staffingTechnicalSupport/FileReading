
main();

function main(){
//to start our application

let fileName = "sample.txt";
let fileRoute = "./";
let characters = ['1','0'];
let charactersToIgnore= ['\n', '\r'];

let charCount = countOccurrences(characters,charactersToIgnore,fileRoute+fileName);

//just for debugging
console.log(charCount);

}

/*
  receives an array of characters to track, a list of characters to ignore and the route of the file
*/
function countOccurrences(characters,ignored,file){
  let currentCharacter = '';
  let currentOccurrenceCount = 0;
  let result = new Map();

  //map input into result
  //the key will be the Character, the value a structre containing char,charCount,occurrences
  characters.forEach(e=> {
                              result.set(e,{"number":e,
                                      "largest_amount":0,
                                      "how_many_times": 0});
                                    });

  //just for debugging
  console.log(result);

  //read line until end of fileName
  var fs = require('fs');
  var text = fs.readFileSync(file).toString();

  text.split('').forEach(e => {
                              if(!ignored.includes(e)){
                                //If it's not in the ignore list AND it has a value in result DO SOMETHING
                                if(currentCharacter === e){
                                  //we continue with the same char
                                  currentOccurrenceCount++;
                                }else{
                                  //change in characters
                                  let storedValue = result.get(currentCharacter);
                                  //check if sequence is larger than the one in store
                                  if(!storedValue){
                                    //we are not tracking this character, so we do nothing

                                  }else if(currentOccurrenceCount> storedValue.largest_amount){
                                    //new max
                                    storedValue.largest_amount = currentOccurrenceCount;
                                    storedValue.how_many_times = 1;
                                  }else if (currentOccurrenceCount=== storedValue.largest_amount) {
                                    //add repetition
                                    storedValue.how_many_times++;
                                  }

                                  //restart vars
                                  currentCharacter = e;
                                  currentOccurrenceCount = 1;
                                }
                              }
  })
  return result.values();
}
