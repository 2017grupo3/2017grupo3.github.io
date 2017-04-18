function gerar(){
	n=document.getElementById("ordem").value; //lê n
	n=Number(n); //para definir que n é número, não texto
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
	html+='</tr>';
	}
    html+='</table>';
	document.getElementById('tabela').innerHTML=html;
	}
				
function calcular(){
	n=document.getElementById("ordem").value;
	n=Number(n); 

	//ler os termos aij
	a=[]; //criar a matriz
	for (i=1;i<=n;i++){
	for(j=1;j<=n;j++){
		ntermo=i+','+j;
		a[ntermo]=document.getElementById(""+ntermo+"").value;
		a[ntermo]=Number(a[ntermo]);
	}
	}

	//acrescentar a matriz identidade
	for (i=1;i<=n;i++){ //linhas 
	for(j=(n+1);j<=2*n;j++){ //colunas
		if (i==(j-n)) { //diagonal
        a[i+','+j]=1;
        } else {
		a[i+','+j]=0;
		}		
	}
	}
	
	inversa(n,a); //chama a função que calcula a inversa de a aumentada com I
	
	}
	
function inversa(n,a){ 	

//entra n e a (matriz qualquer já aumentada com I)

	for (k=1;k<=(n-1);k++){ //para cada coluna, só da original
         w=Math.abs(a[k+','+k]); //w é o pivô 
		 r=k; //r é o nº da linha que está o pivô
		 	for (j=k;j<=n;j++){ //para cada linha
				if (Math.abs(a[j+','+k])>w) { //encontra o maior pivô em módulo
                      w=Math.abs(a[j+','+k]);
		              r=j;
                    } 
			}

	if (w==0) {
        alert('Erro: Todos os pivôs são nulos.');
		return; //pára o programa
        } else { //troca linha k pela linha r (a linha r é a linha com o maior pivô)
	            for(c=1;c<=2*n;c++){ //para todas as colunas, inclusive a identidade 
		        atemp=a[k+','+c]; //variável temporária para a
				a[k+','+c]=a[r+','+c];
				a[r+','+c]=atemp;
	            }
	}
 
		for (i=k+1;i<=n;i++){ //para cada linha, menos a anterior (zera a primeira coluna e calcula os outros termos)
		m=[]; //criar o vetor
		m[i+','+k]=a[i+','+k]/a[k+','+k];
		a[i+','+k]=0;		//a primeira coluna é zero
				for (j=k+1;j<=2*n;j++){ //para cada coluna, a partir da k
				a[i+','+j]=a[i+','+j]-m[i+','+k]*a[k+','+j];
				}
		}
	}

	ao=[]; //criar a matriz original	
	for (i=1;i<=n;i++){ //linhas 
	for(j=1;j<=n;j++){ //colunas
	ao[i+','+j]=a[i+','+j]
	}
	}


	ainv=[]; //criar a matriz inversa
	b=[]; //criar o vetor
	for (s=(n+1);s<=(2*n);s++) { //para cada sistema
		for (j=1;j<=n;j++) { //para cada linha
		b[j]=a[j+','+s];
		}
		sistemasuperior(n,b,ao); //chama a função que calcula o sistema por eliminação de gauss
		for (j=1;j<=n;j++) { //para cada linha
		ainv[j+','+(s-n)]=x[j];
		}
	}
	
	mostramatriz(n,n,ainv,'resultado'); //imprimir a inversa
	
}

function sistemasuperior(n,b,a){ 

//entra n, b e a (sistema triangular superior). Sai x.

	x=[]; //criar o vetor
	x[n]=b[n]/a[n+','+n];
	for (i=n-1;i>=1;i--){
		soma=0;
		for (j=i+1;j<=n;j++){
		soma=soma+a[i+','+j]*x[j];
		}
		x[i]=(b[i]-soma)/a[i+','+i]; //sai x[i], o vetor solução
	}

}
			 
function mostramatriz(l,c,matriz,local){ //mostra uma matriz matriz[] de l linhas e c colunas

	html=""; 
    html+='<table border>';
	for (i=1;i<=l;i++){ //linhas
	html+='<tr>';
	for(j=1;j<=c;j++){ //colunas
	ntermo=i+','+j;
	valor=matriz[ntermo];
    html+='<td>'+valor+'</td>';
	}
	html+='</tr>';
	}
    html+='</table>';
	document.getElementById(""+local+"").innerHTML=html; //local é o nome da id onde imprime no html
	
}				 

function mostravetor(l,vetor,local){ //mostra um vetor vetor[] de l linhas

	html=""; 
    html+='<table border>';
	for (i=1;i<=l;i++){ //linhas
	html+='<tr>';
	ntermo=i;
	valor=vetor[ntermo];
	html+='<td>'+valor+'</td>';
	html+='</tr>';
	}
    html+='</table>';
	document.getElementById(""+local+"").innerHTML=html; //local é o nome da id onde imprime no html
	
}