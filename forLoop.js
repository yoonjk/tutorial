

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
