const { Telegraf } = require('telegraf');
var request = require('request');

const bot = new Telegraf(process.env.BOT_TOKEN);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



const query_structure = {
    "contest": "",
    "questionnumber": "",
    "questionname": "",
}

request.get('https://codeforces.com/api/problemset.problems?tags=binary search', function(error, response, body) {

    if (!error && response.statusCode === 200) {

        const obj = JSON.parse(body);
        console.log(obj.status)

    }

})



bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to my new telegram bot.', {})
})


bot.command('hello', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Hello !  ' + ctx.from.first_name, {})
})


bot.hears('quiz', ctx => {
    console.log(ctx.from)
    ctx.deleteMessage();

    bot.telegram.sendMessage(ctx.chat.id, 'Random topic Select', {

        reply_markup: {
            inline_keyboard: [

                [{
                    text: "Select difficulty",
                    callback_data: 'select difficulty'
                }],

                [{
                    text: "random difficulty",
                    callback_data: 'random difficulty'
                }],


            ]
        }
    })


})







bot.hears('practice', ctx => {
    console.log(ctx.from)
    let animalMessage = `Select topics to solve questions`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, animalMessage, {

        reply_markup: {


            inline_keyboard: [


                [{
                    text: "binary search",
                    callback_data: 'binary_search'
                }],

                [{
                    text: "combinatorics",
                    callback_data: 'combinatorics'
                }],
                [{
                    text: "dfs",
                    callback_data: 'dfs'
                }],
                [{
                    text: "greedy",
                    callback_data: 'greedy'
                }],
                [{
                    text: "dp",
                    callback_data: 'dp'
                }],
                [{
                    text: "strings",
                    callback_data: 'strings'
                }],
                [{
                    text: "sortings",
                    callback_data: 'sortings'
                }],
                [{
                    text: "graphs",
                    callback_data: 'graphs'
                }],
                [{
                    text: "two pointers",
                    callback_data: 'two pointers'
                }],
                [{
                    text: "math",
                    callback_data: 'math'
                }],
                [{
                    text: "hashing",
                    callback_data: 'hashing'
                }],
                [{
                    text: "trees",
                    callback_data: 'trees'
                }],
                [{
                    text: "bitmasks",
                    callback_data: 'bitmasks'
                }],
                [{
                    text: "data structures",
                    callback_data: 'data structures'
                }],

                // new yaha se
                [{
                    text: "constructive algorithms",
                    callback_data: 'constructive agorithms'
                }],

                [{
                    text: "divide and conquer",
                    callback_data: 'divide and conquer'
                }],
                [{
                    text: "dsu",
                    callback_data: 'dsu'
                }],
                [{
                    text: "games",
                    callback_data: 'games'
                }],
                [{
                    text: "geometry",
                    callback_data: 'geometry'
                }],

                [{
                    text: "implementation",
                    callback_data: 'implementation'
                }],
                [{
                    text: "number theory",
                    callback_data: 'number theory'
                }],
                [{
                    text: "trees",
                    callback_data: 'trees'
                }],









            ],


        }
    })
})


bot.action('binary_search', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=binary search', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);



            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {

                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;
                // bot.telegram.sendMessage(ctx.chat.id, input_array[item].questionname);
                bot.telegram.sendMessage(ctx.chat.id, s);
            }
        }

    })



})

bot.action('combinatorics', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=combinatorics', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;

                // console.log(query_structure)

                input_array.push(query_structure);



            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {



                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;
                // bot.telegram.sendMessage(ctx.chat.id, input_array[item].questionname);
                bot.telegram.sendMessage(ctx.chat.id, s);
            }
        }

    })


})


bot.action('dfs', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=dfs and similar', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()

                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;

                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {

                // https://codeforces.com/problemset/problem/1644/E

                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;
                // bot.telegram.sendMessage(ctx.chat.id, input_array[item].questionname);
                bot.telegram.sendMessage(ctx.chat.id, s);
            }
        }
    })







})


bot.action('greedy', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=greedy', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;

                // console.log(query_structure)

                input_array.push(query_structure);



            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {

                // https://codeforces.com/problemset/problem/1644/E

                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;
                // bot.telegram.sendMessage(ctx.chat.id, input_array[item].questionname);
                bot.telegram.sendMessage(ctx.chat.id, s);
            }






        }

    })

})


bot.action('dp', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=dp', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})


bot.action('strings', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=strings', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})


bot.action('sortings', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=sortings', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})

bot.action('graphs', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=graphs', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})

bot.action('two pointers', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=two pointers', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})

bot.action('math', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=math', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})


bot.action('hashing', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=hashing', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})

bot.action('trees', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=trees', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})

bot.action('bitmasks', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=bitmasks', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})



bot.action('data structures', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=data structures', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})





bot.action('constructive algorithms', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=constructive algorithms', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})





bot.action('divide and conquer', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=divide and conquer', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})




bot.action('dsu', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=dsu', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})




bot.action('games', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=games', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})




bot.action('geometry', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=geometry', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})



bot.action('implementation', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=implementation', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})



bot.action('number theory', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=number theory', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})



bot.action('trees', ctx => {

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=trees', function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                const query_structure = new Object()


                query_structure.contest = obj.result.problems[i].contestId;
                query_structure.questionnumber = obj.result.problems[i].index;
                query_structure.questionname = obj.result.problems[i].name;



                input_array.push(query_structure);
            }

            for (let i = 0; i < 10; i++) {
                let mynum = getRandomInt(0, input_array.length - 1);
                if (mySet.has(mynum)) {
                    i--;
                } else {
                    mySet.add(mynum)
                }
            }

            for (let item of mySet) {


                let s = input_array[item].questionname + " " + "https://www.codeforces.com/problemset/problem/" + input_array[item].contest + "/" + input_array[item].questionnumber;

                bot.telegram.sendMessage(ctx.chat.id, s);
            }

        }

    })


})









































bot.launch();






// 5280112309:AAE_S_VFXroTr2ETs2oknCIIU1QXBK59Ixk