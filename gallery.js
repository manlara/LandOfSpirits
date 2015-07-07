'use strict';
var Gallery = {
	

	dataArray : function(directory){

		var fs = require("fs");
		var _ = require('underscore')

		var data_array = [];
		var galleryFiles = fs.readdirSync(directory);
		var i;
		for (i=0; i<galleryFiles.length; i++){
			var inner_array = [];
			
			fs.readFileSync(directory+galleryFiles[i]).toString().split("\n")
			.forEach(function (line){ 
				inner_array.push( _.clone(line) );
			});
			if (galleryFiles[i]=="GalleryCrew.txt"){
				data_array.push( {"GalleryCrew": _.clone(inner_array)} );
			}
			if (galleryFiles[i]=="GalleryFaces.txt"){
				data_array.push( {"GalleryFaces": _.clone(inner_array)} );
			}
			if (galleryFiles[i]=="GalleryLandscape.txt"){
				data_array.push( {"GalleryLandscape": _.clone(inner_array)} );
			}
			
			
		}
		//console.log({gallery: data_array});
		return {gallery: data_array};

	}
}
//Gallery.dataArray("./Gallery/");
module.exports = Gallery;
