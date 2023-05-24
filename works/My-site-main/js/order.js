$('.box_order').sortable({update:function(event,ui){
	let user=""
	let order="one two three four five six seven eight"
	let planets=document.querySelectorAll('.item')
	planets.forEach(function(item)
	{
		user=user + item.id + " "
	}
	)
	if (user.trim() === order ){
		$('#planets').slideDown("slow")
			let audio5 = new Audio()
			audio5.src="music/metal.mp3"
			audio5.volume="0.6"
			audio5.play()
	}
	else{
		$('#planets').slideUp("slow")
	}
}})
	
