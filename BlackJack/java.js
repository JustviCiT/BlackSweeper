;//////////////////////////////////////////////////////////////////////////////////
var sommaDefault=995;
var allora = 5;
var lunghezza_ricalcolo=13;
var max = 100;
var min = 5;
var n_carte=52;
var hitman = 2;
var asso=0
var immagine1 ='<img src="referimenti/carta2b.gif">';
var p_gioca = document.getElementById('nG');
var p_comp  = document.getElementById('nC');
var score_giocatore = document.getElementById('sco');
var score_totale    = document.getElementById('scp');
var bot1  	= document.getElementById('btn1');  
var bot2	= document.getElementById('btn2');	
var bot3	= document.getElementById('btn3');
var bot4	= document.getElementById('btn4');
var bot5	= document.getElementById('btn5');	
var bot6    = document.getElementById('btn6');
var bot7   = document.getElementById('btn7');
var carta_1 = document.getElementById('dd1');
var stato = document.getElementById('stato');
var game_over = false;
var vet  =      new Array
var temp =      new Array
var tt   =      new Array
var ss   =      new Array
var win='<br> ------> HAI VINTO :O '
var won='<br> ------> HAI PERSO :* ' 
var bong='<br> ------> HAI PAREGGIATO :|'
//assegnazione denaro    
document.getElementById("sco").innerHTML = allora +' €';
document.getElementById("scp").innerHTML = sommaDefault +' €';
// creazione vettore di carte -.-
function preblack()
{
for (i=1;i<=n_carte;i++)
{ 
 do {
 flag=false
 x=Math.floor(n_carte*Math.random()+1)
 for (j=1;j<i;j++) {
 if (temp[j] == x) {flag=true}
 }}
 while (flag==true)
 temp[i] = x
 if (x <= 13) { vet [i]='C'+x}
             else {if (x <= 26) {vet [i]='Q'+(x-13)}
                               else {if (x <= 39) {vet [i]='P'+(x-26)}
                                                 else {vet [i]='F'+(x-39)}
  }}}
}
  
///////////////////////////////////////////funzioni varie///////////////////////////////////////

function carta_croupier(i)
{
tt[i]=vet.pop() 
x=i+1
document.getElementById('dd'+x).innerHTML = '<img src="carte/'+tt[i]+'.jpg">'
score(tt,p_comp)
}



function end()
{
bot3.disabled = true;                   
bot4.disabled = true;
bot5.disabled = true;
bot7.disabled = true; 
bot1.disabled=true;
bot2.disabled=true;
window.setTimeout("window.location.replace('esci.html')",2000)
}

function croupier_game()
{
  carta_1.innerHTML= '<img src="carte/'+tt[0]+'.jpg">'     //scopro prima carta
  score(tt,p_comp)
  if (parseInt(p_comp.innerHTML)<parseInt(p_gioca.innerHTML)) 
  {
  var cont_carta=1                              
  do {
  cont_carta++
  carta_croupier(cont_carta)
  } while (parseInt(p_comp.innerHTML)<parseInt(p_gioca.innerHTML)) }
  if (parseInt(p_comp.innerHTML)==parseInt(p_gioca.innerHTML)) {par()}
                                                            else {if  (parseInt(p_comp.innerHTML)<=21) {gameover()}
                                                                                                        else {winn()}}
}

function croupier()
{ document.getElementById('giocatore').style.border="3px double black;"
  document.getElementById('croupier').style.border="3px outset black;"
  setTimeout('croupier_game()',1000)
}

function canc()
{
for (i=1;i<=6;i++)
{document.getElementById('cc'+i).innerHTML = ' '
 document.getElementById('dd'+i).innerHTML = ' '}
 p_gioca.innerHTML = ' '
 p_comp.innerHTML = ' '
} 

function gameover()  //giocatore ha perso
{ stato.innerHTML = won;
if (sommaDefault==0) {end()}
else 
{
init_botton()
allora = 5
score_giocatore.innerHTML = allora +' €'
sommaDefault= sommaDefault - allora
score_totale.innerHTML = sommaDefault
}
}

function par()        //giocatore ha pareggiato 
{init_botton()
 stato.innerHTML = bong;
 sommaDefault= sommaDefault + (allora-5)
 score_totale.innerHTML = sommaDefault 
 allora = 5
 score_giocatore.innerHTML = allora +' €'
}

function winn()        //giocatore ha vinto
{allora= (allora * 2)-5
 sommaDefault= sommaDefault + allora
 score_totale.innerHTML = sommaDefault
 allora = 5
 score_giocatore.innerHTML = allora + ' €'
 stato.innerHTML = win;
 init_botton() 
 
 }

function init_botton()   //inizializza lo stato dei bottoni
{
bot3.disabled = true;                   
bot4.disabled = true;
bot5.disabled = true;
bot7.disabled = false; 
bot1.disabled=false;
bot2.disabled=false;
}

function calcolo(x)
{
if (x>10) { x=10}
if (x==1)  { x=11;asso=1}
return x
}

function score(v,z)
{
x=0
asso=0
for (i=0;i<v.length;i++)
{s=v[i]
num = s.substr(1,2)
x=x+calcolo(parseInt(num))
}
if (x>21)
{
while (asso>0)
{if (x>21) {x=x-10;asso--}}}
z.innerHTML = x
}

function over()
{
if (parseInt(p_gioca.innerHTML)>21) {gameover()}         //controllo punti attuali
if (parseInt(p_gioca.innerHTML)==21) {croupier()}
}

function stay()
{
bot3.disabled = true;                   
bot4.disabled = true;
bot5.disabled = true;
bot7.disabled = true; 
croupier()
}

function hit()
{
bot5.disabled = true;
hitman=hitman+1
ss[ss.length] = vet.pop()
document.getElementById('cc'+hitman).innerHTML = '<img src="carte/'+ss[ss.length-1]+'.jpg">'
score(ss,p_gioca)
over()
}

function doublea()
{
sommaDefault= sommaDefault - allora
allora=allora*2
score_giocatore.innerHTML = allora+ ' €'
score_totale.innerHTML = sommaDefault
hit()
if (parseInt(p_gioca.innerHTML)<21) {stay()}
}

function inc(n)                              
{
 if ((allora + n >= min)&&(allora + n <= max))
  {
    allora = (allora + n);
		score_giocatore.innerHTML = allora +' €'
		sommaDefault = sommaDefault - n
		score_totale.innerHTML = sommaDefault +' €'
  }
}

function iniz()
{
canc()                              //svuota div
tt= new Array
ss= new Array
hitman= 2                            //caricare carte
document.getElementById('giocatore').style.border="3px outset black"            //cambiare bordi giocatore
document.getElementById('croupier').style.border="3px double black;"
bot3.disabled = false;                   
bot4.disabled = false;
bot5.disabled = false;
bot7.disabled = true; 
bot1.disabled=true;
bot2.disabled=true;
carta_1.innerHTML = immagine1;
tt[0]=vet.pop()
tt[1]=vet.pop()                  //croupier
ss[0]=vet.pop()
ss[1]=vet.pop()
document.getElementById('dd2').innerHTML = '<img src="carte/'+tt[1]+'.jpg">';
document.getElementById('cc1').innerHTML = '<img src="carte/'+ss[0]+'.jpg">'
document.getElementById('cc2').innerHTML = '<img src="carte/'+ss[1]+'.jpg">'	
if (vet.length <= lunghezza_ricalcolo) {preblack();}
p_comp.innerHTML = calcolo(parseInt(tt[1].substr(1,2)))  //punteggio carta computer
score(ss,p_gioca)	                                       //punteggio carta giocatore
over()
}                 