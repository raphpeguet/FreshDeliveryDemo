/*
 * ========================================================================
 * pageSpecific.js : v0.1.1
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
 */
 
function initializePage(windowObj,initializeFunction){	
	$(windowObj).load(function(){
		visualize(function(v){
			//'v' it's a client to JRS instance under the config set by visualize.config();
			JRSClient = v;	
			initializeFunction();

			
		});
	}); 
}
 
 
 
 function ContextPageJS(windowObj){
	var myReport;
	var myReportIC;
	var currentPageIndex = 1;
	var maxPageIndex = 0;

	this.init = function(windowObj){	
		initializePage(windowObj, initialize); 	
	}
	
	/*
	* Re run the Report with a changed Input Parameter
	*
	* @param {string} inputControlId - ID of the input parameter to be changed
	* @param {Object} paramValue - new value to be passed
	 */
	this.passControls = function(inputControlId, paramValue) {
		var parameters = {};

		parameters[inputControlId] = [ paramValue ];
		console.log(parameters);
		currentPageIndex = 1;
		myReport.params(parameters).run();
	}

	
		window.makeExport = function makeExport(exportFormat) {
        myReport.export({
            outputFormat: exportFormat
        })
            .done(function (link) {
            window.open(link.href); // open new window to download report
        })
            .fail(function (err) {
            alert(err.message);
        });
    }
	function initialize() {
		var reportUri = '/public/Samples/FreshDelivery_Demo/9.CustomerDetailReport';

		myReport = renderReport(reportUri, '#report1', JRSClient);
		
		$button = $("#ExportButton");
		
		myReport.events({
			changeTotalPages: function(totalPages) {
				console.log("Total Pages: " + totalPages);
				maxPageIndex = totalPages;
				$('#total').html(maxPageIndex);
				$('#current').html(1);
				//showing previous page button to maintain symmetry
				$('#previousPage').show();
				//$('#previousPage').hide();
				if (1 == maxPageIndex)  {
					$('#nextPage').hide();
				} else {
					$('#nextPage').show();
				}
			}
		});

		var ic = JRSClient.inputControls({
				resource: reportUri,
				success: function(data) {
					var customer = _.findWhere(data, {id: "customerId"});
             
			        _.each(customer.state.options, function (option) {
			            $("#inputOptions").append("<option " + 
			                (option.selected ? "selected" : "") +
			                " value='" + option.value + "'>" +
			                option.label +
			                "</option>");
			        });

					//renderStandardIC(data);
					myReportIC = data; // Store this just in case :)
				}
		});

		/*
		 Wire the Report to the Rendered IC
		*/
		/*
		$('#btn').click(function() {
			// Iterate trough the IC's in the Div
			var parameters = {};
			$('#inputOptions').children().each(function(itm) {
				
				console.log($(itm).attr('outterText'));
				console.log($(itm).attr('value'));
				if ($(itm).attr('outterText')=='---') {
					parameters[$(itm).attr('outterText')] = '';
				}
				else {
					parameters[$(itm).attr('outterText')] = $(itm).val();
				}
			});

			// console.log(parameters);
			myReport.params(parameters).run(); // Re run the report with the new params
		});*/


		/*
		 Setup page navigation buttons
		 */
		$("#previousPage").click(function() {
			$('#nextPage').show();

			myReport
					.pages(--currentPageIndex)
					.run()
					.fail(function(err) { alert(err); });
			$('#current').html(currentPageIndex);
			if (currentPageIndex <= 1)  {
				// Showing previous page button even when page<= to maintain symmetry
				$('#previousPage').show();
				//$('#previousPage').hide();
			} else {
				$('#previousPage').show();
			}
		});

		$("#nextPage").click(function() {
			$('#previousPage').show();
			myReport
					.pages(++currentPageIndex)
					.run()
					.fail(function(err) { alert(err); });
			$('#current').html(currentPageIndex);
			if (currentPageIndex == maxPageIndex)  {
				$('#nextPage').hide();
			} else {
				$('#nextPage').show();
			}
		});
	}	
 }
 

		
function ReportInteractionPageJS(windowObj){
	var myReport;
	
	
	this.init = function (windowObj) {
        initializePage(windowObj, initialize);
		
    };

	function initialize(){	
		myReport = renderReport(reportUri, '#report1', JRSClient);

		myReport.events({
			changeTotalPages: function(totalPages) {
				console.log("Total Pages: " + totalPages);
				$('#progressbar').hide();
			}
		});

		$('#progressbar').show();
	}
	
	// This map will be uses to drive the Input controls of the report in #report1

	function refreshReport(id){
		$.each(reportsList,
			function(index,value){
				if(value.container() == ("#report_"+id)){
						value.refresh();
				}
			}
		);		
	}
	


}
