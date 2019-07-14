// get data from local storage
getfromlocal = () => {
    let data = localStorage.getItem('services') ? JSON.parse(localStorage.getItem('services')) : [];
    return data;
}

prepareDomList = () => {
    let data = getfromlocal();
    var html = '';
    let dom = data.forEach((service, index) => {
        html += `
        <div class="col-lg-4 col-md-6 col-sm-6 mb-5">
            <div class="bottom-gd">
                <span>${index +1}</span>
                <h3 class="mt-4">${service.title}</h3>
                <p class="mt-2">${service.description}</p>
            </div>
        </div>
        `;
    });
    return html;
}


generateDom = (element) => {
    var data = prepareDomList();

    document.querySelector(element).innerHTML = data;
}

prepareAdminDomLsit = () => {
    let data = getfromlocal();
    var html = `
    <table class="table table-bordered table-hover table-stripped">
    <thead>
        <tr>
            <th>#</th>
            <th wrap>Title</th>
            <th wrap>Description</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
`;
    data.forEach((service, index) => {
        html += `
       <tr>
            <td>${index+1}</td>
            <td>${service.title}</td>
            <td>${service.description}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" data-id="${service.id}" onClick="_editService(this);" class="btn btn-info"><i class="fa fa-edit"></i></button>
                    <button type="button" data-id="${service.id}" onClick="_removeService(this);" class="btn btn-danger"><i class="fa fa-trash"></i></button>
                </div>
            </td>
       <tr>
        `;
    });
    if (!data.length)
        html += '<tr><td colspan="4" class="table-danger  text-center">No Data Found</td></tr>'
    html += `   </tbody>
    </table>`
    return html;
}

generateAdminDom = (element) => {
    var data = prepareAdminDomLsit();
    document.querySelector(element).innerHTML = data;
}

editService = (ctx) => {
    let id = ctx.getAttribute('data-id');
    const services = getfromlocal()
    var data = services.find(x => x.id === id);
    return data;
}
editServiceLocal = (service) => {
    var index = findIndexInData(getfromlocal(), "id", service.id)
    const services = getfromlocal();
    services[index] = service
    localStorage.setItem('services', JSON.stringify(services))
}

function findIndexInData(data, property, value) {
    for (var i = 0, l = data.length; i < l; i++) {
        if (data[i][property] === value) {
            return i;
        }
    }
    return -1;
}

removeService = (ctx) => {
    let id = ctx.getAttribute('data-id');
    var data = getfromlocal().filter(x => x.id != id)
    localStorage.setItem('services', JSON.stringify(data))
}
addService = (service) => {
    const services = [...getfromlocal(), service];
    localStorage.setItem('services', JSON.stringify(services))
}

populateData = (frm, data) => {
    if (data) {
        $.each(data, function (key, value) {
            let ctrl = $('[name=' + key + ']', $(frm));
            switch (ctrl.prop("type")) {
                case "radio":
                case "checkbox":
                    ctrl.attr('checked', value);
                    break;
                default:
                    ctrl.val(value);
            }
        });
    }
}