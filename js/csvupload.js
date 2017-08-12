function OpenWindow(){
	window.open("reportgen.html");
}
function PrintContent(el){
	var restorepage=document.body.innerHTML;
	var printcontent=document.getElementById(el).innerHTML;
	document.body.innerHTML=printcontent;
	window.print(printcontent);
	document.body.innerHTML=restorepage;
}
var criteriaCount = 0;
var critname = [""];
var critval = [0];
$(document).ready(function(){

	//alert("onload");

	document.getElementById('uploader').addEventListener('change', upload, false);
	/*
	var noOfCriteria = document.getElementById("noOfCriteria");
	noOfCriteria.addEventListener('blur', function(e) {                                //***********modified***************
	//alert("blurred");
		window.criteriaCount =  parseInt(document.getElementById("noOfCriteria").value);
		//alert(window.criteriaCount);
		for(i=0; i<window.criteriaCount; i++)
		{
			ival = i+1;
			$("#criteriaSpace").append( "<p> " + ival + ". Criteria Name: <input type=\"text\" id=\"critname"+ ival +"\" /> " + 
			"Criteria Value: <input type=\"text\" id=\"critval"+ ival +"\" />  </p>" );
		}
	$("#criteriaSpace").append("<input type=\"button\" id=\"processCSV\" value=\"Process\" /> ");
	});
	document.getElementById('processCSV').onclick = fun();
	*/
/*
	var Miso = require("miso.dataset");
	var ds = new Miso.Dataset({
  importer : Miso.Dataset.Importers.GoogleSpreadsheet,
  parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
  key : "1WMaDJ6qKeknxhJZYi4uMfeDsgcRZe-SGUGnzE4gxmu4",
  worksheet : "1"

});

ds.fetch({ 
  success : function() {
    log(ds);
  },
  error : function() {
    log("Are you sure you are connected to the internet?");
  }
});
*/
});

//https://docs.google.com/spreadsheets/d/1WMaDJ6qKeknxhJZYi4uMfeDsgcRZe-SGUGnzE4gxmu4/pubhtml
var objectkeys=[];
var lines;
var cou;
function browserSupportFileUpload() {
	var isCompatible = false;
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		isCompatible = true;
	}
	return isCompatible;
}

function upload(evt) {
	if (!browserSupportFileUpload()) {
		alert('The File APIs are not fully supported in this browser!');
	} else {

		var data = null;
		var file = evt.target.files[0];

            //console.log(file);
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(event) {
            	var csvData = event.target.result;
            	lines = csvData.split("\n").length;
				console.log(csvData);
				//console.log(typeof(csvData));
				
				data =  d3.csv.parse(csvData);

				console.log(data);
				var objectKeys = $.map(data[0], function(value, key) {
					return key;
				});
				for(i=0;i<objectKeys.length;i++){
					objectkeys.push(objectKeys[i]);
				}
				cou = objectKeys.length; 	//total no.of column values
				console.log(cou);
				if (data && data.length > 0) {
                 // alert('Imported -' + data.length + '- rows successfully!');
                 parseCSV(objectKeys, data);
             } else {
             	alert('No data to import!');
             }
         };
         reader.onerror = function() {
         	alert('Unable to read ' + file.fileName);
         };
     }
 }
