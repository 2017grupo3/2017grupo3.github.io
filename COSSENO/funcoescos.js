function fcos() { //resolve o cosseno de x

ang = document.getElementById("angulo").value; //lê o ângulo em graus
ang=Number(ang); //para garantir que é número

//Cosseno exato
angr= (ang/180)*(Math.PI) //converte em rad
cos= Math.cos(angr) //calcula o cos
document.getElementById("ecos").innerHTML = cos.toFixed(5); //mostrando o cos em html

//Polinômio de Mclaurin
n = document.getElementById("nvezes").value; //lê o numero de termos
n=n-1; //para considerar o termo 0
m=0; //m é cada termo do polinômio
for (i=0; i <= n; i++) { //para i de 0 a n, somando 1 em 1
m=m+((Math.pow(-1,i))*((Math.pow(angr,2*i))/(fatorial(2*i))));
}
document.getElementById("mcos").innerHTML = m.toFixed(5); //mostrando o valor final
erro=(cos-m)
document.getElementById("derro").innerHTML = erro.toPrecision(1); //mostra o erro com 1 algarismo significativo
}

function fatorial(num) { //função fatorial
fat=1;
for (c = num; c>=1; c--) { // para c de num a 1, subtraindi 1 em 1
fat=fat*c;
}
return fat
}