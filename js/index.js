$(document).ready(function () {
    // getting the categories for navbar
    let categories_url = "http://127.0.0.1:8000/api/categories";
    let categories_data;
    let get_categories_data = $.get(categories_url, function(data){
        // console.log(data.results[0])
        categories_data = data;
        $.each(data.results, function(index, element) {
            let a_tag = $('<a class="nav-link nav_tab" href="#"></a>').attr("name", `${element.title}`).text(element.title);
            let li_tag = $('<li class="nav-item"></li>').append(a_tag);
            $("#categories_list").append(li_tag);
        });
    });

    $.when(get_categories_data).done(function () {
        let nav_tabs = $(".nav_tab")
        $.each(nav_tabs, function(index) {
            $(this).click(function () {     // adding click function to each tab
                let url = "products.html?category=" + encodeURIComponent($(this).attr("name"));
                window.location.href = url;
            });
        });
    });
});