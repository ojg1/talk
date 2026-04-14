
// https://manga-shopping-scroll-yamaha.trycloudflare.com

const ServerURL = "https://manga-shopping-scroll-yamaha.trycloudflare.com";
const socket = io(ServerURL);
const template = document.getElementById("message");

let username = null;
let colorR = null;
let colorG = null;
let colorB = null;

socket.on("connect", function() {
    console.log("Connected:", socket.id);
})

socket.on("message", (msg) => {
    let clone = template.cloneNode(true);
    let [username, color, text] = msg.split("|")

    clone.querySelector(".name").innerHTML = "<strong>"+username+"</strong>";
    clone.querySelector(".name").style.color = "rgb(" + color + ")";
    clone.querySelector(".text").innerText = text;
    document.getElementById("mainChatBox").appendChild(clone)
    console.log("Received:", msg);
});

document.getElementById("sendButton").addEventListener("click", async function() {

    if (!username || colorR == null || colorG == null || colorB == null) {
        return
    };
    
    let message = document.getElementById("sendInput").value;
    document.getElementById("sendInput").value = "";

    if (message.trim() === "") return;

    message =  username + "|" + colorR + "," + colorG + "," + colorB + "|" + message 

    await fetch(ServerURL + "/message", {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text:message 
        })

    });

})

document.getElementById("submitDetails").addEventListener("click", function() {
    username = document.getElementById("inputUsername").value;
    colorR = document.getElementById("inputr").value;
    colorG = document.getElementById("inputg").value;
    colorB = document.getElementById("inputb").value;

    document.getElementById("inputUsername").disabled = true;
    document.getElementById("inputr").disabled = true;
    document.getElementById("inputg").disabled = true;
    document.getElementById("inputb").disabled = true;
    document.getElementById("submitDetails").disabled = true;

    document.getElementById("sendInput").disabled = false;
})
