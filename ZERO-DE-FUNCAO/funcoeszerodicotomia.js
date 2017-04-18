function ajuda(){
alert('Digite a função considerando:'+
'\n\nsinal de multiplicação: *'+
'\nx elevando a n: Math.pow(x,n)'+
'\nnúmero de Euler (e=2.718281828459045): Math.E'+
'\nexponencial de x: Math.exp(x)'+
'\nnúmero pi (pi=3.14...): Math.PI'+
'\ncosseno de x (radianos): Math.cos(x)'+
'\nlogaritmo de n: Math.log(n)'+
'\n\nTeste a função (botão TESTAR f em x =) para ver se ela foi digitada corretamente.'+
'\n\n Entre em: http://www.w3schools.com/jsref/jsref_obj_math.asp para mais informações.'+
'\n');
}

function testar(){
f=document.getElementById("ef").value;
x=document.getElementById("ex").value;
x=Number(x);
try { vf(f,x);} //testa o valor da função
catch(err) {alert('Erro:\n'+err.message);} //se der erro, pára e dá alerta
vf(f,x); //chama a função que calcula f no ponto x
alert('f('+x+') = '+y+'\n');
}

//DAR O VALOR DA FUNÇÃO f em x. Retorna o valor como y
function vf(f,x) {
y=eval(f)
}

function calcular(){

f=document.getElementById("ef").value;
x=document.getElementById("ex").value;
x=Number(x);
try { vf(f,x);} //testa o valor da função
catch(err) {alert('Erro:\n'+err.message);} //se der erro, pára e dá alerta

a=document.getElementById("ea").value; //extremo do intervalo a
a=Number(a);
b=document.getElementById("eb").value; //extremo do intervalo b
b=Number(b);

//testar intervalo
vf(f,a); //calcula o valor da função em a
ya=y;
vf(f,b); //calcula o valor da função em b
yb=y;
if ((ya*yb)>=0) {
	alert('Erro: '+
	'\nf(a) = '+'f('+a+') = '+ya+
	'\nf(a) = '+'f('+b+') = '+yb+
	'\nf(a)*f(b) tem que ser menor que zero.'+
	'\nEscolha outro intervalo.');
	return; //pára o programa
}

ea=document.getElementById("eea").value; //erro alvo (calcular até menor que ele)
ea=Number(ea);
itm=document.getElementById("eitm").value; //número máximo de iterações
itm=Number(itm);

xa=[]; //criar o vetor
xa[0]=a;
xb=[]; //criar o vetor
xb[0]=b;
En=[]; //criar o vetor
xm=[]; //criar o vetor


//algoritmo ****************************************************
k=0; //número da iteração
xm[k]=(xa[k]+xb[k])/2;
vf(f,xm[k]); //calcula o valor da função em xm (ponto médio)
yxm=y;
vf(f,xa[k]); //calcula o valor da função em xa
ya=y;
if ((ya*yxm)<=0) {
xa[k+1]=xa[k];
xb[k+1]=xm[k];
} else {
xa[k+1]=xm[k];
xb[k+1]=xb[k];
}
En[k]=Math.abs((xb[k]-xa[k])/2);
while(En[k]>ea){
k=k+1;
if (k==itm) {
break; //sai do laço enquanto
}
xm[k]=(xa[k]+xb[k])/2;
vf(f,xm[k]); //calcula o valor da função em xm (ponto médio)
yxm=y;
vf(f,xa[k]); //calcula o valor da função em xa
ya=y;
if ((ya*yxm)<=0) {
xa[k+1]=xa[k];
xb[k+1]=xm[k];
} else {
xa[k+1]=xm[k];
xb[k+1]=xb[k];
}
En[k]=Math.abs((xb[k]-xa[k])/2);
}
//fim do algoritmo ****************************************************

//impressão

    res=""; 
    res+='<table border>';
	res+='<tr style="background-color: #C0C0C0"><td>ITERAÇÃO</td>';
	res+='<td>a</td>';
	res+='<td>b</td>';
	res+='<td>xm (solução)</td>';
 	res+='<td>ERRO</td>';
	res+='<td>CONVERGÊNCIA</td>';
	res+='</tr>';
	for (c=0;c<=k;c++){ //iterações
	res+='<tr>';
	res+='<td style="background-color: #C0C0C0">'+c+'</td>';
	res+='<td>'+xa[c]+'</td>';
	res+='<td>'+xb[c]+'</td>';
	res+='<td>'+xm[c]+'</td>';
	res+='<td style="background-color: #C0C0C0">'+En[c]+'</td>';
	vf(f,xm[c]);
	res+='<td style="background-color: #C0C0C0">'+y+'</td>';
	res+='</tr>';
	}
    res+='</table>';
	
document.getElementById('resultado').innerHTML = res;

fgrafico(f,a,b);

}

function fgrafico(f,a,b){

//criação dos pontos
p=50; //quantidade de pontos a plotar
inter=(b-a)/(p-1); //intervalo em x
x=a;
vf(f,x); //sai y
pontos=[[x,y]];
for (i=1;i<=(p-1);i++){ //número de pontos 
x=x+inter;
vf(f,x); //sai y
pontos.push([x,y]);
}

//achando xmin e xmax
xmini=a;
xmaxi=b;
//aumentando 20% no máximo e diminuindo 20% no min
if (xmini==xmaxi) {
xmin=xmini-((xmini)*0.2);
xmax=xmaxi+((xmaxi)*0.2);
} else {
xmin=xmini-((xmaxi-xmini)*0.2);
xmax=xmaxi+((xmaxi-xmini)*0.2);
}

//achando ymin
x=a;
vf(f,x); //sai y
fxmini=y;
for (i=1;i<=(p-1);i++){ //número de pontos 
x=x+inter;
vf(f,x); //sai y
	if (fxmini>y) {
	fxmini=y;
	}
}
//achando ymax
x=a;
vf(f,x); //sai y
fxmaxi=y;
for (i=1;i<=(p-1);i++){ //número de pontos 
x=x+inter;
vf(f,x); //sai y
	if (fxmaxi<y) {
	fxmaxi=y;
	}
}
//aumentando 20% no máximo e diminuindo 20% no min
if (fxmini==fxmaxi) {
fxmin=fxmini-((fxmini)*0.2);
fxmax=fxmaxi+((fxmaxi)*0.2);
} else {
fxmin=fxmini-((fxmaxi-fxmini)*0.2);
fxmax=fxmaxi+((fxmaxi-fxmini)*0.2);
}

var dados = [pontos]; //aqui são os dados

$(document).ready(function(){

  options = {
      grid: {
          backgroundColor: "white",
      },
      seriesDefaults: {
          lineWidth: 2, //espessura da linha que liga os pontos do gráfico
          style: 'square',
          rendererOptions: { smooth: true }
      },
	  series:[ //altera propriedades de cada série, separadamente
       {showMarker: false, showLine: true} //, //propriedades da primeira série
	   //{showMarker: true, showLine: false} //propriedades da segunda série (quando houver)
	]
  };

  var plotagem;
  if (plotagem) {
  plotagem.destroy(); //se gerar gráfico em cima de um gráfico já pronto
  }
  plotagem = $.jqplot('grafico', dados, $.extend(options, {
      title: 'GRÁFICO de f(x)',
      axes: {
        xaxis: {
          label: "x",
		  tickOptions: {formatString:'%.4f'}, //formatação dos números do eixo - 4 casas
		  min:xmin, 
		  max:xmax, 
          tickInterval:(xmax-xmin)/10 //10 divisões; 
        },
        yaxis: {
          label: "f(x)",
		  tickOptions: {formatString:'%.4f'}, //formatação dos números do eixo - 4 casas
		  min:fxmin, 
		  max:fxmax,
		  tickInterval:(fxmax-fxmin)/10 //10 divisões; 
        }
      }
  })).replot(); //se gerar gráfico em cima de um gráfico já pronto
  
  });

}
