(function(root){
const signs=['Capricorn','Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius'];
const cutoffs=[20,19,21,20,21,21,23,23,23,23,22,22];
const symbols=['♑','♒','♓','♈','♉','♊','♋','♌','♍','♎','♏','♐'];
const monthDays=[31,29,31,30,31,30,31,31,30,31,30,31];
function zodiac(month,day){
 if(!Number.isInteger(month)||!Number.isInteger(day)||month<1||month>12||day<1||day>monthDays[month-1])return null;
 return signs[(month-1+(day>=cutoffs[month-1]?1:0))%12];
}
const horoscopes={
 Aries:['You will run into a wall today. Literally. Look up from your phone.','Your bold leadership will inspire others to suggest a different leader.','Today you will seize the moment. The moment will ask to be put back.'],
 Taurus:['Your couch is calling your name. Answer it. It is your true soulmate.','A financial opportunity awaits. It is a coupon for something you do not need.','You will stand your ground today. Mostly because getting up sounds exhausting.'],
 Gemini:['You will argue with yourself and lose. It is a bold look.','Both sides of your personality agree: that message should have stayed in drafts.','You will start three fascinating conversations and forget why you walked into the room.'],
 Cancer:['You will cry over a commercial for laundry detergent. It is fine.','Your intuition is strong today. Unfortunately, so is your urge to overthink a thumbs-up emoji.','Someone will ask how you are. Clear your afternoon.'],
 Leo:['You will practice your Oscar speech in the bathroom mirror. You still win.','The spotlight is yours today. It is the refrigerator light at midnight.','Your main-character moment arrives. Everyone else is looking at their phone.'],
 Virgo:['You will color-code your stress. It will look very neat.','You will make a to-do list so detailed that making it becomes your only accomplishment.','The universe has a plan. You have already found three formatting errors.'],
 Libra:['You will spend three hours trying to pick a restaurant. You will end up eating cereal.','Balance is coming into your life. You will carry all the grocery bags in one trip.','A big decision awaits. You will ask six people and choose a seventh option.'],
 Scorpio:['You will plot world domination. Or just take a very long nap.','Your mysterious aura will deepen. You simply forgot to reply again.','You will uncover a hidden truth today: the leftovers were yours all along.'],
 Sagittarius:['You will ask the universe a deep question. The universe will reply with a meme.','Adventure is calling. Your phone is on silent.','Your free spirit will take you somewhere new. Probably the wrong exit.'],
 Capricorn:['You will buy a planner to organize your life. You will lose the planner immediately.','Your ambition knows no bounds. Your phone battery knows exactly where its bounds are.','You will turn a relaxing hobby into a task with a deadline. Congratulations.'],
 Aquarius:['You will have a genius idea in the shower. It will evaporate before you get out.','You are ahead of your time. Unfortunately, your appointment was yesterday.','Your unconventional solution will raise eyebrows. So will the original problem you created.'],
 Pisces:['You will daydream through an entire meeting. You will nod at the right times anyway.','Your imagination will take you far. Your laundry will stay exactly where it is.','You will feel a deep connection to the universe. It might just be a very good playlist.']
};
const questions=['Do you believe in God?','Have you sneezed more than twice today?','Is classical music fire?','Can you touch your toes?','Is a hot dog a sandwich?'];
const reactions=['Interesting.','Wow.','Noted.','Fascinating.',"We'll allow it."];
function pick(sign,random=Math.random){const options=horoscopes[sign];return options?options[Math.floor(random()*options.length)]:null;}
root.Horoscope={signs,symbols,monthDays,zodiac,horoscopes,questions,reactions,pick};
if(typeof module!=='undefined')module.exports=root.Horoscope;
})(globalThis);
