let input = document.querySelector('#name').value;
dataformat = () => {
    let html = `
        <div class="col-md-2 d-flex justify-content-center align-items-center" id="sign">
            <i class="fa fa-exclamation-triangle  "></i>
        </div>
        <div class="col-md-8 text-white d-flex justify-content-center align-items-center" id="desc">
            <p id="pp">Plz fill all the fields</p>
        </div>
        <div class="col-md-2 d-flex justify-content-center align-items-center" id="close">
            <i class="fa fa-times" id="cross"></i>
        </div>`;
    return html;
}

generatedata = (element) => {
    let data = dataformat();
    let toaster = document.createElement('div');
    toaster.className = ' row'
    toaster.id = 'toaster'
    toaster.innerHTML = data;
    document.querySelector(element).appendChild(toaster);



}
fadeaway = () => {
    document.querySelector('#toaster').addEventListener('mouseenter', () => {
        console.log('oie');
        generatedata('.form');
    });
}