const form = document.getElementById("formCadastro")
const lista = document.getElementById("listaUsuarios")
const contador = document.getElementById("contador")
const pesquisa = document.getElementById("pesquisa")

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

function mostrarUsuarios(){

lista.innerHTML = ""

contador.textContent = "Total de usuários: " + usuarios.length

const filtrados = usuarios.filter(usuario =>
usuario.nome.toLowerCase().includes(pesquisa.value.toLowerCase())
)

filtrados.forEach((usuario,index)=>{

const li = document.createElement("li")

li.innerHTML = `
<span>${usuario.nome} - ${usuario.idade} anos</span>

<div class="botoes">
<button class="editar" onclick="editarUsuario(${index})">Editar</button>
<button class="excluir" onclick="removerUsuario(${index})">Excluir</button>
</div>
`

lista.appendChild(li)

})

}

form.addEventListener("submit",function(e){

e.preventDefault()

const nome = document.getElementById("nome").value
const idade = document.getElementById("idade").value

usuarios.push({
nome:nome,
idade:idade
})

localStorage.setItem("usuarios",JSON.stringify(usuarios))

form.reset()

mostrarUsuarios()

})

function removerUsuario(index){

usuarios.splice(index,1)

localStorage.setItem("usuarios",JSON.stringify(usuarios))

mostrarUsuarios()

}

function editarUsuario(index){

const novoNome = prompt("Novo nome:",usuarios[index].nome)
const novaIdade = prompt("Nova idade:",usuarios[index].idade)

if(novoNome && novaIdade){

usuarios[index].nome = novoNome
usuarios[index].idade = novaIdade

localStorage.setItem("usuarios",JSON.stringify(usuarios))

mostrarUsuarios()

}

}

pesquisa.addEventListener("input",mostrarUsuarios)

mostrarUsuarios()