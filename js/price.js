// get data from local storage
getfromlocal = () => {
    let data = localStorage.getItem('prices') ? JSON.parse(localStorage.getItem('prices')) : [];
    return data;
}

prepareDomList = () => {
    let data = getfromlocal();
    var html = '';
    let dom = data.forEach((price, index) => {
        html += `
        <div class="col-md-4 price-main price-main1  text-center mb-4">
            <div class="pricing-grid card">
                <div class="card-body ">
                    <span class="fa fa-${price.symbol}" aria-hidden="true"></span>
                    <h4 class="text-uppercase">${price.title}</h4>
                    <h5 class="card-title pricing-card-title">
                        <span >Rs.</span>${price.price}

                    </h5>
                    <p>${price.description}</p>
                    <div class="price-button mt-md-3 mt-2">
                        <a class="btn text-uppercase" href="${price.readmore}">
                            Read More</a>
                    </div>
                </div>
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
            <th wrap>symbol</th>
            <th wrap>Title</th>
            <th wrap>Prices</th>
            <th wrap>Description</th>
            <th wrap>Read More</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
`;
    data.forEach((price, index) => {
        html += `
       <tr>
            <td>${index+1}</td>
            <td>${price.symbol}</td>
            <td>${price.title}</td>
            <td>${price.price}</td>
            <td>${price.description}</td>
            <td>${price.readmore}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" data-id="${price.id}" onClick="_editprice(this);" class="btn btn-info"><i class="fa fa-edit"></i></button>
                    <button type="button" data-id="${price.id}" onClick="_removeprice(this);" class="btn btn-danger"><i class="fa fa-trash"></i></button>
                </div>
            </td>
       <tr>
        `;
    });
    if (!data.length)
        html += '<tr><td colspan="7" class="table-danger  text-center">No Data Found</td></tr>'
    html += `   </tbody>
    </table>`
    return html;
}

generateAdminDom = (element) => {
    var data = prepareAdminDomLsit();
    document.querySelector(element).innerHTML = data;
}

editprice = (ctx) => {
    let id = ctx.getAttribute('data-id');
    const prices = getfromlocal()
    var data = prices.find(x => x.id === id);
    return data;
}
editpriceLocal = (price) => {
    var index = findIndexInData(getfromlocal(), "id", price.id)
    const prices = getfromlocal();
    prices[index] = price
    localStorage.setItem('prices', JSON.stringify(prices))
}

function findIndexInData(data, property, value) {
    for (var i = 0, l = data.length; i < l; i++) {
        if (data[i][property] === value) {
            return i;
        }
    }
    return -1;
}

removeprice = (ctx) => {
    let id = ctx.getAttribute('data-id');
    var data = getfromlocal().filter(x => x.id != id)
    localStorage.setItem('prices', JSON.stringify(data))
}
addprice = (price) => {
    const prices = [...getfromlocal(), price];
    localStorage.setItem('prices', JSON.stringify(prices))
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