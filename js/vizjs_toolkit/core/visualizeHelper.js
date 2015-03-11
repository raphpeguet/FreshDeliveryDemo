/*
 * ========================================================================
 * visualizeHelper.js : v0.1.0
 * 
 * ========================================================================
 * Copyright 2014
 * Author: Gianluca Natali (https://github.com/gianlucanatali)
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft Inc., the following license terms apply:
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the 
 * GNU Affero General Public License as published by the Free Software Foundation, either version 3 
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public 
 * License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License 
 * along with this program. If not, see http://www.gnu.org/licenses/.
 * ======================================================================== 
 * 
 * This is a revised version of the original VisualizeHelper,
 * meant to be used as a framework to build structured project on Visualize.js. 
 * It can be used both inside and outide JasperReports Server
 */
 
 define(['jquery','vizjs_toolkit/core/vizGenericConfiguration'], function($,vizConfigObj) {
	
		
	// init deferred in global scope only if not defined already
	if( window.vizInstanceDeferred === undefined ){
	
		window.vizInstanceDeferred = new $.Deferred();	
			
	}
	
	/* Retrieving the javascript needed for visualize: 
	* this should be already available in the DOM as we are working inside JRS
	* This call is async because I will need it to be loaded in order to call visualize(). 
	* A "module" version of visualize would be easier to use thanks to requireJS	*/
	//As soon as the script is loaded in the DOM we initialize the visualizeJS instance
	$.ajax({
        type:'GET',
		url: vizConfigObj.getVizLibraryUrl() , 
		dataType:'script',
		cache: true,	
		data:null, 
        success:function(){
			// in non-optimized version of Visualize.js jQuery ($) leaks to global scope which causes conflict with Prototype lib (see http://bugzilla.jaspersoft.com/show_bug.cgi?id=40628)
			// that's why we are trying to call noConflict function on jQuery to restore original value of window.$
			window.$.noConflict && window.$.noConflict();

			//The visualize object is initialized only if is not in the global scope already.
			if(window.vizInstanceDeferred.state() === "pending"){
				visualize.config(vizConfigObj.config);
			
				visualize(function (viz) {
						// resolve our deferred with Viz.js instance
						window.vizInstanceDeferred.resolve(viz);
						
				}, function(err){
					alert(err.message);
				});
			}
        }          
    })
	.done(function( s, Status ) {
		//console.warn( Status );
	})
	.fail(function( jqxhr, settings, exception ) {
		console.warn('error ' + exception );
	});
	
	var VisualizeHelper = function() {
        		
    };
	
    VisualizeHelper.prototype = {
	
		/* In our idea Visualize should be already 
		* loaded and always available from any javascript.
		* This service should return an object already loaded 
		* in the window object If undefined instantiate a viz object. 
		* Most probably this logic could be incapsulated in a common 
		* service javascript obj, to make it available through requireJS 
		* to all javascript that will need to use visualize in JRS
		*/
        getVizInstance: function() {
            return window.vizInstanceDeferred;
        }
        
    };

    return VisualizeHelper;
});