"use scrict"

document.addEventListener("DOMContentLoaded", function (){
    const form = document.getElementById("form")
    const btn = document.querySelector(".form-btn")
    const text_error = document.querySelector(".text-error")
    btn.addEventListener("click", formSend);
    
    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
        let formData = new FormData(form);
        alert(error);
        if(error === 0){
            alert("d")
            form.classList.add('sending');
            let response = await fetch("sendmail.php", {
                method: 'POST',
                body: formData
            });
            if(response.ok){
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('sending');
            } else{
                alert('Ошибка');
                form.classList.remove('sending');
            }   
        }else{
            alert("Заполните обязательные поля*")
            text_error.style.display = "flex";
        }
    }

    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll(".req");
        for(let index = 0; index < formReq.length; index++){
            const input = formReq[index];
            formRemoveError(input);
            // if(input.classList.contains("email")){
            //     if(emailTest(input)){
            //         alert("ddd")
            //         formAddError(input);
            //         error++;

            //     }
            if(input.getAttribute("type") === "checkbox" && input.checked === false){
                formAddError(input);
                error++
            }else{
                if(input.value === ""){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input){
        input.parentElement.classList.add("error");
        input.classList.add("error");
    }
    function formRemoveError(input){
        input.parentElement.classList.remove("error");
        input.classList.remove("error");
    }

    // function emailTest(input){
    //     return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2, 30})+$/ .test(input.value);
    // }
});
