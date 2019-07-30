datafromlocal = () => {

    const data = localStorage.getItem('logins') ? JSON.parse(localStorage.getItem('logins')) : [];
    return data;
}

addtolocal = (info) => {
    const data = datafromlocal();
    data.push(info);
    localStorage.setItem('logins', JSON.stringify(data));

}

window.addEventListener('load', () => {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (!valid('.wrapper', '#login-form', '#email', '#password')) {
            return;
        } else {

            let logins = {}
            $.each($(e.target).serializeArray(), function (_, kv) {
                if (logins.hasOwnProperty(kv.name)) {
                    logins[kv.name] = $.makeArray(logins[kv.name]);
                    logins[kv.name].push(kv.value);
                } else {
                    logins[kv.name] = kv.value;
                }
            });
            addtolocal(logins);
        }
    })
})

valid = (elex, eley, ele1, ele2, ele3, ele4, ele5) => {
    const elem1 = document.querySelector(ele1);
    const elem2 = document.querySelector(ele2);
    const elem3 = document.querySelector(ele3);
    const elem4 = document.querySelector(ele4);
    const elem5 = document.querySelector(ele5);
    let elearray = [elem1, elem2, elem3, elem4, elem5];
    const elemx = document.querySelector(elex);
    const elemy = document.querySelector(eley);
    let isvalid = false;
    let reset;
    reset = setTimeout(() => {
        if (document.querySelector('.msg')) {

            document.querySelector('.msg').remove();
        }
    }, 3000);
    for (let i = 0; i < elearray.length; i++) {

        if (elearray[i].value == '') {
            let div = document.createElement('div');
            div.className = 'msg';
            div.appendChild(document.createTextNode('Plz fill all the fields'));
            elemx.insertBefore(div, elemy);

            return isvalid;
        } else {
            if (document.querySelector('.msg')) {
                clearTimeout(reset);
                document.querySelector('.msg').remove();
            }
            return isvalid = true;
        }
    }
}

clearfield=(n,)=>{

}