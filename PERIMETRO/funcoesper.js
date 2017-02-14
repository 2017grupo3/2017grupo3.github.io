function fper() { //esta função poderia estar no arquivo html, entre <script></script>
b = document.getElementById("base").value; //lê o número na caixa "base", no arquivo html, e grava em b
b=Number(b); //para garantir que é número
a= document.getElementById("altura").value; //lê o número na caixa "altura", no arquivo html, e grava em a
a=Number(a); //para garantir que é número
h=Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
perimetro=b+a+h;
document.getElementById("dper").innerHTML = perimetro; //mostrando o perimetro em "dper", no html 
}