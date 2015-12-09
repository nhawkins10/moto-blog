var Moto = (function() {	
	function updateViewerSpacing() {
		var image = document.getElementsByClassName('viewer-image')[0],
			body = document.body,
			prevBtn = document.getElementsByClassName('viewer-prev')[0],
			nextBtn = document.getElementsByClassName('viewer-next')[0],
			margin = ((body.clientWidth * .9) - image.width) / 2 + "px";
			
		image.style['margin-left'] = margin;
		prevBtn.style['left'] = margin;
		nextBtn.style['right'] = margin;
		document.getElementsByClassName('viewer-btn')[0].style['height'] = image.height + 'px';
		document.getElementsByClassName('viewer-btn')[1].style['height'] = image.height + 'px';
	}
	
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
			
			window.onresize = updateViewerSpacing.bind(this);
		},
		
		showViewer: function(index) {
			var image = new Image();
			image.src = '/main/builds/' + index +  '/1.jpg';
			image.onload = function() {
				document.getElementsByClassName('viewer-image')[0].src = image.src;
				document.getElementsByClassName('viewer')[0].style['display'] = 'block';
				updateViewerSpacing();
			};
			
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
			
			var image = new Image();
			image.src = '/main/builds/' + Moto.currentFolder +  '/' + Moto.currentImage + '.jpg';
			image.onload = function() {
				document.getElementsByClassName('viewer-image')[0].src = image.src;
				updateViewerSpacing();
			};
		},
		
		nextImage: function() {
			if (Moto.currentImage === Moto.maxImage) {
				Moto.currentImage = 1;
			} else {
				Moto.currentImage++;
			}
			
			var image = new Image();
			image.src = '/main/builds/' + Moto.currentFolder +  '/' + Moto.currentImage + '.jpg';
			image.onload = function() {
				document.getElementsByClassName('viewer-image')[0].src = image.src;
				updateViewerSpacing();
			};
		}
	};
})();