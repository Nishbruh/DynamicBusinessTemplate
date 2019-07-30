const authorurl = 'localhost:8081/posts/';


getauthorpost = () => {
    apicall.get(authorurl, {}, successgetauthor, failureCallback);
}
successgetauthor = (result) => {
    generateAdminDom('#authorList', result);
}
failureCallback = (err) => {
    alert('Error occured!!!');
}


generateAdminDom = (element, data) => {
    var html = `
    <table class="table table-bordered table-hover table-stripped">
    <thead>
        <tr>
            <th>#</th>
            <th wrap>Author</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
`;
    data.forEach((author, index) => {
        console.log(author);
        html += `
       <tr>
            <td>${index+1}</td>
            <td>${author.author}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" data-id="${author._id}" onClick="_editauthor(this);" class="btn btn-info"><i class="fa fa-edit"></i></button>
                    <button type="button" data-id="${author._id}" onClick="_removeauthor(this);" class="btn btn-danger"><i class="fa fa-trash"></i></button>
                </div>
            </td>
       <tr>
        `;
    });
    if (!data.length)
        html += '<tr><td colspan="4" class="table-danger  text-center">No Data Found</td></tr>'
    html += `   </tbody>
    </table>`
    document.querySelector(element).innerHTML = html;
}