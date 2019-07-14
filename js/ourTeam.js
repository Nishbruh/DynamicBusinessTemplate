// get data from local storage
getfromlocal = () => {
    let data = localStorage.getItem('ourteam') ? JSON.parse(localStorage.getItem('ourteam')) : [];
    return data;
}

prepareDomList = () => {
    let data = getfromlocal();
    var html = '';
    let dom = data.forEach((team, index) => {
        html += `
        <div class="col-lg-4 col-md-6 col-sm-6 mb-5">
            <div class="bottom-gd">
                <span>${index +1}</span>
                <h3 class="mt-4">${team.title}</h3>
                <p class="mt-2">${team.description}</p>
            </div>
        </div>
        `;
    });
    return html;
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
            return (e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

generateDom = (element) => {
    var data = prepareDomList();

    document.querySelector(element).innerHTML = data;
}

prepareAdminDomLsit = () => {
    let data = getfromlocal();
    var html = `<div class="table-responsive">
    <table class="table table-bordered table-hover table-stripped">
    <thead>
        <tr>
            <th>#</th>
            <th >Image</th>
            <th >Name</th>
            <th >Title</th>
            <th >Facebook</th>
            <th >Twitter</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
`;
    data.forEach((ourTeam, index) => {
        html += `
       <tr>
            <td>${index+1}</td>
            <td class="text-center"> <img src="${ourTeam.avatar}" style="border:3px solid black; height:40px;width:40px;border-radius:50%" /></td>
            <td>${ourTeam.name}</td>
            <td>${ourTeam.title}</td>
            <td>${ourTeam.facebook}</td>
            <td>${ourTeam.twitter}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" data-id="${ourTeam.id}" onClick="_editourteam(this);" class="btn btn-info"><i class="fa fa-edit"></i></button>
                    <button type="button" data-id="${ourTeam.id}" onClick="_removeourteam(this);" class="btn btn-danger"><i class="fa fa-trash"></i></button>
                </div>
            </td>
       <tr>
        `;
    });
    if (!data.length)
        html += '<tr><td colspan="6" class="table-danger  text-center">No Data Found</td></tr>'
    html += `   </tbody>
    </table></div>`
    return html;
}

generateAdminDom = (element) => {
    var data = prepareAdminDomLsit();
    document.querySelector(element).innerHTML = data;
}

editourteam = (ctx) => {
    let id = ctx.getAttribute('data-id');
    const teams = getfromlocal()
    var data = teams.find(x => x.id === id);
    return data;
}
editourteamLocal = (ourteam) => {
    const teams = getfromlocal();
    var index = findIndexInData(teams, "id", ourteam.id)
    teams[index] = ourteam
    localStorage.setItem('ourteam', JSON.stringify(teams))
}

function findIndexInData(data, property, value) {
    for (var i = 0, l = data.length; i < l; i++) {
        if (data[i][property] === value) {
            return i;
        }
    }
    return -1;
}

removeourteam = (ctx) => {
    let id = ctx.getAttribute('data-id');
    var data = getfromlocal().filter(x => x.id != id)
    localStorage.setItem('ourteam', JSON.stringify(data))
}
addourteam = (ourteam) => {
    const teams = [...getfromlocal(), ourteam];
    localStorage.setItem('ourteam', JSON.stringify(teams))
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