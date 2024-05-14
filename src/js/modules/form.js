function form() {

    const myForm = document.getElementById('myForm');
    const ansForm = document.getElementById('ansForm')
    async function formSend(e){

        const form = e.target;
        let formData = new FormData(form);

        ansForm.innerHTML = 'Загрузка...';

        let response = await fetch('mailer/smart.php', {
            method: 'POST',
            body: formData
        });

        if(response.ok) {
            ansForm.innerHTML = "Ваши данные успешно отправлены!"
            form.reset();
            setTimeout(function(){
                ansForm.innerHTML = ""
            }, 3000)
        } else {
            alert("Ошибка");
            ansForm.innerHTML = ""
        }
    }

    myForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formSend(e);
    })
}

export default form;