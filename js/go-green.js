/*
 * ========================================================================
 * go-green.js : v0.8.0
 *
 * ========================================================================
 * Copyright 2014
 * Author: Mariano Luna, Daniel Petzold, Gianluca Natali
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
 
  
require.config({
	baseUrl: "js",
	paths: {
		"jquery": "jquery.mod"
	},
	 waitSeconds: 60
});
  
require(['jquery','vizjs_toolkit/core/visualizeHelper'], function($,VisualizeHelper) {	

	var mapReport;
	var masterReport;
	var slaveReport;
	var defCity = 'San Diego';
	var defDepartment = 'Produce';
	
	// Get my Client Object
	var vizInstance = new VisualizeHelper().getVizInstance();
	
	/*Here I am using a Deferred object. The action inside the function done(..) 
	* will be executed only when the object vizInstance is fully loaded
	*/
	vizInstance.done(function(v) {
		initializeReports(v);
	});
	
	function initializeReports(v) {
	
	var master = '/public/Samples/FreshDelivery_Demo/21.5GoGreenChart';
	var slave = '/public/Samples/FreshDelivery_Demo/21.6GoGreenTable';
	var map = '/public/Samples/FreshDelivery_Demo/21.7GoGreenMap';
	// $button = $("#ExportButton");
	 
	$('#DepartmentName').html(defDepartment);
	$('#CityName1').html(defCity);
	$('#CityName2').html(defCity);
	
	mapReport = renderMapReportLink(map, '#GreenMap', v);
	masterReport = renderReportLink(master, '#goGreenChart', v);
	slaveReport = renderReportLink(slave, '#goGreenTable', v);
	
	var $select = buildControl("Export to:   ", v.report.exportFormats);
	
	$('#ExportButton').on('click', function(e) {
		console.log($select.val());
		slaveReport.export({
			//export options here
			outputFormat: $select.val(),
			//exports all pages if not specified
			//pages: "1-2"
		}, function (link) {
			var url = link.href ? link.href : link;
			window.location.href = url;
		}, function (error) {
			console.log(error);
		});	
		e.preventDefault();
	});	

	}
	
	function buildControl(name, options) {
				
		function buildOptions(options) {
			var template = "<option>{value}</option>";
			return options.reduce(function (memo, option) {
				return memo + template.replace("{value}", option);
			}, "")
		}
		
		var template = "<label>{label}&nbsp;</label><select>{options}</select>",
			content = template.replace("{label}", name)
				.replace("{options}", buildOptions(options));
				
		var $control = $(content);
		$control.insertBefore($("#placeholder"));
		//return select
		return $($control[1]);
	}	

	function renderMapReportLink(uri, container, v) {
	
		return v.report({
			resource: uri,
			container: container,
			linkOptions: {
				beforeRender: function (linkToElemPairs) {
					linkToElemPairs.forEach(function (pair) {
					var el = pair.element;
					el.style.backgroundColor = "red";
					});
				},
				events: {
					"click"  : function(evt, link){
						var store_city = link.parameters.store_city;
						changeChartCityInternal(link.parameters.store_city);
					}
				}
			},
			error: function(err) {
				console.log(err.message);
			}
		});
		
	}
	// Update Slave report with the passed Department parameter
	function changeChartCityInternal(cityName) {
		var parameters = {};
		parameters['city_name'] = [ cityName ];
		masterReport.params(parameters).run();

		 $('#CityName1').html(cityName);
		 $('#CityName2').html(cityName);
	}
	window.changeChartCity = changeChartCityInternal;

	function renderReportLink(uri, container, v) {
		return v.report({
			resource: uri,
			container: container,
			linkOptions: {
				events: {
					"click"  : function(evt, link){
						updateTable(link.parameters.department_name);
					}
				}
			},
			 success: function () {
				// $("#ExportButton").removeAttribute("disabled");
			 },
			error: function(err) {
				console.log(err.message);
			}
		});
	}
	
	// Update Slave report with the passed Department parameter
	function updateTable(departmentName) {
		var parameters = {};
		parameters['department'] = [ departmentName ];
		slaveReport.params(parameters).run();

		$('#DepartmentName').html(departmentName);
	}
});	