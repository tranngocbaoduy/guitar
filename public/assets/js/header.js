// load category
$.ajax({
    type: 'GET',
    url: '/getAllCategory',
    dataType: 'json',
    success: function (result) {
        let htmlHeader = '';
        let htmlFooter = '';
        let htmlNavigationLeft = '';
        let count = 0;
        // Kết quả là một object json
        // Nên ta sẽ loop result
        console.log(result);
        $.each(result['categories'], function (key, item) {
            htmlHeader += '<li><a href=\"getProductByIdCategory=';
            htmlHeader += item['id'];
            htmlHeader += '\">';
            htmlHeader += item['name'];
            htmlHeader += '</a></li>';

            htmlFooter += '<li><a href=\"getProductByIdCategory=';
            htmlFooter += item['id'];
            htmlFooter += '\">';
            htmlFooter += item['name'];
            htmlFooter += '</a></li><br>';
        });
        // alert(html);
        $("#cate").append(htmlHeader);
        $(".list-category").append(htmlHeader);
        $(".list-category-footer").append(htmlFooter);


    },
    error: function(result){
        alert("Không thể load dữ liệu" );
    }
});


// login
let token = localStorage.getItem('tokenCustomer');

if(token== null || token == ''){
    let html = '';
    html+= ' <a href="/userLogin" >LOGIN</a>';

    $('#logged').html(html);
}else{
    let data = {
        token:token,
    }
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: '/checkLogin',
        data:data,
        cache:false,
        success: function (result) {
            console.log('Send request success');
            if(result['status']){
                let html = '';
                html +='' +
                    '                        <a class="dropdown-toggle" data-toggle="dropdown">Hello '+ result['customer']['name']+'\n' +
                    '                        <span class="caret"></span></a>\n' +
                    '                    <ul class="dropdown-menu">\n' +
                    '                        <li><a href="/userLogin" id="your-login">My Account</a></li>\n' +
                    '                    <li><a href="#" id="your-logout">Logout</a></li>\n' +
                    '                    </ul>\n';

                $('#logged').html(html);

                $('#your-logout').click(function () {
                    localStorage.removeItem('tokenCustomer');
                    window.location.assign('/userLogin');
                });

            }else{
                let html = '';
                html+= ' <a href="/userLogin" >LOGIN</a>';

                $('#logged').html(html);

            }
        },
        error: function(result){
            alert("Request Failed" );
        }
    });

}






