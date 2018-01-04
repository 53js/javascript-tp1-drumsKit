console.log('----- Assignment 1 -----');
console.log('\n______________________');
console.log('####### PART I #######');
console.log('----------------------');

function printArray(arrayObj) {
    arrayObj.forEach(function(o, i) {
        console.log('[index : ' + i + ']');
        console.log('\t id : ' + o.id);
        console.log('\t name : ', o.name);
        console.log('\t color : ' + o.color);
        console.log('\t key : ' + o.key);
        console.log('\t url : ');
        console.log('\t\t url.path : ', o.url.path);
        console.log('\t\t url.filenames : ', o.url.filenames);
    });
}

printArray(drumsKit);


// Small utility function, for printing an array with a "label"
function printArrayLabel(label, arrayObj) {
    console.log('\n====== ' + label + ' ======');
    printArray(arrayObj);
}


//version2
function printArray2(arrayObj) {
    arrayObj.forEach(function(obj, i) {
        console.log('[index : ' + i + ']');
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                console.log('\t ' + key + ' : ', obj[key]);
            }
        }
    });
}

// version 3
function printArray3(array) {
    for (let i = 0 ; i < array.length ; i++){
        console.log('[index : ' + i + ' ]');

		// Object.entries ==> [['id', 1], ['color', 'blue'] ...]
        Object.entries(array[i]).forEach(([key, value]) => {
            if (typeof value !== 'object'){
                console.log('\t'+ key + ' :  ' + value);
            }
            else {
                Object.entries(value).forEach(([key2, value2]) => {
                	console.log('\t\t' + key +'.'+ key2 + ' :  ' + value2);
                });
            }
        });
    }
}


/*FIND BY*/

//version 1.1 with for loop
function findBy1(arr, property, value) {
    let results = [];
    for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        if (obj[property] === value) {
            results.push(obj);
        }
    }
    return results;
}

//version 1.2 with forEach loop
function findBy2(arr, prop, val) {
    let results = [];
    arr.forEach(function(obj) {
        if (obj[prop] === val) {
            //console.log(obj);
            results.push(obj);
        }
    });
    return results;
}

//version 3 with filter
function findBy3(arr, property, value) {
	let result = arr.filter(function(obj) {
        return (obj[property] === value);
    });
    return result;
}

//version 4 Ninja
function findBy4(arr, property, value) {
    return arr.filter(obj => obj[property] === value);
}



//examples findby
/*
printArrayLabel('#findBy# (id 1)' , findBy1(drumsKit, 'id', 1));
printArrayLabel('#findBy# (color blue)' , findBy1(drumsKit, 'color', 'blue'));
printArrayLabel('#findBy# (color pink)\n' , findBy1(drumsKit, 'color', 'pink'));
*/


let id1Drum = findBy1(drumsKit, 'id', 1);

let blueDrums = findBy1(drumsKit, 'color', 'blue');

let pinkDrums = findBy1(drumsKit, 'color', 'pink');


console.log('Drum with id 1 ');
console.log(id1Drum);
console.log('\n drums with color blue');
console.log(blueDrums);
console.log('\n drums with color pink');
console.log(pinkDrums);



console.log('\n______________________');
console.log('####### PART II #######');
console.log('----------------------');


function Drum(_id, _name, _color, _key, _url) {
    this.id = _id;
    this.name = _name;
    this.url = _url;
    this.color = _color;
    this.key = _key;
}
let myDrum = new Drum(10, 'myDrum', 'purple', 'Z', {
    path: 'fakePath',
    filenames: []
});

console.log('myDrum >>', myDrum);


//add an object to the arr and set the id
function addItem(arr, drum) {
    arr.push(drum);
}


console.log("Adding myDrum to the drumkits array");
addItem(drumsKit, myDrum);
printArrayLabel("PRINT drumkits", drumsKit);



console.log('\n\n_________________________________');
console.log('####### PART III[ADVANCED] #######');
console.log('-----------------------------------');


console.log('\n>>>>>>> A - SORT\n');

function compareById(object1, object2) {
    if (object1.id > object2.id) {
        return 1;
    } else if (object1.id < object2.id) {
        return -1;
    }
    return 0;
}

//version 2 (shortcut)
function compareById2(object1, object2) {
    return object1.id - object2.id; //because we know id <=> number
}

//example: sort by id
printArrayLabel('SORT by id', drumsKit.sort(compareById));



console.log('\n>>>>>>> A - SORT GENERIC\n');

function getComparator(prop) {
    return function(object1, object2) {
        if (object1[prop] > object2[prop]) {
            return 1;
        } else if (object1[prop] < object2[prop]) {
            return -1;
        }
        return 0;
    };
}

//examples:
let compareByName = getComparator('name');
printArrayLabel('SORT by Name', drumsKit.sort(compareByName));

let compareByColor = getComparator('color');
printArrayLabel('SORT by color >>', drumsKit.sort(compareByColor));



console.log('\n>>>>>>> B - REMOVE\n');


/*Remove by passing an id as argument*/

function removeById(arr, id) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].id == id) { //we found the obj
			arr.splice(i, 1); //we remove the object
			return; //then we "break", "return"
		}
	}
}

function removeByObject(arr, obj) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == obj) { //we found the obj
			arr.splice(i, 1); //we remove the object
			return; //then we "break", "return"
		}
	}
}

function remove(arr, idOrObject) {
	if (typeof idOrObject == 'number') {
		removeById(arr, idOrObject);
	} else if (typeof idOrObject === 'object') {
		removeByObject(arr, idOrObject);
	} else {
		console.log("second arg is of unauthorized type");
	}
}

//shortCut version with indexOf
function removeByObject2(arr, obj) {
    let index = arr.indexOf(obj);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

// Safa Version
function removeV2(array, item){
	let res = [];
	if (isNaN(item)){
		// item = object
		res = array.filter(element => element.id !== item.id);
	} else{
		// item = id
   		res = array.filter(element => element.id !== item);
  	}
	return res;
}

// <==>
function removeV2bis(arr, item){
	return arr.filter(elem => elem.id !== isNaN(item) ? item : item.id);
}


console.log("Removing element with id 1 from drumsKit");
remove(drumsKit, 1);
printArrayLabel("new DrumsKit >>", drumsKit);

console.log("\nRemoving element myDrums");
remove(drumsKit, myDrum);
printArrayLabel("new DrumsKit >>", drumsKit);

console.log("\nRemoving: trying a bad argument");
remove(drumsKit, 'hello');


console.log('end');
