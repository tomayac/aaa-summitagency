$(document).ready(function(){
	$('.change-color').click(function(){
		var color = $(this).data('url');
		$('#test').attr('href', color);
		return false;
	});

	$('#toggle-button').click(function(){
		$('#demo-switcher').toggleClass('opened');
	});

	$('#change-version').change(function(){
		window.location.href = $(this).val();
	});
});