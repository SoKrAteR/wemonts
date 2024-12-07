window.onload = function() {

	setTimeout(function() {

		document.body.classList.add('loaded')

		if (window.matchMedia('(min-width: 992px)').matches) { // If not mobile

			Draggable.create('.gallery', {
				bounds: 'body',
				inertia: true
			})
			
		}

	}, 200)

}

document.querySelectorAll('.gallery__item').forEach(function(e) {
	let img = new Image(), hrefURL = e.getAttribute('href')
	img.onload = function() {
		e.dataset.pswpWidth = this.width
		e.dataset.pswpHeight = this.height
	}
	img.src = hrefURL
})

import PhotoSwipeLightbox from '../libs/PhotoSwipe/photoswipe-lightbox.esm.min.js'
const lightbox = new PhotoSwipeLightbox({
	gallery: '.gallery',
	children: '.gallery__item',
	pswpModule: () => import('../libs/PhotoSwipe/photoswipe.esm.min.js')
})
lightbox.init()
