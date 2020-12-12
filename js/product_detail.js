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
        // console.log(data.results[0])
        categories_set = data.results;
        $.each(categories_set, function(index, element) {
            let a_tag = $('<a class="nav-link nav_tab" href="#"></a>').attr("name", `${element.title}`).text(element.title);
            let li_tag = $('<li class="nav-item"></li>').append(a_tag);
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

    let category_name = '', product_id = '';
    let queryString = new Array();
    function get_product_id() {         // getting category name and product id from the url (querystring)
        if (queryString.length == 0) {
            if (window.location.search.split('?').length > 1) {
                let params = window.location.search.split('?')[1].split('&');
                for (let i = 0; i < params.length; i++) {
                    let key = params[i].split('=')[0];
                    let value = decodeURIComponent(params[i].split('=')[1]);
                    queryString[key] = value;
                }
            }
        }
        // console.log(queryString)
        if(queryString["category"] != null) {
            category_name = queryString["category"];
        }
        if(queryString["product"] != null){
            product_id = queryString["product"];
        }
    }

    function createDetailTemplate(product){
        let title = $('<h3></h3>').text(product.title);
        let p_category = $('<p class="mb-2 text-muted text-uppercase small"></p>').text(category_name);
        let price = $(`<h5 class="mt-4"><span class="mr-1"><strong>₹${product.price}</strong></span></h5>`)
        let description = $(`<p class="pt-1 mt-4">${product.description}</p>`)
        $("#details").append(title)
                     .append(p_category)
                     .append(price)
                     .append(description);
    }

    $(function(){
        
        get_product_id();       // calling the function to get product id from the query string

        let product_url = `http://127.0.0.1:8000/api/products/-1`
        if(product_id != ''){
            product_url = `http://127.0.0.1:8000/api/products/${product_id}`
        }

        $.get(product_url, function(data) {
            console.log(data);
            product = data;
            createDetailTemplate(product);
        });
    });

    // $.ajax({
    //     type: 'POST',
    //     data: form.serialize(),
    //     url: 'http://127.0.0.1:8000/api/accounts/login',
    //     success: function(data){
    //         console.log(data);
    //     },
    //     error: function(response){
    //       console.log(response);  
    //     },
    // });
});