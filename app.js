//Criando variável para limitar os números sorteados
let numLimite = 10
//Criando lista para todos os números sorteados, afim de evitar repetições
let listaNumSortedados = [];
//Mensagem inicial
msgInic();
//Dando valor ao numero.
let numSec = gerNumAl()
//Criando variável para contar a quantidade de tentativas
let tentativas = 1;
//Criando função para evitar repetições.
function exibirTxtTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //Voz, acessibilidade, para falar ao usuário para escolher o número secreto e entre 1 e 10
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}
//Criando função para evitar repetições
function msgInic(){
    exibirTxtTela('h1', 'Jogo do número secreto');
    exibirTxtTela('p', 'Escolha um número entre 1 e 10');
}
//Dando vida ao botão de chute.
function verificarChute() {
    let chute = document.querySelector('input').value;
//Informando, através do parágrafo, se o usuário acertou ou errou. E caso tenha errado, se o número secreto é menor ou maior que o número informado.
    //Se tiver certo:
    if(chute == numSec) {
        exibirTxtTela('h1', 'Acertou!!!');
        let palavraTentativa = tentativas >1?'tentativas':'tentativa';
        let mensagemTentativas = `Parabéns, Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTxtTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    //Se tiver errado:
    else{
        if(chute>numSec){
            exibirTxtTela('p', 'O número secreto é menor que o número informado.');
        }
        else{
            exibirTxtTela('p', 'O número secreto é maior que o número informado.');
        }
        tentativas++;
        limparTxt();
    }
}
//Função geradora, serve para gerar um número aleatório entre um e dez, para o usuário tentar acertar o número secreto.
function gerNumAl(){
    let numEscolhido = parseInt(Math.random()* numLimite + 1);
    let qtdNumsEscolhidos = listaNumSortedados.length;

    if(qtdNumsEscolhidos == numLimite){
        listaNumSortedados = [];
    }

    if(listaNumSortedados.includes(numEscolhido)) {
        return gerNumAl();
    }else{
        listaNumSortedados.push(numEscolhido);
        return numEscolhido;
    }
}
//Função para limpar o número informado, caso ele seja o número errado
function limparTxt(){
    chute = document.querySelector('input');
    chute.value = '';
}
//Função para utilizar o botão de reiniciar jogo
function reiniciarJogo(){
    numSec = gerNumAl();
    limparTxt();
    msgInic();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    tentativas = 1;

}

