
const _ = require('lodash');

// array
for (const value of ['a1','a2','a3','a4','a5']) {
  console.log(`array value:${value}`)
}

// array index
for (const index of ['a1','a2','a3','a4','a5'].keys()) {
  console.log(`array value:${index}`)
}

// array index
for (const [index, value] of ['a1','a2','a3','a4','a5'].entries()) {
  console.log(`array value:${index}=>${value}`)
}

var obj = { a: 'foo', z: 'bar', m: 'baz' };
Object.keys(obj).forEach(key => {
    var value = obj[key];
    console.log(`object.keys:${value}`);
});

var lunch = {
	sandwich: 'turkey',
	chips: 'Cape Cod',
	snack: 'Cookies',
	drink: 'Pepsi',
	calories: 325,
	picnic: true
};

for (var key in lunch) {
	if (lunch.hasOwnProperty(key)) {
		console.log(`in loop ${key}`); // key (ex. sandwich)
		console.log(`in lunch[${key}]:${lunch[key]}`); // value (ex. turkey)
	}
}

const obj1 = {
    firstName: 'John',
    lastName: 'Doe',
    age: 50,
    eyeColor: 'blue'
};

_.forEach(obj1, (value, key) => {
  console.log(`_.forEach key:${key}, value:${value}`)
});

for (const [key, value] of Object.entries(obj1)) {
  console.log(`Object.entries ${key}: ${value}`);
}

for (const key of Object.keys(obj1)) {
  console.log(`Object.key ${key}: ${obj1[key]}`);
}

Object.entries(obj1).forEach(entry => {
  const [key, value] = entry;
  console.log(`Object.entries ${key}: ${value}`);
})

const rows = 
{ outBinds:  '',
  rowsAffected: '',
  metaData: [ { name: 'COL1' }, { name: 'COL2' }, { name: 'COL3' } ],
  rows: 
   [ [ 'u01', 'jaeguk', 'test01' ],
     [ 'u02', 'jaeguk', 'test02' ],
     [ '123', 'kildong', 'col2' ],
     [ '123', 'kildong', 'col2' ],
     [ '12', 'kildong', 'col1' ],
     [ '123', 'kildong', 'col2' ],
     [ '123', 'kildong', 'col2' ],
     [ '12', 'kildong', 'col1' ],
     [ '123', 'kildong', 'col2' ],
     [ '123', 'kildong', 'col2' ],
     [ '12', 'kildong', 'col1' ] ] }



for (const [key, value] of Object.entries(rows.metaData)) {
  const {name, val} = rows.metaData[key];
  console.log('val:', name)
  console.log(`Object.key==== ${key}: ${rows.metaData[key]}, value:${value}, name:${name}`);
}  
