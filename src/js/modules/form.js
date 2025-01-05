function form() {

    const myForm = document.getElementById('myForm');
    const ansForm = document.getElementById('ansForm')
    async function formSend(e){

        const form = e.target;
        let formData = new FormData(form);

        ansForm.innerHTML = 'Loading...';

        let response = await fetch('mailer/smart.php', {
            method: 'POST',
            body: formData
        });

        if(response.ok) {
            ansForm.innerHTML = "Completed!"
            form.reset();
            setTimeout(function(){
                ansForm.innerHTML = ""
            }, 3000)
        } else {
            alert("Error");
            ansForm.innerHTML = ""
        }
    }

    myForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formSend(e);
    })
}

export default form;