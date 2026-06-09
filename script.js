const jokeText = document.getElementById('joke-text');
const getJokeBtn = document.getElementById('get-joke-btn');
const copyBtn = document.getElementById('copy-btn');
const readBtn = document.getElementById('read-btn');
const loading = document.getElementById('loading');
const errorBox = document.getElementById('error');
const counter = document.getElementById('counter');
let jokesCount = 0;

const chineseJokes = [
    '我昨天去買鞋，店員問我要不要一雙鞋。結果我說：不用，我已經走過來了。',
    '老師問：「為什麼考試要帶計算機？」學生答：「因為腦袋已經滿了。」',
    '早上起床看到鏡子裡的人，覺得今天特別帥，就把他叫醒了。',
    '有一天蚊子問花：「你怎麼總是這麼美？」花回答：「因為我有花粉。」',
    '魚對魚說：「你不要游那麼快，螃蟹在後面追你。」',
    '爸爸問：你長那麼高是因為什麼？孩子答：因為我睡覺長大的。',
    '你知道鹽跟糖最怕什麼嗎？最怕被當成兩個。',
    '有隻牛不會游泳，為什麼？因為他是陸地動物。',
    '小明問媽媽：「我長大可以當什麼？」媽媽答：「你可以當你自己。」',
    '為什麼電腦很怕冷？因為它會變成冰箱。'
];

function readJoke() {
    const text = jokeText.textContent;
    if (!text || text === '按一下按鈕，取得隨機笑話！') {
        errorBox.textContent = '目前沒有要朗讀的笑話。';
        errorBox.style.display = 'block';
        return;
    }

    if (!window.speechSynthesis) {
        errorBox.textContent = '此瀏覽器不支援語音朗讀。';
        errorBox.style.display = 'block';
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-Hant';
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}

function fetchJoke() {
    loading.style.display = 'block';
    errorBox.style.display = 'none';

    const joke = chineseJokes[Math.floor(Math.random() * chineseJokes.length)];
    jokeText.textContent = joke;
    jokesCount += 1;
    counter.textContent = jokesCount;
    loading.style.display = 'none';
    readJoke();
}

getJokeBtn.addEventListener('click', fetchJoke);
readBtn.addEventListener('click', readJoke);
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(jokeText.textContent);
        copyBtn.textContent = '已複製！';
        setTimeout(() => (copyBtn.textContent = '複製笑話'), 1500);
    } catch (err) {
        errorBox.textContent = '無法複製笑話。';
        errorBox.style.display = 'block';
    }
});
