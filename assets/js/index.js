$(function() {
        getUserInfo()

        layer = layui.layer;
        $('#btnLogout').on('click', function() {
            layer.confirm('确认退出吗？', { icon: 3, title: '提示' }, function(index) {
                //do something
                //清空本地存储中的token
                localStorage.removeItem('token');
                //重新跳转回登录页面
                location.href = '/login.html';
                layer.close(index);
            });
        })
    })
    //获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        //headers就是请求头配置对象
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
        },
        //无论成功还是失败都会调用complete回调函数
    })
}
//渲染用户的头像
function renderAvatar(user) {
    //获取用户的名称
    var name = user.nickname || user.username
        //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //按需渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}