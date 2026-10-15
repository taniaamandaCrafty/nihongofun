const hiragana = [
['あ','a'],['い','i'],['う','u'],['え','e'],['お','o'],['か','ka'],['き','ki'],['く','ku'],['け','ke'],['こ','ko'],
['さ','sa'],['し','shi'],['す','su'],['せ','se'],['そ','so'],['た','ta'],['ち','chi'],['つ','tsu'],['て','te'],['と','to'],
['な','na'],['に','ni'],['ぬ','nu'],['ね','ne'],['の','no'],['は','ha'],['ひ','hi'],['ふ','fu'],['へ','he'],['ほ','ho'],
['ま','ma'],['み','mi'],['む','mu'],['め','me'],['も','mo'],['や','ya'],['ゆ','yu'],['よ','yo'],['ら','ra'],['り','ri'],
['る','ru'],['れ','re'],['ろ','ro'],['わ','wa'],['を','o*'],['ん','n']
];
const katakana = [
['ア','a'],['イ','i'],['ウ','u'],['エ','e'],['オ','o'],['カ','ka'],['キ','ki'],['ク','ku'],['ケ','ke'],['コ','ko'],
['サ','sa'],['シ','shi'],['ス','su'],['セ','se'],['ソ','so'],['タ','ta'],['チ','chi'],['ツ','tsu'],['テ','te'],['ト','to'],
['ナ','na'],['ニ','ni'],['ヌ','nu'],['ネ','ne'],['ノ','no'],['ハ','ha'],['ヒ','hi'],['フ','fu'],['ヘ','he'],['ホ','ho'],
['マ','ma'],['ミ','mi'],['ム','mu'],['メ','me'],['モ','mo'],['ヤ','ya'],['ユ','yu'],['ヨ','yo'],['ラ','ra'],['リ','ri'],
['ル','ru'],['レ','re'],['ロ','ro'],['ワ','wa'],['ヲ','o*'],['ン','n']
];
function fillKana(id, data){document.getElementById(id).innerHTML=data.map(([c,r])=>`<button class="kana-card" onclick="this.classList.toggle('selected');this.querySelector('span').textContent=this.classList.contains('selected')?'dibaca ${r}':'${r}'"><b>${c}</b><span>${r}</span></button>`).join('')}
fillKana('hiraganaGrid',hiragana); fillKana('katakanaGrid',katakana);
function showPage(id){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active');window.scrollTo({top:0,behavior:'smooth'});if(id==='game')startGame();if(id==='quiz')renderQuiz()}
function toggleTheme(){document.body.classList.toggle('dark')}
const gameQuestions=[
{c:'山',q:'Apa arti Kanji ini?',a:'Gunung',opts:['Air','Gunung','Pohon','Orang'],why:'山 dibaca yama, artinya gunung.'},
{c:'あ',q:'Bagaimana cara membaca Hiragana ini?',a:'A',opts:['A','I','U','O'],why:'あ dibaca a.'},
{c:'ア',q:'Ini termasuk sistem tulisan apa?',a:'Katakana',opts:['Hiragana','Katakana','Kanji','Romaji'],why:'ア adalah Katakana untuk bunyi a.'},
{c:'ねこ',q:'Apa arti kata neko?',a:'Kucing',opts:['Kucing','Buku','Sekolah','Teman'],why:'ねこ (neko) berarti kucing.'},
{c:'水',q:'Apa arti Kanji mizu?',a:'Air',opts:['Api','Bulan','Air','Matahari'],why:'水 dibaca mizu, artinya air.'}
];let gameIndex=0,gameScore=0,gameLocked=false;
function startGame(){gameIndex=0;gameScore=0;gameLocked=false;renderGame()}
function renderGame(){const q=gameQuestions[gameIndex];document.getElementById('gameCount').textContent=`Pertanyaan ${gameIndex+1} dari ${gameQuestions.length}`;document.getElementById('gameScore').textContent=`⭐ Skor: ${gameScore}`;document.getElementById('gameBar').style.width=((gameIndex+1)/gameQuestions.length*100)+'%';document.getElementById('gameChar').textContent=q.c;document.getElementById('gameQuestion').textContent=q.q;document.getElementById('gameFeedback').textContent='';document.getElementById('gameNext').classList.add('hidden');document.getElementById('gameAnswers').innerHTML=q.opts.map(o=>`<button class="answer-btn" onclick="answerGame('${o.replace(/'/g,"\\'")}',this)">${o}</button>`).join('');gameLocked=false}
function answerGame(answer,btn){if(gameLocked)return;gameLocked=true;const q=gameQuestions[gameIndex];document.querySelectorAll('#gameAnswers .answer-btn').forEach(b=>{b.disabled=true;if(b.textContent===q.a)b.classList.add('correct')});if(answer===q.a){gameScore++;document.getElementById('gameFeedback').textContent='Benar! 🎉 '+q.why}else{btn.classList.add('wrong');document.getElementById('gameFeedback').textContent='Belum tepat. '+q.why}document.getElementById('gameScore').textContent=`⭐ Skor: ${gameScore}`;document.getElementById('gameNext').textContent=gameIndex===gameQuestions.length-1?'Lihat hasil':'Soal berikutnya ➜';document.getElementById('gameNext').classList.remove('hidden')}
function nextGame(){if(gameIndex<gameQuestions.length-1){gameIndex++;renderGame()}else{document.getElementById('gameChar').textContent='🏆';document.getElementById('gameQuestion').textContent=`Game selesai! Skormu ${gameScore} dari ${gameQuestions.length}.`;document.getElementById('gameAnswers').innerHTML='';document.getElementById('gameFeedback').textContent=gameScore>=4?'Sugoi! Kamu hebat! Coba lanjutkan ke kuis akhir.':'Ganbatte! Yuk, ulangi materi dan coba lagi.';document.getElementById('gameNext').textContent='Kuis akhir ➜';document.getElementById('gameNext').onclick=()=>showPage('quiz')}}
const quizQuestions=[
{q:'Ada berapa sistem tulisan utama dalam bahasa Jepang?',opts:['Satu','Dua','Tiga','Lima'],a:'Tiga',why:'Hiragana, Katakana, dan Kanji.'},
{q:'Tulisan yang sering digunakan untuk nama asing adalah ...',opts:['Hiragana','Katakana','Kanji','Romaji saja'],a:'Katakana',why:'Katakana sering digunakan untuk nama asing dan kata serapan.'},
{q:'Bagaimana cara membaca あ?',opts:['A','I','U','O'],a:'A',why:'あ dibaca a.'},
{q:'Tulisan yang digunakan untuk banyak partikel dan akhiran tata bahasa adalah ...',opts:['Hiragana','Katakana saja','Kanji saja','Romaji'],a:'Hiragana',why:'Hiragana banyak digunakan untuk partikel dan akhiran tata bahasa.'},
{q:'Kanji 山 berarti ...',opts:['Air','Api','Gunung','Bulan'],a:'Gunung',why:'山 dibaca yama, berarti gunung.'},
{q:'Manakah contoh Katakana?',opts:['あ い う','ア イ ウ','山 川 日','A I U'],a:'ア イ ウ',why:'ア, イ, dan ウ adalah Katakana.'},
{q:'ねこ (neko) berarti ...',opts:['Anjing','Kucing','Buku','Sekolah'],a:'Kucing',why:'ねこ berarti kucing.'},
{q:'水 biasanya dibaca mizu dan berarti ...',opts:['Pohon','Orang','Air','Matahari'],a:'Air',why:'水 (mizu) berarti air.'}
];let quizIndex=0,quizScore=0,quizAnswered=false;
function renderQuiz(){quizIndex=0;quizScore=0;quizAnswered=false;drawQuiz()}
function drawQuiz(){const box=document.getElementById('quizBox');if(quizIndex>=quizQuestions.length){box.innerHTML=`<div class="game-char">🏆</div><h2 style="text-align:center">Kuis selesai!</h2><div class="game-char">${quizScore}/${quizQuestions.length}</div><p style="text-align:center">${quizScore>=7?'Hebat! Kamu sudah memahami dasar huruf Jepang! 🌸':quizScore>=5?'Bagus! Terus berlatih ya! ✨':'Jangan menyerah. Pelajari lagi materinya dan coba ulangi! 💪'}</p><button class="primary-btn" onclick="renderQuiz()">Ulangi kuis ↻</button><button class="primary-btn" style="margin-left:8px" onclick="showPage('summary')">Lihat kesimpulan ➜</button>`;return}const q=quizQuestions[quizIndex];box.innerHTML=`<div class="game-progress"><span>Soal ${quizIndex+1} dari ${quizQuestions.length}</span><span>⭐ Skor: ${quizScore}</span></div><div class="progress"><i style="width:${(quizIndex+1)/quizQuestions.length*100}%"></i></div><h3>${q.q}</h3><div class="answer-grid">${q.opts.map(o=>`<button class="answer-btn" onclick="answerQuiz('${o.replace(/'/g,"\\'")}',this)">${o}</button>`).join('')}</div><div id="quizFeedback" class="feedback"></div><button id="quizNext" class="primary-btn hidden" onclick="quizIndex++;drawQuiz()">${quizIndex===quizQuestions.length-1?'Lihat hasil':'Soal berikutnya ➜'}</button>`}
function answerQuiz(answer,btn){if(quizAnswered)return;quizAnswered=true;const q=quizQuestions[quizIndex];document.querySelectorAll('#quizBox .answer-btn').forEach(b=>{b.disabled=true;if(b.textContent===q.a)b.classList.add('correct')});if(answer===q.a)quizScore++;else btn.classList.add('wrong');document.getElementById('quizFeedback').textContent=(answer===q.a?'Benar! 🎉 ':'Belum tepat. ')+q.why;const next=document.getElementById('quizNext');next.textContent=quizIndex===quizQuestions.length-1?'Lihat hasil':'Soal berikutnya ➜';next.classList.remove('hidden');}
