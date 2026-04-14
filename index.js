
const ServerURL = "https://sku-wine-plenty-female.trycloudflare.com";

document.getElementById("sendButton").addEventListener("click", async function() {

    let message = document.getElementById("sendInput").value;
    document.getElementById("sendInput").value = "";

    if (message.trim() === "") return;

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