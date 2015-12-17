/*
 * ========================================================================
 * shipping.js : v0.8.0
 *
 * ========================================================================
 * Copyright 2014
 * Authors: Daniel Petzold, Mariano Luna
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




visualize({
    auth: {
        name: "joeuser",
        password: "joeuser",
        organization: "organization_1"
    }
}, function (v) {
    console.log("Viz - login");    
    // Load the Repo seach by default..
    $('<iframe>', {
       src: 'http://localhost:8080/jasperserver-pro/dashboard/designer.html?decorate=no&theme=AcmeTheme',
       id:  'myFrame',
       // width: 1100,
       // height: 640,
       frameborder: 0,
	   scrolling: 'no',
	   class: 'embed-responsive-item'
   }).appendTo('#container');

    console.log("Iframe loaded with: " + document.getElementById('myFrame').src ); 
    
});

