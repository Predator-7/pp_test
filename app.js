const { Telegraf } = require('telegraf');
var request = require('request');

const bot = new Telegraf(process.env.BOT_TOKEN);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


let topiclist = ["binary search", "combinatorics", "dfs and similar", "greedy", "dp", "strings", "sortings", "graphs", "two pointers", "math", "hashing", "trees", "bitmasks", "data structures", "constructive algorithms", "divide and conquer", "dsu", "games", "geometry", "implementation", "number theory", "trees"]



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

// Quiz section :


bot.hears('quiz', ctx => {
    console.log(ctx.from)
    ctx.deleteMessage();

    bot.telegram.sendMessage(ctx.chat.id, 'We provide you guyz two type of quizes :-', {

        reply_markup: {
            inline_keyboard: [

                [{
                    text: "Random Topic",
                    callback_data: 'Random Topic'
                }],

                [{
                    text: "Select Topic",
                    callback_data: 'Select Topic'
                }],


            ]
        }
    })


})

bot.action('Random Topic', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty type :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Select difficulty",
                    callback_data: 'Select difficulty'
                }],

                [{
                    text: "Random difficulty",
                    callback_data: 'Random difficulty'
                }],

            ]
        }
    })

})


bot.action('Select difficulty', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasy'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmedium'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhard'
                }],


            ]
        }
    })

})


bot.action('Random difficulty', ctx => {

    let number = getRandomInt(0, topiclist.length - 1)

    bot.telegram.sendMessage(ctx.chat.id, 'Topic :-' + topiclist[number])

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=' + topiclist[number], function(error, response, body) {

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

            for (let i = 0; i < 1; i++) {
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

// Here we will give 3 bot random difficulty commands for ez , med , hard


bot.action('difeasy', ctx => {

    let number = getRandomInt(0, topiclist.length - 1)

    bot.telegram.sendMessage(ctx.chat.id, 'Topic :-' + topiclist[number])


    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=' + topiclist[number], function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                if (obj.result.problems[i].rating >= 800 && obj.result.problems[i].rating <= 1300) {

                    const query_structure = new Object()


                    query_structure.contest = obj.result.problems[i].contestId;
                    query_structure.questionnumber = obj.result.problems[i].index;
                    query_structure.questionname = obj.result.problems[i].name;



                    input_array.push(query_structure);

                    break;

                }

            }

            for (let i = 0; i < 1; i++) {
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





bot.action('difmedium', ctx => {

    let number = getRandomInt(0, topiclist.length - 1)

    bot.telegram.sendMessage(ctx.chat.id, 'Topic :-' + topiclist[number])


    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=' + topiclist[number], function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                if (obj.result.problems[i].rating >= 1400 && obj.result.problems[i].rating < 2000) {

                    const query_structure = new Object()


                    query_structure.contest = obj.result.problems[i].contestId;
                    query_structure.questionnumber = obj.result.problems[i].index;
                    query_structure.questionname = obj.result.problems[i].name;



                    input_array.push(query_structure);

                    break;

                }

            }

            for (let i = 0; i < 1; i++) {
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





bot.action('difhard', ctx => {

    let number = getRandomInt(0, topiclist.length - 1)

    bot.telegram.sendMessage(ctx.chat.id, 'Topic :-' + topiclist[number])


    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=' + topiclist[number], function(error, response, body) {

        if (!error && response.statusCode === 200) {

            const obj = JSON.parse(body);
            console.log(obj.result.problems.length)

            for (let i = 0; i < obj.result.problems.length; i++) {

                if (obj.result.problems[i].rating >= 2000) {

                    const query_structure = new Object()


                    query_structure.contest = obj.result.problems[i].contestId;
                    query_structure.questionnumber = obj.result.problems[i].index;
                    query_structure.questionname = obj.result.problems[i].name;



                    input_array.push(query_structure);

                    break;

                }

            }

            for (let i = 0; i < 1; i++) {
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




//



bot.action('Select Topic', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose Topic :-', {

        reply_markup: {

            inline_keyboard: [


                [{
                    text: "binary search",
                    callback_data: 'binary_searchquiz'
                }],

                [{
                    text: "combinatorics",
                    callback_data: 'combinatoricsquiz'
                }],
                [{
                    text: "dfs",
                    callback_data: 'dfsquiz'
                }],
                [{
                    text: "greedy",
                    callback_data: 'greedyquiz'
                }],
                [{
                    text: "dp",
                    callback_data: 'dpquiz'
                }],
                [{
                    text: "strings",
                    callback_data: 'stringsquiz'
                }],
                [{
                    text: "sortings",
                    callback_data: 'sortingsquiz'
                }],
                [{
                    text: "graphs",
                    callback_data: 'graphsquiz'
                }],
                [{
                    text: "two pointers",
                    callback_data: 'two pointersquiz'
                }],
                [{
                    text: "math",
                    callback_data: 'mathquiz'
                }],
                [{
                    text: "hashing",
                    callback_data: 'hashingquiz'
                }],
                [{
                    text: "trees",
                    callback_data: 'treesquiz'
                }],
                [{
                    text: "bitmasks",
                    callback_data: 'bitmasksquiz'
                }],
                [{
                    text: "data structures",
                    callback_data: 'data structuresquiz'
                }],

                // new yaha se
                [{
                    text: "constructive algorithms",
                    callback_data: 'constructive agorithmsquiz'
                }],

                [{
                    text: "divide and conquer",
                    callback_data: 'divide and conquerquiz'
                }],
                [{
                    text: "dsu",
                    callback_data: 'dsuquiz'
                }],
                [{
                    text: "games",
                    callback_data: 'gamesquiz'
                }],
                [{
                    text: "geometry",
                    callback_data: 'geometryquiz'
                }],

                [{
                    text: "implementation",
                    callback_data: 'implementationquiz'
                }],
                [{
                    text: "number theory",
                    callback_data: 'number theoryquiz'
                }],
                [{
                    text: "trees",
                    callback_data: 'treesquiz'
                }],

            ]
        }
    })

})







bot.action('binary_searchquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasytopicwise'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumtopicwise'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardtopicwise'
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