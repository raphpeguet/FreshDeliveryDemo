/*
 * ========================================================================
 * visualizeUtils.js : v0.1.0
 * 
 * ========================================================================
 * Copyright 2014
 * Author: Mariano Luna (https://github.com/marianol), Gianluca Natali
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
 
function renderReport(uri, container, v) {
    return v.report({
        resource: uri,
        container: container,
        
        error: function(err) {
                alert(err.message);
            }
        });

}

function makeFrame() {
    ifrm = document.createElement("IFRAME");
    ifrm.setAttribute("src", "http://developerfusion.com/");
    ifrm.style.width = 640+"px";
    ifrm.style.height = 480+"px";
    document.body.appendChild(ifrm);

    /*
    // You can also use jQuery
         $('<iframe />', {
             name: 'myFrame',
             id:   'myFrame',
             ...
         }).appendTo('body');
     */


}
