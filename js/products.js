$(document).ready(function() {
    // getting the categories for navbar
    let categories_url = "http://127.0.0.1:8000/api/categories";
    let categories_data;
    let get_categories_data = $.get(categories_url, function(data){
        // console.log(data.results[0])
        categories_data = data;
        $.each(data.results, function(index, element) {
            let a_tag = $('<a class="nav-link nav_tab"></a>').attr("href", `products.html?category=${element.title}`).text(element.title);
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

    let this_category_name = '';

    let get_this_cat_name = $.when(get_categories_data).done(function() {
        // function to get url for the clicked category -----> currently of no use
        function geturl(name) {     
            let obj = categories_data.results.find(item => item.title === name);
            return obj.url;
        }

        let queryString = new Array();
        $(function () {         // getting category name from the url (querystring)
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
            if (queryString["category"] != null) {
                this_category_name = queryString["category"];
                // this_category_url = geturl(this_category_name);
                $("#product_category").text(this_category_name);   // adding the category name to the header of the page
            }
        });
    });

    let products_url = "http://127.0.0.1:8000/api/products/";
    let products_data, product_set;
    // creating rows of products and appending them to the container
    $.when(get_this_cat_name).done(function() {     
        if(this_category_name != ''){
            products_url = `http://127.0.0.1:8000/api/products/?category=${this_category_name}`
        }
        $.get(products_url, {"category": this_category_name}).done(function(data){
            // console.log(data)
            products_data = data
            product_set = data.results
            let item = 0;
            while(item<product_set.length){
                let row = $('<div class="row row-content"></div>')
                let col = $('<div class="col-12"></div>')
                let flex_div = $('<div class="d-flex flex-wrap justify-content-around"></div>')
                for(let i=0; i<3; i++){
                    if(item<product_set.length){
                        let card = $('<div class="card m-2" style="width: 18rem;"></div>');
                        let card_img = $('<img class="card-img-top" src="../img/product_1.JPG" alt="Card image cap">');
                        let card_body = $('<div class="card-body"></div>');
                        let title = $('<h5 class="card-title"></h5>').text(product_set[item].title);
                        let description = $('<p class="card-text"><small class="text-muted"></p>').text(product_set[item].description);
                        let price = $('<p class="card-text"></p>').text(`₹${product_set[item].price}`);
                        card_body.append(title).append(description).append(price)
                        card.append(card_img).append(card_body)
                        flex_div.append(card)
                        item = item + 1;
                    }
                }
                col.append(flex_div)
                row.append(col)
                $("#rows").append(row)
            }
        });
    });

});