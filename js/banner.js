// get data from local storage
getfromlocal = () => {
    let data = localStorage.getItem('banners') ? JSON.parse(localStorage.getItem('banners')) : [];
    return data;
}

prepareDomList = () => {
    let data = getfromlocal();
    var html = '';
    let dom = data.forEach((banner, index) => {
        html += `
        <li>
            <div class="w3ls_banner_txt">

                <h3 class="b-w3ltxt text-capitalize mt-md-4">${banner.title}</h3>

                <a href="${banner.readmore}" class="btn btn-banner my-sm-3 mr-2">Read More</a>

            </div>
        </li>
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
            <th wrap>Read More</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
`;
    data.forEach((banner, index) => {
        html += `
       <tr>
            <td>${index+1}</td>
            <td>${banner.title}</td>
            <td>${banner.readmore}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" data-id="${banner.id}" onClick="_editbanner(this);" class="btn btn-info"><i class="fa fa-edit"></i></button>
                    <button type="button" data-id="${banner.id}" onClick="_removebanner(this);" class="btn btn-danger"><i class="fa fa-trash"></i></button>
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

editbanner = (ctx) => {
    let id = ctx.getAttribute('data-id');
    const banners = getfromlocal()
    var data = banners.find(x => x.id === id);
    return data;
}
editbannerLocal = (banner) => {
    var index = findIndexInData(getfromlocal(), "id", banner.id)
    const banners = getfromlocal();
    banners[index] = banner
    localStorage.setItem('banners', JSON.stringify(banners))
}

function findIndexInData(data, property, value) {
    for (var i = 0, l = data.length; i < l; i++) {
        if (data[i][property] === value) {
            return i;
        }
    }
    return -1;
}

removebanner = (ctx) => {
    let id = ctx.getAttribute('data-id');
    var data = getfromlocal().filter(x => x.id != id)
    localStorage.setItem('banners', JSON.stringify(data))
}
addbanner = (banner) => {
    const banners = [...getfromlocal(), banner];
    localStorage.setItem('banners', JSON.stringify(banners))
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