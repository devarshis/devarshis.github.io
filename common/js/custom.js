
/*-----------Slide Show Handlers--------------*/

function showSlideShow(){
	document.getElementById("slideShowDiv").style.display="block";
}

function closeSlideShow(){
	document.getElementById("slideShowDiv").style.display="none";
}

/*SLIDE SHOW HANDLER*/
var slideIndex = 0;
function startSlideshow() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    
    
    if(keepGoing) {
    	setTimeout(startSlideshow, 2000);
	}
}

function startLoop($isstring) {		    
  	$.ajax({
  	    url: 'backend_gen.php',
  	    type: 'POST',
  	    data:{$isstring},
  	    success: function(result) {
  	        $('.slideShowCnt').html(result);
  	
        	keepGoing = true;
        	startSlideshow();
  	    }
  	})
  	
}

function stopLoop() {
	   keepGoing = false;
}

/*END OF SLIDE SHOW HANDLER*/	

/*-----------End Of Slide Show Handler----------*/

function downloadSelected() {
    $masterarray = {};
    $(".gallery input:checkbox").each(function(i) {
	     if ($(this).prop('checked')==true){ 
	        var $ANM = $(this).parents('.maindivbox').find('#albumName').text();
	     	var $data = $(this).parents('.maindivbox').find('.img-container').attr('onclick');
	        var params = $data.split("showSlideShow(),startLoop('")[1].split('=====');
	        
			params[params.length - 1] = params[params.length - 1].replace("')");
	        $masterarray[$ANM] = params;
	    }
	});
	
    if(!$.isEmptyObject($masterarray)) {
		modalPutStatic();
		$.ajax({
	  	    url: 'backend_gen.php',
	  	    type: 'POST',
	  	    data:{$masterarray},
	  	    success: function(result) {
	  	        $str = '<div class="column-xs-12 column-md-6 modal-content"><span class="close">&times;</span><a href="'+result+'" id="downloadlink"><button class="downloadbutton">Download</button></a></div>';
	            $('#myModal').html($str);
	            progressbar();
	  	    }
	  	})
	} else {
		alert('Please select atleast one album');
	}
}

function downloadAll() {
	$masterarray = {};
	$(".maindivbox").each(function(i) {
	    $ANM = $(this).find('#albumName').text();
	 	var $data = $(this).find('.img-container').attr('onclick');
	    var params = $data.split("showSlideShow(),startLoop('")[1].split('=====');
	 	params[params.length - 1] = params[params.length - 1].replace("')");
		$masterarray[$ANM] = params;
	});

	if(!$.isEmptyObject($masterarray)) {
		modalPutStatic();
		$.ajax({
	  	    url: 'backend_gen.php',
	  	    type: 'POST',
	  	    data:{$masterarray},
	  	    success: function(result) {
	  	        $str = '<div class="column-xs-12 column-md-6 modal-content"><span class="close">&times;</span><a href="'+result+'" id="downloadlink"><button class="downloadbutton">Download</button></a></div>';
	            $('#myModal').html($str);
	            progressbar();
	  	    }
	  	})
	} else {
		alert('Please select atleast one album');
	}
}

function downloadThis(obj) {
    $masterarray = {};
	$ANM = $(obj).parents('.maindivbox').find('#albumName').text();
 	var $data = $(obj).parents('.maindivbox').find('.img-container').attr('onclick');
    var params = $data.split("showSlideShow(),startLoop('")[1].split('=====');
    
	params[params.length - 1] = params[params.length - 1].replace("')");
    $masterarray[$ANM] = params;
    
	if(!$.isEmptyObject($masterarray)) {
		modalPutStatic();
		$.ajax({
	  	    url: 'backend_gen.php',
	  	    type: 'POST',
	  	    data:{$masterarray},
	  	    success: function(result) {
	  	        $str = '<div class="column-xs-12 column-md-6 modal-content"><span class="close">&times;</span><a href="'+result+'" id="downloadlink"><button class="downloadbutton">Download</button></a></div>';
	            $('#myModal').html($str);
	            progressbar();
	  	    }
	  	})
	} else {
		alert('Please select atleast one album');
	}
}

function driveSelected() {
    $masterarray = {};
	$(".gallery input:checkbox").each(function(i) {
	     if ($(this).prop('checked')==true){ 
	        var $ANM = $(this).parents('.maindivbox').find('#albumName').text();
	     	var $data = $(this).parents('.maindivbox').find('.img-container').attr('onclick');
	        var params = $data.split("showSlideShow(),startLoop('")[1].split('=====');
	        
			params[params.length - 1] = params[params.length - 1].replace("')");
	        $masterarray[$ANM] = params;
	    }
	});
	
	if(!$.isEmptyObject($masterarray)) {
        modalPutStatic();
    	$.ajax({
	  	    url: 'drive_upload.php',
	  	    type: 'POST',
	  	    data:{$masterarray},
	  	    success: function(result) {
	        	$result = $.parseJSON(result);
      	    	if(!$result.isLogin) {
      	    	    var newWin = window.open($result.link);    
      	    	    if(!newWin || newWin.closed || typeof newWin.closed=='undefined') { 
                        alert('Please allow pop-ups blocked');
                    }
      	    	} else {
      	    		hideModal();
      	    	}
	  	    }
	  	})
	} else {
		alert('Please select atleast one album');
	}
}

function driveAll() {
            
	$masterarray = {};
	$(".maindivbox").each(function(i) {
	    $ANM = $(this).find('#albumName').text();
     	var $data = $(this).find('.img-container').attr('onclick');
        var params = $data.split("showSlideShow(),startLoop('")[1].split('=====');
     	params[params.length - 1] = params[params.length - 1].replace("')");
		$masterarray[$ANM] = params;
	});
	
	if(!$.isEmptyObject($masterarray)) {
    	modalPutStatic();
		$.ajax({
	  	    url: 'drive_upload.php',
	  	    type: 'POST',
	  	    data:{$masterarray},
	  	    success: function(result) {
	  	    	$result = $.parseJSON(result);
	  	    	if(!$result.isLogin) {
	  	    	    var newWin = window.open($result.link);    
	  	    	    if(!newWin || newWin.closed || typeof newWin.closed=='undefined') { 
	                    alert('Please allow pop-ups blocked');
	                }
	  	    	} else {
	  	    		hideModal();
	  	    	}
	  	    }
	  	})
	} else {
		alert('Please select atleast one album');
	}
}

function driveThis(obj) {
	$masterarray = {};
	$ANM = $(obj).parents('.maindivbox').find('#albumName').text();
 	var $data = $(obj).parents('.maindivbox').find('.img-container').attr('onclick');
    var params = $data.split("showSlideShow(),startLoop('")[1].split('=====');
    
	params[params.length - 1] = params[params.length - 1].replace("')");
    $masterarray[$ANM] = params;

    if(!$.isEmptyObject($masterarray)) {
    	modalPutStatic();
		$.ajax({
	  	    url: 'drive_upload.php',
	  	    type: 'POST',
	  	    data:{$masterarray},
	  	    success: function(result) {
	  	        $result = $.parseJSON(result);
	  	    	if(!$result.isLogin) {
	  	    	    var newWin = window.open($result.link);    
	  	    	    if(!newWin || newWin.closed || typeof newWin.closed=='undefined') { 
	                    alert('Please allow pop-ups blocked');
	                }
	  	    	} else {
	  	    		hideModal();
	  	    	}
	  	    }
	  	})
	} else {
		alert('Please select atleast one album');
	}
}

function modalPutStatic() {
    $str = '<div class="column-xs-12 column-md-6 modal-content"><span class="progressbar slow" id="loader"><span class="progressbarin" id="progressbarin" style="z-index: 99"></span></span></div>';
    $('#myModal').html($str);
    $('#myModal').show();
    progressbar();
}

$(document).on('click', '.close, #downloadlink', function() {
    checkedReset();
    $('#myModal').hide();    
});

$(document).ready(function() {
    var modal = document.getElementById('myModal');
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})

function checkedReset() {
  $('input[name="language"]').each(function() {
    this.checked = false;
  });
}

function getrandom(start,end){
	var randomizer = Math.floor(Math.random() * end) + start; 
	return randomizer;
}

function progressbar(){
    if($('#progressbarin').length) {
	var x = 0;
	var y = setInterval(function(){ 
			var randomstop = getrandom(75,90);				
			if(x<randomstop){
				document.getElementById("progressbarin").style.width= x+"%";
				x++;
			}
			else{
				clearInterval(y);
			}
		},getrandom(30,50));
    }
}

function hideModal() {
    $('#myModal').hide();
    checkedReset();
}


