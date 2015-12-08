var Moto = (function() {	
	return {
		currentFolder: 1,
		currentImage: 1,
		maxImage: 0,
		
		initViewer: function() {
			var builds = document.getElementsByClassName('builds-item');
			
			for (var i=0; i < builds.length; i++) {
				builds[i].onclick = Moto.showViewer.bind(this, i + 1);
			}
			
			document.getElementsByClassName('viewer')[0].onclick = Moto.hideViewer.bind(this);
			document.getElementsByClassName('viewer-prev')[0].onclick = function(event) {
				event.stopPropagation();
				Moto.prevImage();
			}
			document.getElementsByClassName('viewer-next')[0].onclick = function(event) {
				event.stopPropagation();
				Moto.nextImage();
			}
		},
		
		showViewer: function(index) {
			document.getElementsByClassName('viewer-image')[0].src = '/main/builds/' + index +  '/1.jpg';
			document.getElementsByClassName('viewer')[0].style['display'] = 'block';
			
			Moto.currentFolder = index;
			Moto.currentImage = 1;
			
			var req = new XMLHttpRequest();
			req.onreadystatechange = function() {
				if (req.readyState == 4 && req.status == 200) {
					Moto.maxImage = req.responseText.match(/a href/g).length;
				}
			}
			req.open("GET", "/main/builds/" + Moto.currentFolder + "/", true);
			req.send();
		},
		
		hideViewer: function() {
			document.getElementsByClassName('viewer')[0].style['display'] = 'none';
		},
		
		prevImage: function() {
			if (Moto.currentImage === 1) {
				Moto.currentImage = Moto.maxImage;
			} else {
				Moto.currentImage--;
			}
			document.getElementsByClassName('viewer-image')[0].src = '/main/builds/' + Moto.currentFolder +  '/' + Moto.currentImage + '.jpg';
		},
		
		nextImage: function() {
			if (Moto.currentImage === Moto.maxImage) {
				Moto.currentImage = 1;
			} else {
				Moto.currentImage++;
			}
			document.getElementsByClassName('viewer-image')[0].src = '/main/builds/' + Moto.currentFolder +  '/' + Moto.currentImage + '.jpg';
		}
	};
})();