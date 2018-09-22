var baseApiUrl = 'http://localhost/reactRouter/backend';
var baseAppUrl = 'http://localhost:3000/pages/article';
var per_page = 5;
function ajaxCall(url, method, data, onSuccessMethod, onFailMethod, ctype) {

    var procData = null
    var conType = false
	var credential = false
    var crossDom = true
    var data = data ? JSON.stringify(data) : null
   

    $.ajax({
      url: url,
      type: method,
      data: data,
      processData: procData,
      contentType: conType,
      crossDomain: crossDom,
      xhrFields: {
        withCredentials: credential
      },
      success: function(data) {
        onSuccessMethod(data)
      },
      error: function(err) {
        if (err.status == 503) {
        }
        onFailMethod(err)
      }
    })
  }



$(document).ready(function() {
	  $(".search").keyup(function () {
	    var searchTerm = $(".search").val();
	    var listItem = $('.results tbody').children('tr');
	    var searchSplit = searchTerm.replace(/ /g, "'):containsi('")
	    
	  $.extend($.expr[':'], {'containsi': function(elem, i, match, array){
	        return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	    }
	  });
	    
	  $(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
	    $(this).attr('visible','false');
	  });

	  $(".results tbody tr:containsi('" + searchSplit + "')").each(function(e){
	    $(this).attr('visible','true');
	  });

	  var jobCount = $('.results tbody tr[visible="true"]').length;
	    $('.counter').text(jobCount + ' item');
	  
	 });	  
});