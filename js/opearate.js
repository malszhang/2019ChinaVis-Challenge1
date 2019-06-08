$("#new").click(function(){
	var days = $("#day").val();
		$.get('json/day' + days + '_person.json', function(data) {
			var html = "";
			for (var i = 0; i < data.length; i++) {
				html += "<option value=\"" + data[i].id + "\">" + data[i].id + "</option>"
			}
			$("#pid").append(html);
		})
})

var p = 0
$("#add").click(function(){
	var day = $("#day").val();
	var pid = $("#pid").val();
	p++;
	$.get('json/day' + day + '_person.json', function(data) {
		Heap(data,pid,p)
	});
	$.get('json/day' + day + '_links.json', function(data) {
		Link(data)
	});
})