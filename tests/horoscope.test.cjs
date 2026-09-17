const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const data=require('../dist/data.js');
test('all twelve zodiac boundaries and year rollover',()=>{
 const boundaries=[[1,20,'Capricorn','Aquarius'],[2,19,'Aquarius','Pisces'],[3,21,'Pisces','Aries'],[4,20,'Aries','Taurus'],[5,21,'Taurus','Gemini'],[6,21,'Gemini','Cancer'],[7,23,'Cancer','Leo'],[8,23,'Leo','Virgo'],[9,23,'Virgo','Libra'],[10,23,'Libra','Scorpio'],[11,22,'Scorpio','Sagittarius'],[12,22,'Sagittarius','Capricorn']];
 for(const [month,day,before,after]of boundaries){assert.equal(data.zodiac(month,day-1),before);assert.equal(data.zodiac(month,day),after);}
 assert.equal(data.zodiac(1,1),'Capricorn');assert.equal(data.zodiac(12,31),'Capricorn');assert.equal(data.zodiac(2,29),'Pisces');
});
test('invalid dates are rejected',()=>{for(const [month,day]of [[0,1],[13,1],[2,30],[4,31],[1,0],[1,32],[1.5,3],[1,2.5],[NaN,2]])assert.equal(data.zodiac(month,day),null);});
test('every sign has three reachable fortunes',()=>{for(const sign of data.signs){assert.equal(data.horoscopes[sign].length,3);for(let i=0;i<3;i++)assert.equal(data.pick(sign,()=>(i+.5)/3),data.horoscopes[sign][i]);}});
function setup(){
 class Element{
  constructor(){this.value='';this.textContent='';this.children=[];this.hidden=false;this.listeners={};this.classList={add(){},remove(){}};}
  append(child){this.children.push(child);}replaceChildren(...items){this.children=items;this.value='';}focus(){}addEventListener(name,fn){this.listeners[name]=fn;}
 }
 const elements={};const timers=[];const events={};
 const context={Horoscope:data,document:{getElementById:id=>elements[id]??=new Element(),createElement:()=>new Element()},window:{addEventListener:(name,fn)=>events[name]=fn},setTimeout:(fn,ms)=>{timers.push({fn,ms});return timers.length;},clearTimeout:()=>{timers.length=0;}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../dist/script.js'),'utf8'),context);
 return {elements,timers,events};
}
test('full flow locks clicks, pauses for reactions, waits three seconds and resets',()=>{
 const {elements:e,timers,events}=setup();events.pageshow();
 e.month.value='4';e.month.listeners.change();assert.equal(e.day.children.length,31);
 e.day.value='31';e['birthday-form'].listeners.submit({preventDefault(){}});assert.match(e.error.textContent,/valid/);
 e.day.value='20';e['birthday-form'].listeners.submit({preventDefault(){}});
 assert.equal(e.month.value,'');assert.equal(e.day.value,'');
 for(let i=0;i<5;i++){
  assert.equal(e.question.textContent,data.questions[i]);
  e.yes.listeners.click();e.no.listeners.click();assert.equal(timers.length,1);assert.equal(e.yes.disabled,true);
  assert.ok(data.reactions.includes(e.reaction.textContent));assert.equal(timers[0].ms,850);timers.shift().fn();
 }
 assert.equal(e['loading-screen'].hidden,false);assert.equal(e['result-screen'].hidden,true);assert.equal(timers[0].ms,3000);
 timers.shift().fn();assert.equal(e['result-screen'].hidden,false);assert.equal(e['result-title'].textContent,'Taurus');assert.ok(data.horoscopes.Taurus.includes(e.fortune.textContent));
 e.restart.listeners.click();assert.equal(e['birthday-screen'].hidden,false);assert.equal(e.fortune.textContent,'');assert.equal(e.month.value,'');
 e.month.value='2';e.month.listeners.change();assert.equal(e.day.children.length,30);e.day.value='29';
 e['birthday-form'].listeners.submit({preventDefault(){}});assert.equal(e.question.textContent,data.questions[0]);
 events.pageshow();assert.equal(e['birthday-screen'].hidden,false);assert.equal(timers.length,0);
});
