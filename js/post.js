const apiUri = 'http://localhost:8081/'
getPosts = () => {
    apicall.get(apiUri + 'posts', {}, getPostsSuccessCallBack, failureCallback)
}
getPostsSuccessCallBack = (result) => {
    generateDom(result)
}
failureCallback = (err) => {
    alert("error Occured")
}


generateDom = (data) => {
    var html = `<div class="table-responsive">
    <table class="table table-bordered table-hover table-stripped">
    <thead>
        <tr>
            <th>#</th>
            <th >Title</th>
            <th >Description</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
`;
    data.forEach((post, index) => {
        html += `
       <tr>
            <td>${index+1}</td>
            <td>${post.title}</td>
            <td>${post.description}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" data-id="${post._id}" onClick="_editpost(this);" class="btn btn-info"><i class="fa fa-edit"></i></button>
                    <button type="button" data-id="${post._id}" onClick="_removepost(this);" class="btn btn-danger"><i class="fa fa-trash"></i></button>
                </div>
            </td>
       <tr>
        `;
    });
    if (!data.length)
        html += '<tr><td colspan="6" class="table-danger  text-center">No Data Found</td></tr>'
    html += `   </tbody>
    </table></div>`
    document.querySelector('#postList').innerHTML = html;
}

addpost = (post) => {
    apicall.post(apiUri + 'posts', post, addpostSuccessCallBack, failureCallback)
}
addpostSuccessCallBack = (data) => {
    getPosts();
}
editpostLocal = (post) => {
    apicall.patch(apiUri + 'posts/' + post._id, post, editpostLocalSuccessCallBack, failureCallback)
}
editpostLocalSuccessCallBack = (data) => {
    getPosts()
}
editpost = (ctx) => {
    let id = ctx.getAttribute('data-id');
    apicall.get(apiUri + 'posts/' + id, {}, editPostSuccessCallBack, failureCallback)
}
editPostSuccessCallBack = (result) => {
    populateData("#post-form", result)
}
removepost = (ctx) => {
    let id = ctx.getAttribute('data-id');
    apicall.delete(apiUri + 'posts/' + id, {}, removepostSuccessCallBack, failureCallback)
}
removepostSuccessCallBack = () => {
    getPosts()
}

_getPostsSelectList = () => {
    apicall.get(apiUri + 'posts', {}, generateSelectList, failureCallback)
}

generateSelectList = (posts) => {
    const post = posts
    var html = '<option>--Select--</option>'
    html += post.map(pos => {
        return `<option value="${pos._id}">${pos.title}</option>`
    })
    document.querySelector("#_author").innerHTML = html
    document.querySelector("#_category").innerHTML = html
}