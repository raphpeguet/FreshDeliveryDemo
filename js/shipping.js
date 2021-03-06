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


$(document).ready(function(){
    var viewlist = { 
     "pages" : [
     {
     "label" : "Create Adhoc",
     "url" : "http://localhost:8080/jasperserver-pro/flow.html?_flowId=adhocFlow&resource=/public/Samples/FreshDelivery_Demo/New_Admin_Ad_Hoc_View&decorate=no&theme=AcmeTheme"
     },{
     "label" : "Create Dashboard",
     "url" : "http://localhost:8080/jasperserver-pro/dashboard/designer.html?decorate=no&theme=AcmeTheme"
     } ,
	 {
     "label" : "Library",
     "url" : "http://localhost:8080/jasperserver-pro/flow.html?_flowId=searchFlow&mode=library&decorate=no&theme=AcmeTheme"
     },  
     {
     "label" : "Report List",
     "url" : "http://localhost:8080/jasperserver-pro/flow.html?_flowId=searchFlow&mode=search&filterId=resourceTypeFilter&filterOption=resourceTypeFilter-reports&decorate=no&theme=AcmeTheme"
     },
	 {
     "label" : "Home",
     "url" : "http://localhost:8080/jasperserver-pro/flow.html?_flowId=homeFlow&decorate=no&theme=AcmeTheme"
     } 
         
     ]
    };
    
    var menu = viewlist.pages;
    var length = menu.length;
    
    for(var j = 0; j < length; j++)
    {
        $('#mySelect').append($("<option/>", {
            value: menu[j].url ,
            text: menu[j].label
        }));
    }
    $("#mySelect" ).change(function() {
            $("#myFrame").attr("src", $("#mySelect").val());  
            console.log("myFrame changed to: " + $( "#mySelect" ).val());
        });
 
});

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
       src: 'http://localhost:8080/jasperserver-pro/flow.html?_flowId=adhocFlow&resource=/public/Samples/FreshDelivery_Demo/New_Admin_Ad_Hoc_View&decorate=no&theme=AcmeTheme',
       id:  'myFrame',
        width: 1160,
        height: 600,
       frameborder: 0,
       scrolling: 'no'
   }).appendTo('#adhoc');

    console.log("Iframe loaded with: " + document.getElementById('myFrame').src ); 
    
});

