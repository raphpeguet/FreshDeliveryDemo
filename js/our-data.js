/*
 * ========================================================================
 * admin.js : v0.8.0
 *
 * ========================================================================
 * Copyright 2014
 * Authors: Daniel Petzold
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
 */




function handleError(e) {
    alert(e);
}

// Repo Lister
function listRepository(results) {
	var $el = $("#select");
	$el.empty(); // remove old options
	$.each(results, function() {
		$el.append($("<option></option>")
		 .attr("value", this.uri).text(this.label));
	});

	//console.log($("#select"));
    $el.change(function() {
		visualize.dashboard({
				resource: this.value,
				container: "#container",
				error: handleError
		});
	});
	$("#select option:eq(0)").prop("selected", true).change(); // To select via index
}

var visualize;
visualize({
	/*
    auth: {
        name: "superuser",
        password: "superuser"
    }
	*/
}, function (v) {
	
	visualize = v;
	
	visualize.resourcesSearch({
		folderUri:"/public/Public_Dasboards",
		recursive:false,
		types:["dashboard"],
		success: listRepository,
		error: handleError
	});
    
	
    var dashboard = visualize.dashboard({
        resource: "/public/Public_Dasboards/2._Performance_Summary_Dashboard",
        container: "#container",
        error: handleError
    });
	
});


