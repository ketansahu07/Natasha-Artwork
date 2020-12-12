$(document).ready(function() {
    $(function(){
        $("#nav").load("./components/nav.html"); 
        $("#footer").load("./components/footer.html"); 
        $("#loadLoginModal").load("./components/login.html"); 
    });

    $('#loginModal').modal('show');
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    // getting the categories for navbar
    let categories_url = "http://127.0.0.1:8000/api/categories";
    let categories_set;
    let get_categories = $.get(categories_url, function(data){
        // console.log(data.results)
        categories_set = data.results;
        $.each(categories_set, function(index, element) {
            let a_tag = $('<a class="nav-link nav_tab" href="#"></a>').attr("name", `${element.title}`).text(element.title);
            let li_tag = $('<li class="nav-item ml-2 mt-2"></li>').append(a_tag);
            $("#categories_list").append(li_tag);
        });
    });

    $.when(get_categories).done(function () {
        let nav_tabs = $(".nav_tab")
        $.each(nav_tabs, function(index) {
            $(this).click(function () {     // adding click function to each tab
                let url = "products.html?category=" + encodeURIComponent($(this).attr("name"));
                window.location.href = url;
            });
        });
    });
});