$(function () {
    $(".addQuestion").click(function () {
        $(".addQuestion").before('<div class="panel panel-default">' +

            '<div class="panel-body question">' +
            '<input class="type" type="hidden" value="1">' +
            '<input class="col-md-12 quesDetail" type="text" value="问题详情">' +
            '<input class="col-md-7 option_1" value="a选项"> <input class="col-md-5 score_1" value="评分">' +
            '<input class="col-md-7 option_2" value="b选项"> <input class="col-md-5 score_2" value="评分">' +
            '<input class="col-md-7 option_3" value="c选项"> <input class="col-md-5 score_3" value="评分">' +
            '<input class="col-md-7 option_4" value="d选项"> <input class="col-md-5 score_4" value="评分">' +
            '</div></div>');
    })
    $('.addDescription').click(function () {
        $(".addQuestion").before('<div class="panel panel-default" >' +
            '<input class="type" type="hidden" value="1">' +
            '<div class="panel-body question">' +
            '<textarea class="col-md-12 quesDetail" cols="2"  >题目描述</textarea>' +
            '</div></div>')
    })

    $('.btn_submit').click(function () {
        //alert('123');
        var title = $('#inputQuetitle').val();
        var detailed = $('#inputQueDet').val();
        alert(title + '     ' + detailed);
        var questionList = [];
        //var ques= $('#questions').children();
        //console.log(ques);
        $('.question').each(function () {
            var quesDetail = $(this).children('.quesDetail').val();
            var type = $(this).children('.type').val();
            var option_1 = $(this).children('.option_1').val();
            var option_2 = $(this).children('.option_2').val();
            var option_3 = $(this).children('.option_3').val();
            var option_4 = $(this).children('.option_4').val();
            var score_1 = $(this).children('score_1').val();
            var score_2 = $(this).children('score_2').val();
            var score_3 = $(this).children('score_3').val();
            var score_4 = $(this).children('score_4').val();
            console.log(quesDetail);
            var question = {
                "title": quesDetail,
                "type": type,
                "option": [
                    {
                        "text": option_1,
                        "value": score_1
                    },
                    {
                        "text": option_2,
                        "value": score_2
                    },
                    {
                        "text": option_3,
                        "value": score_3
                    },
                    {
                        "text": option_4,
                        "value": score_4
                    }
                ]
            }
            questionList.push(question);

        })
        //
        var json = {
            "paperTitle": title,
            "desc": detailed,
            "questionList":questionList

        };
        var data = JSON.stringify(json);
        //$.post("http://192.168.0.101:8081/admin/paper/create"
        //    ,data,function(e){
        //    console.log(e);
        //});

        //$.ajax({
        //    type: "POST",
        //    url: "http://123.56.227.132:8080/admin/paper/create",
        //    headers:{'Content-Type':'application/json'},
        //    processData:false,
        //    data: {
        //        "paperTitle": title,
        //        "desc": detailed,
        //        "questionList":questionList
        //
        //    },
        //    dataType: 'JSONP',
        //    success: function(msg){
        //        console.log( "Data Saved: " + msg );
        //    },
        //    error:function(msg){
        //        console.log(msg);
        //    }
        //});
        $.post('/insert',{data:data},function(e){console.log(e)}).done(function(){
            alert('success');
        })
    })


});

