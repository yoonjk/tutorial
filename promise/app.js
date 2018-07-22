var promise1 = new Promise(function (resolve, reject) {

	// 비동기를 표현하기 위해 setTimeout 함수를 사용
	setTimeout(function () {

		// 해결됨
		console.log("첫번째 Promise 완료");
		resolve("11111");

	}, Math.random() * 20000 + 1000);
});

var promise2 = new Promise(function (resolve, reject) {

	// 비동기를 표현하기 위해 setTimeout 함수를 사용
	setTimeout(function () {

		// 해결됨
		console.log("두번째 Promise 완료");
		resolve("222222");

	}, Math.random() * 10000 + 1000);
});


Promise.all([promise1, promise2]).then(values => values.forEach((value, i) => {
  	console.log("모두 완료됨", i, value);
}));

// });
