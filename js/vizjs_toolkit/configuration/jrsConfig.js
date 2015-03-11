/*
 * ========================================================================
 * visualizeHelper.js : v0.1.0
 * 
 * Store here the configurations for your environment
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
 */

 define(['jquery'], function($) {
 
 var jrsConfig = {	
		/* This framework can be used both for an independent 
		 * WebApplication using Visualize and InternalUsage in JasperReportsServer
		 * If you are using it in your application set this property to false
		 */
		isForInternalUse : false,
		useOptimizedScripts : false,
				
		// URL of the JRS
		urlRoot : "/",
		jrsAppName: "jasperserver-pro",

		//Username and password are not used for internal use
		// JRS login username
		jrsUsername: "jasperadmin",

		// JRS login password
		jrsPassword: "jasperadmin",

		// JRS login organization
		jrsOrganization: "organization_1",
		
		getJrsUrl: function(){
			var jrsUrl = this.urlRoot + this.jrsAppName;			
			return jrsUrl;
		}
		
		/* Here you can define the target Jrs, this is a property of visualize, 
		* is useful when you want to use a Jrs server to get the visualizeJs 
		* framework but then use a different istance to do the calls.
		* Defaut: undefined 
		*/
		//targetJrsUrl : undefined,
			
	}	
	
	return jrsConfig;
	
});