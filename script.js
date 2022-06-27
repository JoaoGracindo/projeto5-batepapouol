let usuario = prompt("Qual o seu lindo nome?");

let mensagens;

const urlParticipantes = "https://mock-api.driven.com.br/api/v6/uol/participants"

const urlMensagens = 'https://mock-api.driven.com.br/api/v6/uol/messages'

let nome;

getMessanges()

function getMessanges(){
    const promise = axios.get(urlMensagens);
    promise.then(popularMensagens)
}

function popularMensagens(resposta){
    mensagens = resposta.data;
    renderizaMensagens(mensagens)
}

function renderizaMensagens(mensagens){
    const caixaTexto = document.querySelector('ul');

    caixaTexto.innerHTML = '';
    
    for (let i = 0; i < mensagens.length; i++){
        if (mensagens[i].to === 'Todos' || mensagens[i].to === usuario){
            if(mensagens[i].type === 'status'){
                caixaTexto.innerHTML += 
                `<li class ="mensagem ${mensagens[i].type}">
                    <span style="color: #AAAAAA">(${mensagens[i].time})</span>
                    <span>${mensagens[i].from}</span>
                    <span>${mensagens[i].text}</span>
                </li>
                `
            } else{
                caixaTexto.innerHTML += 
                `<li class ="mensagem ${mensagens[i].type}">
                    <span style="color: #AAAAAA">(${mensagens[i].time})</span>
                    <span>${mensagens[i].from}<w>para</w>${mensagens[i].to}:</span>
                    <span>${mensagens[i].text}</span>
                </li>
                `   
            }
        }



    }

    caixaTexto.lastElementChild.scrollIntoView();

}

function getUsers (){
    const promise = axios.get(urlParticipantes);
    promise.then(console.log(promise))
}

function erro400(){
    usuario = prompt('Esse username ja existe, tente outro.')
    cadastraUsuario();
}


function cadastraUsuario(){
    nome = 
        {
            name: usuario
          };

    console.log(nome)
    
    const promise = axios.post(urlParticipantes, nome);
    promise.then(console.log("deu td certo"));
    promise.catch(erro400)
}

function verificaAtividade(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',nome)
    promise.then(console.log('ta on'))
}

function enviaMensagens(){
    let mensagem = document.querySelector('input').value;
    let objeto = {
        from: usuario,
        to: "Todos",
        text: mensagem,
        type: "message"
        
    }

    const promise = axios.post(urlMensagens,objeto)
    promise.then(mensagemEnviadaComSucesso);
    promise.catch(() => {
        usuario = prompt('Não foi possivel enviar sua mensagem. Tente logar de novo.');
        cadastraUsuario();
        }
    );

}



function mensagemEnviadaComSucesso (){
    document.querySelector('input').value = '';
    getMessanges();
}

cadastraUsuario();

setInterval(verificaAtividade,5000);

setInterval(getMessanges,3000)
