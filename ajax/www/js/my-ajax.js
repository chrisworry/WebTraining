(function() {

    $('#btn1').click(function() {
        let user = $('#user1').val();
        let pass = $('#pass1').val();
        $.ajax({
            dataType:'json',
            type:'get',
            url:`/login2?user=${user}&pass=${pass}`,
            success(data) {
                $('#my-status').html(data.msg);
            },
            error(err) {
                alert('ajax failed.' + err);
            }
        })
    });

    $('#btn2').click(function() {
        let user = $('#user2').val();
        let pass = $('#pass2').val();
        $.ajax({
            dataType:'json',
            type:'post',
            url:'/login2',
            data: {user:user, pass:pass},
            success(data) {
                $('#my-status').html(data.msg);
            },
            error(err) {
                alert('ajax failed.' + err);
            }
        })
    });

    $('#btn3').click(function() {
        let formData = new FormData();
        formData.append('file',  $('#file1')[0].files[0]);
        $.ajax({
            type:'post',
            url:'/file2',
            cache: false,
            data: formData, 
            processData: false,
            contentType: false,
            //success(data) {
            //    $('#my-status').html(data.msg);
            //},
            error(err) {
                alert('ajax failed.' + err);
            }
        }).done(function(data){
            $('#my-status').html(data.msg);
        });
    });


})();