$(document).ready(function () { 

    function getUserElement(data) {
        let username = $(`<strong> ${data.username}</strong>`)
        let icon = $('<span class="fa fa-user fa-lg"></span>')
        let a_tag = $('<a class="nav-link" href="#"></a>').append(icon).append(username)
        let li_tag = $('<li id="username" class="nav-item"></li>').append(a_tag)
        return li_tag;
    }

    function isLoggedin(data){
        $('#nav_login').removeClass('d-sm-inline')
        $('#nav_login_mobile').addClass('d-none')
        localStorage.setItem('token', data.token)
        let nav_user = getUserElement(data);
        nav_user.addClass('d-none').addClass('d-sm-inline');
        $('#nav_icons').append(nav_user);
        let dropdown_user = getUserElement(data);
        dropdown_user.addClass('d-sm-none');
        $('#dropdown_login').append(dropdown_user)
    }

    function onSuccess(data) {
        $('#loginModal').modal('toggle')
        isLoggedin(data);
    }

    function refreshToken(oldData) {
        let url = "http://127.0.0.1:8000/api/auth/token/refresh/";
        let token = oldData.token
        $.ajax({
            type: 'POST',
            url: url,
            data: {'token': token},
            success: function(newData) {
                oldData = newData;
            },
            error: function() {
                alert("error in refresh token");
            }
        });
        return oldData;
    }

    $(function() {
        let token = localStorage.getItem('token');
        if(token != null) {
            let url = "http://127.0.0.1:8000/api/token/verify/";
            $.ajax({
                type: 'POST',
                url: url,
                data: {'token': token},     
                success: function(data){
                    freshData = refreshToken(data);
                    isLoggedin(freshData);
                },
                error: function(data){
                    alert("token expired login again");
                    localStorage.setItem('token', '')
                }
            });
        }
    });
    
    $('#loginForm').submit(function(event) {
        event.preventDefault();
        var form = $(this);
        var url = "http://127.0.0.1:8000/api/auth/login/";
    
        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {
               onSuccess(data); // show response from the php script.
            },
            error: function(data){
                console.log(data);
            }
        });
    });
});