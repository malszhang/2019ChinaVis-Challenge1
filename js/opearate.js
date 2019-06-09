$("#new").click(function(){
	var days = $("#day").val();
		$.get('json/day' + days + '_person.json', function(data) {
			var html = "";
			for (var i = 0; i < data.length; i++) {
				html += "<option value=\"" + data[i].id + "\">" + data[i].id + "</option>"
			}
			$("#pid").append(html);
		})
		$.get('json/day' + days + '_links.json', function(data) {
			Link(data)
		});
})

$("#add").click(function(){
	var day = $("#day").val();
	var pid = $("#pid").val();
	$.get('json/day' + day + '_person.json', function(data) {
			Heap(data,pid)
		
	});
	
})