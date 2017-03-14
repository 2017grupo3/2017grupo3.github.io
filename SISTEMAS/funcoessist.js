function fgerar(){
n=document.getElementById("ordem").value; //lê n
n=Number(n); //para definir que n é número, não texto
col=n+1; //número de colunas, porque a última coluna são os valores após a igualdade
//abaixo, html dentro do javascript, para criar a tabela dinamicamente (nxn)
html="";
html+='<table border>';
for (i=1;i<=n;i++){
html+='<tr>';
for(j=1;j<=n;j++){
ntermo=i+','+j;
conteudo='<input type="number" id='+ntermo+' value="0"/>';
html+='<td>'+conteudo+'</td>';
}
ntermo=i+','+col;
conteudo='<input type="number" style="background-color: #C0C0C0" id='+ntermo+' value="0"/>';
html+='<td>'+conteudo+'</td>';
html+='</tr>';
}
html+='</table>';
document.getElementById('tabela').innerHTML=html;
}
function calcular(){
n=document.getElementById("ordem").value;
n=Number(n);
//ler os termos aij
a=[ ]; //criar o vetor
for (i=1;i<=n;i++){
for(j=1;j<=n;j++){
ntermo=i+','+j;
a[ntermo]=document.getElementById(""+ntermo+"").value;
a[ntermo]=Number(a[ntermo]);
} }
//ler os termos bi
col=n+1;
b=[ ]; //criar o vetor
for (i=1;i<=n;i++){
ntermo=i+','+col;
b[i]=document.getElementById(""+ntermo+"").value;
b[i]=Number(b[i]);
}
sistema(n,b,a); //chama a função que calcula o sistema triangular superior
//imprimir os resultados xi
res='';
for (i=1;i<=n;i++){
res=res+'\r\nx'+i+'\r\n='+x[i].toFixed(3)+'<br>'
}
document.getElementById('resultado').innerHTML = res;
}


function sistema(n,b,a){ //AQUI ENTRA O ALGORITMO DOS ALUNOS
m=[];
x=[];//entra n, b e a. Sai x.
for (k=1;k<=n-1;k++) { //para cada coluna (a última de “a” e a coluna “b” não entram) //Encontrar o pivô (o maior em módulo)
w=Math.abs(a[k+','+k]) //w é o pivô
r=k //r é o nº da linha que está o pivô
for (j=k;j<=n;j++) { //para cada linha menos as anteriores a “k”, já escalonadas
if (Math.abs(a[j+','+k])>w) {
w=Math.abs(a[j+','+k])
r=j
}
}
if (w=0) {
alert("Todos os pivôs são nulos!");
return;
}
else {
//Fim encontrar o pivô (o maior em módulo)
//Trocar a linha k com a linha r
for (c=1;c<=n;c++){ //coluna 1 a n
atemp=a[k+','+c] //atemp é uma variável temporária
a[k+','+c] = a[r+','+c]
a[r+','+c] = atemp
}
btemp = b[k] //btemp é uma variável temporária
b[k] = b[r]
b[r] = btemp
}
//Fim Trocar a linha k com a linha r
//Fazer o escalonamento
for (i=k+1;i<=n;i++) { //para cada linha depois da que tem o pivô
m[i+','+k]=a[i+','+k]/a[k+','+k]
b[i]= b[i] - m[i+','+k]* b[k]
a[i+','+k]=0 //vai dar zero, mas é bom colocar para evitar erro de precisão
for (j=k+1;j<=n;j++){ //para cada coluna depois da que tem o pivô
a[i+','+j]= a[i+','+j] - m[i+','+k] * a[k+','+j]
}
}
}
//Fim fazer o escalonamento (“a” já está escalonado, ou seja, já é triangular superior)
x[n]=b[n]/a[n+','+n]
for (i=n-1;i>=1;i--){
	soma=0
for (j=i+1;j<=n;j++){
	soma=soma+a[i+','+j]*x[j]
}
x[i]=(b[i]-soma)/a[i+','+i]
}
}