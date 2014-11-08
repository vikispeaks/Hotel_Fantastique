// you can enter your JS here!

$(document).ready(function(){  
  	pagination(); 
    
    $('th').click(function(){
	    var table = $(this).parents('table').children('tbody');
      var rows = table.children('tr').toArray().sort(comparer($(this).index()));
		  this.asc = !this.asc;
	    if (!this.asc){rows = rows.reverse();}
	    for (var i = 0; i < rows.length; i++){table.append(rows[i]);}
    });

    $('.room_quantity select').change(function(){
      table_calc($(this));
    });

    $('.one_photo').on('click', function(e) {
        e.preventDefault();
        photo_popup($(this));
    });
  
    $('#lightbox').on('click', function() { 
      $('#lightbox').hide();
    });

}); 

function pagination(){
	var show_per_page = 5;  
    var number_of_items = $('.reviews_list li').length;  
    var number_of_pages = Math.ceil(number_of_items/show_per_page);  
  	$('#current_page').val(0);  
    $('#show_per_page').val(show_per_page);  
  	var navigation_html = '<a class="previous_link" href="javascript:previous();">Prev</a>';  
    var current_link = 0;  
    while(number_of_pages > current_link){  
        navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link +')" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';  
        current_link++;  
    }  
    navigation_html += '<a class="next_link" href="javascript:next();">Next</a>';  
  	$('.page_navigation').html(navigation_html);  
  	$('.page_navigation .page_link:first').addClass('active_page');  
  	$('.reviews_list li').css('display', 'none');  
  	$('.reviews_list li').slice(0, show_per_page).css('display', 'block');
} 
  
function previous(){  
  	new_page = parseInt($('#current_page').val()) - 1;  
    if($('.active_page').prev('.page_link').length==true){  
        go_to_page(new_page);  
    }  
}  
  
function next(){  
    new_page = parseInt($('#current_page').val()) + 1;  
    if($('.active_page').next('.page_link').length==true){  
        go_to_page(new_page);  
    }  
}

function go_to_page(page_num){  
    var show_per_page = parseInt($('#show_per_page').val());  
  	start_from = page_num * show_per_page;  
  	end_on = start_from + show_per_page;  
  	$('.reviews_list li').css('display', 'none').slice(start_from, end_on).css('display', 'block');  
  	$('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');  
  	$('#current_page').val(page_num);  
} 
 
function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index);
        var valB = getCellValue(b, index);
        if(valA.charAt(0) == '\u20AC')
        {
            valA = valA.substring(1);
            valB = valB.substring(1);
        }        
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
    }
}

function getCellValue(row, index){ 
  return $(row).children('td').eq(index).html();
}

function photo_popup(thisEle){
    var thisEle = thisEle;
    var image_href = $(thisEle).children('a').attr("href");
        if ($('#lightbox').length > 0) { 
          $('#content').html('<span>Prev</span><img src="' + image_href + '" /><span>Next</span>');
          $('#lightbox').show();
        }
        else {       
          var lightbox = 
          '<div id="lightbox">' +
            '<div id="content">' + '<span>Prev</span>' +
              '<img src="' + image_href +'" />' + '<span>Next</span>' +
            '</div>' +  
          '</div>';            
          $('body').append(lightbox);
        }  
}

function table_calc(thisElem){
    var thisElem = thisElem;
    var no_of_rooms = $(thisElem).val();
    var room_price = $(thisElem).parent('td').prev('td').text().substring(1);
    var total_price = (no_of_rooms*room_price).toFixed(2);
    var total_cost = 0;
    $(thisElem).parent('td').next('td').text('\u20AC'+total_price);
    $("td.room_cost").each(function() {
      var value = $(this).text().substring(1);
      total_cost += parseFloat(value);
    });
    $('.room_total_cost').text('\u20AC'+total_cost.toFixed(2));
}