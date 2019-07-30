const authToken = localStorage.getItem('auth-token') ? localStorage.getItem('auth-token') : 'no-token';
var apicall = {
    get: function (url, data, successCallback, failureCallback, authorization = 'auth-token') {
        axios.get(url, {
                'headers': {
                    'auth-token': authToken
                }
            })
            .then((response => {
                successCallback(response.data)
            })).catch(error => {
                failureCallback(error)
            })
    },
    delete: function (url, data, successCallback, failureCallback) {
        axios.delete(url, {
                'headers': {
                    'auth-token': authToken
                }
            })
            .then((response => {
                successCallback(response.data)
            })).catch(error => {
                failureCallback(error)
            })
    },
    post: function (url, data, successCallback, failureCallback) {
        axios.post(url, data, {
                'headers': {
                    'auth-token': authToken
                }
            })
            .then((response => {
                successCallback(response.data)
            })).catch(error => {
                failureCallback(error)
            })
    },
    patch: function (url, data, successCallback, failureCallback) {
        axios.patch(url, data, {
                'headers': {
                    'auth-token': authToken
                }
            })
            .then((response => {
                successCallback(response.data)
            })).catch(error => {
                failureCallback(error)
            })
    },
    upload: function (url, data, successCallback, failureCallback) {
        axios.post(url, data, {
                'headers': {
                    'content-type': 'multipart/form-data',
                    'auth-token': authToken,
                    'processData': false
                }
            })
            .then((response => {
                successCallback(response.data)
            })).catch(error => {
                failureCallback(error)
            })
    },
    error: function (res) {
        alert('Something Went Wrong')
    },
}

parseFormData = (e) => {
    const data = {};
    $.each($(e.target).serializeArray(), function (_, kv) {
        if (data.hasOwnProperty(kv.name)) {
            data[kv.name] = $.makeArray(data[kv.name]);
            data[kv.name].push(kv.value);
        } else {
            data[kv.name] = kv.value;
        }
    });
    return data;
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