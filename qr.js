const wrapper = document.querySelector(".wrapper"),
    form = wrapper.querySelector("form"),
    fileInp = form.querySelector("input"),
    infotext = form.querySelector("p"),
    copyBtn = wrapper.querySelector(".copyBtn"),
    closeBtn = wrapper.querySelector(".closeBtn");

function fetchRequest(formData, file) {
    infotext.innerText = "`QR Sacning...`"
    infotext.style.color = 'green'
    fetch("https://api.qrserver.com/v1/read-qr-code/? ", {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        // infotext.innerText =result? "upload QR code to Scan": "Couldn't scan QR code" ;
        if (!result) {
            infotext.innerHTML = "Couldn't scan QR code"
            infotext.style.color = 'red';
        }

        if (!result) return;
        wrapper.querySelector("textarea").innerHTML = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        // **********ACTIVE***************            
        wrapper.classList.add("active");
    }).catch(() => {
        infotext.innerText = "Couldn't scan QR code";
    })
}


fileInp.addEventListener("change", e => {
    let file = e.target.files[0]; //fetch a single pic data
    if (!file) return;
    let formData = new FormData();
    formData.append("file", file);
    fetchRequest(formData, file);
    // console.log(file);
})

copyBtn.addEventListener("click", () => {
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);

});
// closeBtn.addEventListener("click", ()=> wrapper.classList.remove("active"));

closeBtn.addEventListener("click", () => {
    window.location.reload();
})

form.addEventListener("click", () => fileInp.click());



