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
    bot.telegram.sendMessage(ctx.chat.id, 'Hello there! Welcome to competitive programming practice bot.')

    bot.telegram.sendMessage(ctx.chat.id, 'Type "practice" to start practicing. This will give 10 random questions on a selected topic.')

    bot.telegram.sendMessage(ctx.chat.id, 'Type "quiz" to start quiz. This will give a random question on a selected topic / difficulty.')

    bot.telegram.sendMessage(ctx.chat.id, 'Type "/help" to get information about bot and instructions are also there in description.')



    // bot.telegram.sendMessage(ctx.chat.id, 'Type "/start" to begin.')
})



bot.command('help', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Type "practice" to start practicing. This will give 10 random questions on a selected topic.')

    bot.telegram.sendMessage(ctx.chat.id, 'Type "quiz" to start quiz. This will give a random question on a selected topic / difficulty.')

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
                    callback_data: 'difeasybinary search'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumbinary search'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardbinary search'
                }],


            ]
        }
    })

})

bot.action('difeasybinary search', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Binary search easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=binary search', function(error, response, body) {

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




bot.action('difmediumbinary search', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Binary search medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=binary search', function(error, response, body) {

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




bot.action('difhardbinary search', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Binary search hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=binary search', function(error, response, body) {

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





bot.action('combinatoricsquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasycombinatorics'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumcombinatorics'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardcombinatorics'
                }],


            ]
        }
    })

})





bot.action('difeasycombinatorics', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Combinatorics easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=combinatorics', function(error, response, body) {

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




bot.action('difmediumcombinatorics', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Combinatorics medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=combinatorics', function(error, response, body) {

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




bot.action('difhardcombinatorics', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Combinatorics hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=combinatorics', function(error, response, body) {

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


bot.action('dfsquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasydfs'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumdfs'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difharddfs'
                }],


            ]
        }
    })

})



bot.action('difeasydfs', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'dfs easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=dfs and similar', function(error, response, body) {

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




bot.action('difmediumdfs', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'dfs medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=dfs and similar', function(error, response, body) {

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




bot.action('difharddfs', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'dfs hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=dfs and similar', function(error, response, body) {

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



bot.action('greedyquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasygreedy'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumgreedy'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardgreedy'
                }],


            ]
        }
    })

})



bot.action('greedyeasy', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'greedy easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=greedy', function(error, response, body) {

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




bot.action('difmediumgreedy', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'greedy medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=greedy', function(error, response, body) {

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




bot.action('difhardgreedy', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'greedy hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=greedy', function(error, response, body) {

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


bot.action('dpquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasydp'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumdp'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difharddp'
                }],


            ]
        }
    })

})



bot.action('difeasydp', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'dp easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=dp', function(error, response, body) {

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




bot.action('difmediumdp', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'dp medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=dp', function(error, response, body) {

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




bot.action('difharddp', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'dp hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=dp', function(error, response, body) {

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



bot.action('stringsquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasystrings'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumstrings'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardstrings'
                }],


            ]
        }
    })

})



bot.action('difeasystrings', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'strings easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=strings', function(error, response, body) {

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




bot.action('difmediumstrings', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'strings medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=strings', function(error, response, body) {

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




bot.action('difhardstrings', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'strings hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=strings', function(error, response, body) {

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



bot.action('sortingsquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasysortings'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumsortings'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardsortings'
                }],


            ]
        }
    })

})



bot.action('difeasysortings', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'sortings easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=sortings', function(error, response, body) {

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




bot.action('difmediumsortings', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'sortings medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=sortings', function(error, response, body) {

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




bot.action('difhardsortings', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'sortings hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=sortings', function(error, response, body) {

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



bot.action('graphsquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasygraphs'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumgraphs'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardgraphs'
                }],


            ]
        }
    })

})



bot.action('difeasygraphs', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'graphs easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=graphs', function(error, response, body) {

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




bot.action('difmediumgraphs', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'graphs medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=graphs', function(error, response, body) {

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




bot.action('difhardgraphs', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'graphs hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=graphs', function(error, response, body) {

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


bot.action('two pointersquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasytwo pointers'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumtwo pointers'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardtwo pointers'
                }],


            ]
        }
    })

})



bot.action('difeasytwo pointers', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'two pointers easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=two pointers', function(error, response, body) {

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




bot.action('difmediumtwo pointers', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'two pointers medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=two pointers', function(error, response, body) {

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




bot.action('difhardtwo pointers', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'two pointers hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=two pointers', function(error, response, body) {

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



bot.action('mathquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasymath'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediummath'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardmath'
                }],


            ]
        }
    })

})



bot.action('difeasymath', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'math easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=math', function(error, response, body) {

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




bot.action('difmediummath', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'math medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=math', function(error, response, body) {

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




bot.action('difhardmath', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'math hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=math', function(error, response, body) {

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



bot.action('hashingquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasyhashing'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumhashing'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardhashing'
                }],


            ]
        }
    })

})




bot.action('difeasyhashing', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'hashing easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=hashing', function(error, response, body) {

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




bot.action('difmediumhashing', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'hashing medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=hashing', function(error, response, body) {

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




bot.action('difhardhashing', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'hashing hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=hashing', function(error, response, body) {

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


bot.action('treesquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasytrees'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumtrees'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardtrees'
                }],


            ]
        }
    })

})



bot.action('difeasytrees', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'trees easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=trees', function(error, response, body) {

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




bot.action('difmediumtrees', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'trees medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=trees', function(error, response, body) {

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




bot.action('difhardtrees', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'trees hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=trees', function(error, response, body) {

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



bot.action('bitmasksquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasybitmasks'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumbitmasks'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardbitmasks'
                }],


            ]
        }
    })

})



bot.action('difeasybitmasks', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'bitmasks easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=bitmasks', function(error, response, body) {

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




bot.action('difmediumbitmasks', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'bitmasks medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=bitmasks', function(error, response, body) {

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




bot.action('difhardbitmasks', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'bitmasks hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=bitmasks', function(error, response, body) {

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



bot.action('data structuresquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasydata structures'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumdata structures'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difharddata structures'
                }],


            ]
        }
    })

})



bot.action('difeasydata structures', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'data structures easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=data structures', function(error, response, body) {

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




bot.action('difmediumdata structures', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'data structures medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=data structures', function(error, response, body) {

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




bot.action('difharddata structures', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'data structures hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=data structures', function(error, response, body) {

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



bot.action('constructive algorithsquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasyconstructive algoriths'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumconstructive algoriths'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardconstructive algoriths'
                }],


            ]
        }
    })

})




bot.action('difeasyconstructive algoriths', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'constructive algoriths easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=constructive algoriths', function(error, response, body) {

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




bot.action('difmediumconstructive algoriths', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'constructive algoriths medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=constructive algoriths', function(error, response, body) {

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




bot.action('difhardconstructive algoriths', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'constructive algoriths hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=constructive algoriths', function(error, response, body) {

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



bot.action('divide and conquerquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasydivide and conquer'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumdivide and conquer'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difharddivide and conquer'
                }],


            ]
        }
    })

})




bot.action('difeasydivide and conquer', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'divide and conquer easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=divide and conquer', function(error, response, body) {

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




bot.action('difmediumdivide and conquer', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'divide and conquer medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=divide and conquer', function(error, response, body) {

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




bot.action('difharddivide and conquer', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'divide and conquer hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=divide and conquer', function(error, response, body) {

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




bot.action('dsuquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasydsu'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumdsu'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difharddsu'
                }],


            ]
        }
    })

})



bot.action('difeasydsu', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'dsu easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=dsu', function(error, response, body) {

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




bot.action('difmediumdsu', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'dsu medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=dsu', function(error, response, body) {

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




bot.action('difharddsu', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'dsu hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=dsu', function(error, response, body) {

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





bot.action('gamesquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasygames'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumgames'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardgames'
                }],


            ]
        }
    })

})




bot.action('difeasygames', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'games easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=games', function(error, response, body) {

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




bot.action('difmediumgames', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'games medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=games', function(error, response, body) {

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




bot.action('difhardgames', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'games hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=games', function(error, response, body) {

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




bot.action('geometryquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasygeometry'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumgeometry'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardgeometry'
                }],


            ]
        }
    })

})



bot.action('difeasygeometry', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'geometry easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=geometry', function(error, response, body) {

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




bot.action('difmediumgeometry', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'geometry medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=geometry', function(error, response, body) {

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




bot.action('difhardgeometry', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'geometry hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=geometry', function(error, response, body) {

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




bot.action('implementationquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasyimplementation'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumimplementation'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardimplementation'
                }],


            ]
        }
    })

})



bot.action('difeasyimplementation', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'implementation easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=implementation', function(error, response, body) {

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


bot.action('difmediumimplementation', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'implementation medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=implementation', function(error, response, body) {

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




bot.action('difhardimplementation', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'implementation hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=implementation', function(error, response, body) {

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





bot.action('number theoryquiz', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'Choose difficulty :-', {

        reply_markup: {

            inline_keyboard: [

                [{
                    text: "Easy (800-1300)",
                    callback_data: 'difeasynumber theory'
                }],

                [{
                    text: "Medium (1400-2000)",
                    callback_data: 'difmediumnumber theory'
                }],

                [{
                    text: "Hard (2000+)",
                    callback_data: 'difhardnumber theory'
                }],


            ]
        }
    })

})




bot.action('difeasynumber theory', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'number theory easy :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=number theory', function(error, response, body) {

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




bot.action('difmediumnumber theory', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'number theory medium :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=number theory', function(error, response, body) {

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




bot.action('difhardnumber theory', ctx => {

    bot.telegram.sendMessage(ctx.chat.id, 'number theory hard :-')

    let input_array = []

    const mySet = new Set()

    request.get('https://codeforces.com/api/problemset.problems?tags=number theory', function(error, response, body) {

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