(()=>{
 const {signs,symbols,monthDays,zodiac,questions,reactions,pick}=Horoscope;
 const el=id=>document.getElementById(id);
 const month=el('month'),day=el('day');
 const screens=['birthday','question','loading','result'];
 let sign=null,index=0,locked=false,timer=null;
 const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
 function option(text,value){const o=document.createElement('option');o.textContent=text;o.value=value;return o;}
 months.forEach((name,i)=>month.append(option(name,i+1)));
 function days(){const previous=day.value;day.replaceChildren(option('Select day',''));const count=monthDays[Number(month.value)-1]||0;for(let i=1;i<=count;i++)day.append(option(String(i),i));day.disabled=!count;day.value=Number(previous)<=count?previous:'';el('error').textContent='';}
 month.addEventListener('change',days);
 function show(screen,title){screens.forEach(name=>el(name+'-screen').hidden=name!==screen);el(title).focus({preventScroll:true});}
 function question(){locked=false;el('yes').disabled=el('no').disabled=false;el('yes').classList.remove('selected');el('no').classList.remove('selected');el('question-count').textContent=`COSMIC QUESTION ${index+1} / ${questions.length}`;el('question').textContent=questions[index];el('reaction').textContent='';show('question','question');}
 function reset(){clearTimeout(timer);sign=null;index=0;locked=false;month.value='';days();el('fortune').textContent='';el('result-title').textContent='';el('sign-symbol').textContent='';el('reaction').textContent='';el('step').textContent='01 / 03';show('birthday','birthday-title');}
 el('birthday-form').addEventListener('submit',event=>{
  event.preventDefault();if(sign!==null)return;
  sign=zodiac(Number(month.value),Number(day.value));
  if(!sign){el('error').textContent='Choose a valid month and day first.';return;}
  month.value='';days();index=0;el('step').textContent='02 / 03';question();
 });
 function answer(button){
  if(locked||!sign)return;locked=true;el('yes').disabled=el('no').disabled=true;button.classList.add('selected');
  el('reaction').textContent=reactions[Math.floor(Math.random()*reactions.length)];
  timer=setTimeout(()=>{
   index++;if(index<questions.length){question();return;}
   el('step').textContent='03 / 03';show('loading','loading-title');
   timer=setTimeout(()=>{el('result-title').textContent=sign;el('sign-symbol').textContent=symbols[signs.indexOf(sign)];el('fortune').textContent=pick(sign);show('result','result-title');},3000);
  },850);
 }
 el('yes').addEventListener('click',()=>answer(el('yes')));el('no').addEventListener('click',()=>answer(el('no')));el('restart').addEventListener('click',reset);
 // Clear restored browser form values as well as in-memory state on page entry.
 window.addEventListener('pageshow',reset);
 month.value='';days();
})();
