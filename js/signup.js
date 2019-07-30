datafromlocal = () => {

    const data = localStorage.getItem('signups') ? JSON.parse(localStorage.getItem('signups')) : [];
    return data;
}

addtolocal = (info) => {
    const data = datafromlocal();
    data.push(info);
    localStorage.setItem('signups', JSON.stringify(data));

}

window.addEventListener('load', () => {
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        let signups = {}
        $.each($(e.target).serializeArray(), function (_, kv) {
            if (signups.hasOwnProperty(kv.name)) {
                signups[kv.name] = $.makeArray(signups[kv.name]);
                signups[kv.name].push(kv.value);
            } else {
                signups[kv.name] = kv.value;
            }
        });
        addtolocal(signups);
    })
})