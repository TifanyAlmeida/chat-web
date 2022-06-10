// COLOCANDO FUNÇÃO DE ENVIAR MENSAGEM PELO BOTÃO

var input = document.getElementById("msg");
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                enviarMSG();
            }
        });
var botao = document.getElementById("botao");
botao.addEventListener("click", function(){
    enviarMSG();
});

// COLOCANDO FUNÇÃO QUE REMOVE A MENSAGEM
function removerDB(){
    var itemKey = document.getElementById("keyAtual").value;
    console.log(itemKey);
    remove(ref(db, 'exemplo/'+itemKey));
}
        
        //CDN -CONTENT DELIVERY NETWORK
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
        import { getDatabase, ref, set, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

        // CONFIGURAÇÕES DO PROJETO NO FIREBASE
        var firebaseConfig = {
            
            apiKey: "AIzaSyD_0Gqf-yopgNKXd-jRetqzN53kdmfEV-0",
            authDomain: "cha-tih.firebaseapp.com",
            projectId: "cha-tih",
            storageBucket: "cha-tih.appspot.com",
            messagingSenderId: "244367079152",
            appId: "1:244367079152:web:ca3680b50fe6f563603435",
            measurementId: "G-KHDBRLK3DJ"
        };

        const app = initializeApp(firebaseConfig);

        // PEGANDO O DATABASE
        var db = getDatabase(app);
        const dbRef = ref(db, 'exemplo');

        var meuhtml = "";

        var nomeUsuario = prompt("Digite seu nome");

        // DEFININDO A DIFERENÇA DE USUÁRIOS
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);

            meuhtml = "";
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                console.log(key);
                console.log(childSnapshot.val().data); 
                console.log(childSnapshot.val().nome); 
                console.log(childSnapshot.val().mensagem);
                console.log(childSnapshot.val().horario);
                
                if(nomeUsuario == childSnapshot.val().nome){
                meuhtml += '<div class="msg"><div class="eu"><div class="balao_eu"><b>' + childSnapshot.val().nome+'</i></b><span>' + childSnapshot.val().mensagem +'</span></div><div class="dados_eu"><p>'+childSnapshot.val().data+'</p><p>'+childSnapshot.val().horario+'</p><div class="fa fa-trash-o" id="keyAtual"></div></div></div></div>';
                }
                else{
                    meuhtml += '<div class="msg"><div class="outros"><div class = "dados_outros"><p>'+childSnapshot.val().data+'</p><p>'+childSnapshot.val().horario+'</p><div class="fa fa-trash-o" id="keyAtual"></div></div><div class="balao"><b>' + childSnapshot.val().nome+'</i></b><span>' + childSnapshot.val().mensagem +'</span></div></div></div>';
                }
            });

            atualizarHTML();
        });

        function enviarMSG() {

            var datahj = new Date();
            var hora = datahj.getHours() + ":" + datahj.getMinutes();
            datahj = datahj.getDate() + "/" + datahj.getMonth();
            
            //push --- append --- add
            push(ref(db, 'exemplo'), {
                nome: nomeUsuario,
                horario: hora,
                data: datahj,
                mensagem: document.getElementById("msg").value

            });

            document.getElementById("msg").value = "";
        }
        
        // ATUALIZAR O BANCO PARA A ROLAGEM DO SCROOL
        function atualizarHTML() {
            document.getElementById("chat").innerHTML = meuhtml
            ajustarScroll();
        }

        function ajustarScroll() {
            console.log("corrirgir scroll");
            var divChat = document.getElementById("chat");
            divChat.scrollTop = divChat.scrollHeight;
        }