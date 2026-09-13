function originalSeed(){return {version:1,users:[
{id:'s1',role:'student',name:'Noor Peeters',age:21,school:'UGent',study:'Communicatiewetenschappen',city:'Gent',bio:'Nieuw semester, nieuwe mensen. Altijd te vinden voor koffie na de les of een spontane wandeling.',interests:['Koffie','Muziek','Wandelen'],intent:'Samen de stad ontdekken',color:'#6f8373',languages:'Nederlands, Engels',active:true},
{id:'s2',role:'student',name:'Luca Vermeulen',age:22,school:'HOGENT',study:'Grafisch ontwerp',city:'Gent',bio:'Ik verzamel platen en goede koffieplekken. Zoek iemand voor een concert of een creatieve namiddag.',interests:['Muziek','Koffie','Design'],intent:'Samen naar een concert',color:'#a66d55',languages:'Nederlands, Engels',active:true},
{id:'s3',role:'student',name:'Amira Benali',age:20,school:'UGent',study:'Psychologie',city:'Gent',bio:'Studeren in de bib, daarna even naar buiten. Wie gaat mee wandelen of een nieuwe lunchplek proberen?',interests:['Wandelen','Koffie','Lezen'],intent:'Een studiemaatje vinden',color:'#596c90',languages:'Nederlands, Frans, Engels',active:true},
{id:'s4',role:'student',name:'Mateo Silva',age:23,school:'UGent',study:'Architectuur · Erasmus',city:'Gent',bio:'Een semester in Gent! Ik wil de stad leren kennen, Nederlands oefenen en samen koken.',interests:['Koken','Fotografie','Muziek'],intent:'Lokale studenten ontmoeten',color:'#8d7960',languages:'Portugees, Engels',active:true},
{id:'s5',role:'student',name:'Emma De Smet',age:21,school:'Arteveldehogeschool',study:'Journalistiek',city:'Gent',bio:'Van podcasts tot quizavonden: ik ben nieuwsgierig naar alles. Nog op zoek naar een quizploeg.',interests:['Quiz','Lezen','Muziek'],intent:'Een quizmaatje vinden',color:'#876682',languages:'Nederlands, Engels',active:true},
{id:'s6',role:'student',name:'Jules Martens',age:24,school:'HOGENT',study:'Toegepaste informatica',city:'Gent',bio:'Overdag code, in de avond klimmen of een bordspel. Zin om eens mee te gaan boulderen?',interests:['Sport','Gaming','Koffie'],intent:'Samen sporten',color:'#527d7b',languages:'Nederlands, Engels',active:true},
{id:'admin',role:'admin',name:'Harmonia Admin',active:true},
{id:'b1',role:'business',name:'Café Cadans',description:'Koffie, vinyl en een lange tafel voor nieuwe ontmoetingen.',category:'Koffie & muziek',address:'Fictieve locatie · centrum Gent',active:true,verified:true},
{id:'b2',role:'business',name:'Bar De Tussenstop',description:'Een gezellige plek voor een quiz en een babbel na de les.',category:'Bar & quiz',address:'Fictieve locatie · studentenbuurt Gent',active:true,verified:true},
{id:'b3',role:'business',name:'Studio Buiten',description:'Laagdrempelige activiteiten om samen in beweging te komen.',category:'Sport & activiteiten',address:'Fictieve locatie · Gent',active:true,verified:false}],
swipes:[{from:'s2',to:'s1',liked:true},{from:'s3',to:'s1',liked:true}],matches:[],messages:[],blocks:[],reports:[],saved:[],events:[
{id:'e1',owner:'b1',title:'Koffie & nieuwe gezichten',date:'2026-10-01',time:'16:00',category:'Koffie',description:'Schuif aan de grote tafel aan en leer andere studenten kennen.',price:'Gratis toegang',published:true},
{id:'e2',owner:'b2',title:'De grote studentenquiz',date:'2026-10-02',time:'20:00',category:'Quiz',description:'Kom alleen of met je Harmony. Wij maken de teams compleet.',price:'€ 5 per persoon',published:true},
{id:'e3',owner:'b1',title:'Vinyl op woensdag',date:'2026-10-07',time:'19:00',category:'Muziek',description:'Neem je favoriete plaat mee voor een avond vol ontdekkingen.',price:'Gratis toegang',published:true}
]};}


export const EVENT_TYPES = ['Koffie','Muziek','Sport','Quiz','Cultuur','Gaming','Eten','Buiten'];
export function seed() {
  const s = originalSeed();
  s.version = 2;
  const first = ['Olivia','Finn','Yara','Arthur','Zoë','Milan','Lina','Adam','Elena','Victor','Nora','Sam','Ines','Lou','Aya','Oscar','Mila','Rayan','Fleur','Thomas','Sofia','Niels','Sara','Hugo','Lotte','Alex','Iris','Elias','Chloé','Robin','Lena','Leon','Amina','Tibo','Eva','Max','Nina','Simon','Clara','Daan','Louise','Noah','Zara','David','Marie','Amir','Ella','Bas','Julie','Yanis','Liv','Remi','Jade','Ruben'];
  const last = ['Jacobs','Dubois','Janssens','Willems','Bogaert','Declercq','Verstraeten','De Meyer','Maes','De Vos','Claeys','Nguyen','Laurent','De Wilde','Verbruggen','Ali','Goossens','De Clercq'];
  const studies = ['Architectuur','Rechten','Illustratie','Biologie','Sociaal werk','Informatica','Verpleegkunde','Geschiedenis','Handelswetenschappen','Fotografie','Productdesign','Taal- en letterkunde'];
  const interests = [['Muziek','Koffie','Cultuur'],['Sport','Buiten','Wandelen'],['Koken','Eten','Koffie'],['Gaming','Quiz','Muziek'],['Cultuur','Fotografie','Design'],['Lezen','Koffie','Quiz'],['Sport','Muziek','Gaming'],['Buiten','Wandelen','Fotografie'],['Koffie','Design','Muziek']];
  const intents = ['Een concertbuddy vinden','Samen sporten','Nieuwe eetplekjes ontdekken','Een quizteam vormen','Samen iets creatiefs doen','Een studiemaatje vinden','Nieuwe vrienden ontmoeten','Gent te voet ontdekken','Koffie na de les'];
  const bios = ['Een goed gesprek begint voor mij bij een gedeelde playlist. Welk nummer staat bij jou op repeat?','Na de les even bewegen en mijn hoofd leegmaken. Wie doet mee?','Ik probeer elke week iets nieuws. Een recept, een plek of een gesprek met iemand die ik nog niet ken.','Competitief bij een spelletje, heel relaxed daarbuiten. Er is altijd plaats voor nog iemand aan tafel.','Oog voor mooie dingen en zin in nieuwe ideeën. Laten we iets maken of samen een expo bezoeken.','Productieve bibliotheekdagen met genoeg pauzes. Op zoek naar gezelschap voor allebei.','Nieuw in Gent en nog zoveel te ontdekken. Laat me jouw favoriete plek zien!','Even offline, schoenen aan en naar buiten. De beste gesprekken ontstaan onderweg.','Een cappuccino, een schetsboek en geen haast. Altijd zin om nieuwe mensen te ontmoeten.'];
  const colors = ['#526b88','#8a657e','#4e7770','#a37155','#737f4d','#695e8b','#8b604e','#497482','#8e7650'];
  first.forEach((name,i)=>s.users.push({id:'s'+(i+7),role:'student',name:name+' '+last[i%last.length],age:18+i%8,school:['UGent','HOGENT','Arteveldehogeschool'][i%3],study:studies[i%studies.length],city:'Gent',bio:bios[i%bios.length],interests:interests[i%interests.length],intent:intents[i%intents.length],color:colors[i%colors.length],languages:i%7===0?'Engels, Frans':'Nederlands, Engels',active:true}));
  const names = ['Koffie Kompas','Club Gloed','Boulder Basis','Quiz & Co','Atelier Noord','Pixel Café','De Lange Tafel','Groen Collectief','Bar Nachtrit','Koffie Kade','Studio Ritme','De Boekenbar','Campus Kitchen','Het Speelkwartier','Galerij Tussenin','De Wandelclub','Café Morgen'];
  names.forEach((name,i)=>s.users.push({id:'b'+(i+4),role:'business',name,category:EVENT_TYPES[i%8],description:['Een ontmoetingsplek voor nieuwsgierige studenten.','Samen iets beleven, midden in Gent.','Van een kleine pauze naar een groot verhaal.'][i%3],address:'Fictieve locatie · '+['Centrum','Zuid','Dampoort','Sint-Pieters','Brugse Poort'][i%5]+', Gent',active:true,verified:i!==14}));
  const titles = {Koffie:['Koffie zonder haast','Slow Sunday coffee','Latte & kennismaken'],Muziek:['Listening room','Open mic, open minds','Nieuwe geluiden'],Sport:['Samen aan de klimwand','After-class run','Badminton & babbels'],Quiz:['Quiz zonder vaste ploeg','Popquiz op vrijdag','De campusquiz'],Cultuur:['Sketch & connect','Samen naar de expo','Film & nababbelen'],Gaming:['Boardgame social','Mario Kart & mates','Co-op café'],Eten:['Pasta aan de lange tafel','Brunch met onbekenden','Samen koken'],Buiten:['Golden hour wandeling','Gent door een andere lens','Picknick aan het water']};
  const now = new Date();
  s.events = [];
  s.users.filter(u=>u.role==='business').forEach((b,i)=>{
    for(let j=0;j<2;j++){
      const type=EVENT_TYPES[(i+j)%8];
      const date=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1+(i*2+j)%28,12);
      const dateText=[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
      s.events.push({id:'e'+(i*2+j+1),owner:b.id,title:titles[type][(i+j)%3],category:type,date:dateText,time:j?'19:30':'15:00',description:'Kom alleen of met je Harmony. Ontmoet andere studenten tijdens '+type.toLowerCase()+'. Iedereen is welkom, ervaring is niet nodig.',price:i%3?'Gratis toegang':'€ 5 per persoon',published:b.verified});
    }
  });
  // Only incoming likes: never fabricated matches or automatic chat replies.
  s.swipes = [{from:'s2',to:'s1',liked:true},{from:'s3',to:'s1',liked:true}];
  for(let i=7;i<=60;i++) if(i%3===0)s.swipes.push({from:'s'+i,to:'s1',liked:true});
  return s;
}
