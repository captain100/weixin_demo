$(function(){
	$(".addQuestion").click(function(){
		$(".addQuestion").before('<div class="panel panel-default">' +

			'<div class="panel-body">' +
			'<input class="col-md-12" type="text" value="问题详情">' +
			'<input class="col-md-7" value="a选项"> <input class="col-md-5" value="评分">' +
			'<input class="col-md-7" value="b选项"> <input class="col-md-5" value="评分">' +
			'<input class="col-md-7" value="c选项"> <input class="col-md-5" value="评分">' +
			'<input class="col-md-7" value="d选项"> <input class="col-md-5" value="评分">' +
			'</div></div>');
	})
	$('.addDescription').click(function(){
		$(".addQuestion").before('<div class="panel panel-default" >' +
			'<div class="panel-body">' +
			'<textarea class="col-md-12" cols="2"  >题目描述</textarea>' +
			'</div></div>')
	})

	// $("#btn1").click(function () {
	//         $("#test1").text(function (i, origText) {
	//             return "Old text: " + origText
	//                 + " New text: Hello world! (index: " + i + ")";
	//         });
	//     });

 //    $("#btn2").click(function () {
	//         $("#test2").html(function (i, origText) {
	//             return "Old html: " + origText
	//                 + " New html: Hello <b>world!</b> (index: " + i + ")";
	//         });
	//     });

	
});

