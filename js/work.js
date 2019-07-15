// get data from local storage

getfromlocal = () => {
    let data = localStorage.getItem('works') ? JSON.parse(localStorage.getItem('works')) : [];

    return data;
}

prepareDomList = () => {
    let data = getfromlocal();
    var html = '';
    var htmlarray = [];
    let dom = data.forEach((work, index) => {
        html = `
        <div class="col-md-2">
            <span class="fa fa-${work.symbol}"></span>
        </div>
        <div class="col-md-10">
            <h4 class="mt-md-0 mt-2">${work.title}</h4>
            <p class="mt-3">${work.description}</p>
            <a href="#" class="btn">${work.readmore}</a>
        </div>
        `;
        htmlarray.push(html);
    });


    return htmlarray;
}


generateDom = (element, data) => {
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
    data.forEach((work, index) => {
        html += `
       <tr>
            <td>${index+1}</td>
            <td>${work.title}</td>
            <td>${work.description}</td>
            <td>${work.symbol}</td>
            <td>${work.readmore}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" data-id="${work.id}" onClick="_editwork(this);" class="btn btn-info"><i class="fa fa-edit"></i></button>
                    <button type="button" data-id="${work.id}" onClick="_removework(this);" class="btn btn-danger"><i class="fa fa-trash"></i></button>
                </div>
            </td>
       <tr>
        `;
    });
    if (!data.length)
        html += '<tr><td colspan="5" class="table-danger  text-center">No Data Found</td></tr>'
    html += `   </tbody>
    </table>`
    return html;
}

generateAdminDom = (element) => {
    var data = prepareAdminDomLsit();
    document.querySelector(element).innerHTML = data;
}

editwork = (ctx) => {
    let id = ctx.getAttribute('data-id');
    const works = getfromlocal()
    var data = works.find(x => x.id === id);
    return data;
}
editworkLocal = (work) => {
    var index = findIndexInData(getfromlocal(), "id", work.id)
    const works = getfromlocal();
    works[index] = work
    localStorage.setItem('works', JSON.stringify(works))
}

function findIndexInData(data, property, value) {
    for (var i = 0, l = data.length; i < l; i++) {
        if (data[i][property] === value) {
            return i;
        }
    }
    return -1;
}

removework = (ctx) => {
    let id = ctx.getAttribute('data-id');
    var data = getfromlocal().filter(x => x.id != id)
    localStorage.setItem('works', JSON.stringify(data))
}
addwork = (work) => {
    const works = [...getfromlocal(), work];
    localStorage.setItem('works', JSON.stringify(works))
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