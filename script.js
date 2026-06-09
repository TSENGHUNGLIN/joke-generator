const jokeText = document.getElementById('joke-text');
const getJokeBtn = document.getElementById('get-joke-btn');
const copyBtn = document.getElementById('copy-btn');
const readBtn = document.getElementById('read-btn');
const errorBox = document.getElementById('error');
const counter = document.getElementById('counter');
let jokesCount = 0;
let lastJokeIndex = -1;

const chineseJokes = [
    '我昨天去買鞋，店員問我要不要一雙鞋。結果我說：不用，我已經走過來了。',
    '老師問：「為什麼考試要帶計算機？」學生答：「因為腦袋已經滿了。」',
    '早上起床看到鏡子裡的人，覺得今天特別帥，就把他叫醒了。',
    '有一天蚊子問花：「你怎麼總是這麼美？」花回答：「因為我有花粉。」',
    '魚對魚說：「你不要游那麼快，螃蟹在後面追你。」',
    '爸爸問：你長那麼高是因為什麼？孩子答：因為我睡覺長大的。',
    '你知道鹽跟糖最怕什麼嗎？最怕被當成兩個。',
    '小明問媽媽：「我長大可以當什麼？」媽媽答：「你可以當你自己。」',
    '為什麼電腦很怕冷？因為它會當機。',
    '小美問：「為什麼你總是帶著傘？」小華答：「因為我不想被說沒準備。」',
    '醫生對病人說：「你需要多運動。」病人說：「我每天都在追公車啊。」',
    '為什麼書本總是很重？因為知識是有重量的。',
    '小明考試考了零分，媽媽問怎麼回事，小明說：「老師說要誠實，我就誠實地不會了。」',
    '蝸牛爬上樹，下面的蚯蚓問：「你要去哪？」蝸牛說：「我要去看世界。」蚯蚓說：「加油，大概要三年。」',
    '貓問狗：「你為什麼舌頭總是吊出來？」狗說：「我在思考人生。」',
    '阿明說他很節省，問他怎麼做到的，他說：「我從來不買明天用不到的東西。」然後他指著沙發說：「這個椅子十年前就壞了。」',
    '一隻螞蟻爬上大象說：「讓我來扛你吧。」大象笑了，結果摔倒了。',
    '問：世界上哪種動物最守時？答：準時下班的鬧鐘。',
    '老闆問員工：「你能不能早點來？」員工說：「可以，但我需要更早睡。」老闆說：「那晚點下班吧。」',
    '小孩問爸爸：「為什麼天空是藍色的？」爸爸說：「因為如果是粉紅色，就會有很多人來拍照。」',
    '廚師做了一道菜，客人說：「味道很特別，請問是什麼食材？」廚師說：「昨天剩下的。」',
    '程式設計師的老婆說：「去買一瓶牛奶，如果有雞蛋就買六個。」程式設計師回來帶了六瓶牛奶。',
    '牙醫對病人說：「你要好好刷牙，不然牙齒會掉光。」病人說：「那就不用刷了嗎？」',
    '問：為什麼數學課本那麼難？答：因為裡面有太多問題了。',
    '小明問老師：「老師，昨天的作業我不會寫，怎麼辦？」老師說：「那你應該昨天就來問我。」小明說：「昨天你又不在。」',
    '兩個人在爭論誰比較懶，最後一個人說：「好吧，你贏了。」另一個說：「謝謝，但你幫我去領獎嗎？」',
    '問：章魚最喜歡什麼運動？答：拳擊，因為牠有八隻手。',
    '老師：「班上最聰明的人站起來。」全班都站了起來，只有小明坐著。老師問：「為什麼你不站？」小明說：「我覺得讓老師也能站一下比較公平。」',
    '朋友問：「你怎麼這麼快就看完那本書？」我說：「我跳過了所有的字。」',
    '問：為什麼雞要過馬路？答：因為牠不想再被說是在問題裡的雞了。',
];

function getRandomJokeIndex() {
    if (chineseJokes.length === 1) return 0;
    let index;
    do {
        index = Math.floor(Math.random() * chineseJokes.length);
    } while (index === lastJokeIndex);
    return index;
}

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
    const voices = speechSynthesis.getVoices();
    const zhVoice = voices.find(v => v.lang.startsWith('zh'));
    if (zhVoice) utterance.voice = zhVoice;
    utterance.lang = 'zh-TW';
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}

function fetchJoke() {
    errorBox.style.display = 'none';
    const index = getRandomJokeIndex();
    lastJokeIndex = index;
    jokeText.textContent = chineseJokes[index];
    jokesCount += 1;
    counter.textContent = jokesCount;
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
