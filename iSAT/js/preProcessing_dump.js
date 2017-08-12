var icombined_data=[['']];
var combined_data = [['']];
var cou;
var arrStr=[];
var arrMin=[];
var nArray=[['']];
var unik;
var unikc=[['']];
var exclude=[[]];
var max;
var div;
var div2;


// for mapping and remapping the input string or large range numbers to integers starting from zero
function mapp(num,col){
			for(k=0;k<col.length;k++){
				if(num==col[k]) return k;
			}
		}

function remapp(num,col){
			for(k=0;k<col.length;k++){
				if(num==k) return col[k];
			}
		}

//------------For searching in the pattern table----------------//
function find(key, array) {
	// The variable results needs var in this case (without 'var' a global variable is created)
  	var results = [];
  	for (var i = 0; i < array.length; i++) {
   		if (array[i].indexOf(key) == 0) {
    			results.push(i);
    		}
    		//console.log(results);
  		}
  		//console.log(results);
  		//var srr = find(12,arr);
		//console.log(srr);
  		return results;
	}

// for finding the transpose of a matrix		
function transpose(a) {
    	return Object.keys(a[0]).map(function (c) {
    	    return a.map(function (r) {
        		   return r[c];
      			  });
    		});
		}


//for eliminating the duplicates in an array
function eliminateDuplicates(arr) {
  			var i,
      		len=arr.length,
     		out=[],//Contains the list of unique values of a column(which has been now transposed to a row)
     		obj={};

  			for (i=0;i<len;i++) {
    			obj[arr[i]]=0;
  			}
  			for (i in obj) {
    			out.push(i);

  			}
  			//console.log(out);
  			return out;
		}


// Sorting_function--> on the basis of 1st,2nd,3rd index and then by primary_key //
Array.prototype.deepSortAlpha= function(){	

  		var itm, L=arguments.length, order=arguments;
   		var alphaSort= function(a, b){
      	//a= a.toLowerCase();
      	//b= b.toLowerCase();
      	if(a== b) return 0;
      	return a> b? 1:-1;
  		}
		if(!L) return this.sort(alphaSort);
  		this.sort(function(a, b){
      		var tem= 0,  indx=0;
      		while(tem==0 && indx<L){
         		itm=order[indx];
          		tem= alphaSort(a[itm], b[itm]); 
          		indx+=1;        
      		}
   			return tem;
		});
  		return this;
}




//to parse the csv file and call other functions accordingly
function parseCSV(objectKeys, csv)
	{
	cou=objectKeys.length;
	//*****************************Combined_Data**************************// The code below converts the array of CSV objects to an array of arrays
		for (i=0; i<csv.length; i++)
		{
			j=0;
			icombined_data[i]=[];
   			for (k=0;k<cou;k++)
   			{
				icombined_data[i][j] = csv[i][objectKeys[k]];
				j++;
   			}

		}
		console.log(icombined_data);
	console.log(objectKeys);

	//+++++++++++++++++//+++++++++Finding unique values in an Array+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

	var unik0=[],unik1=[],unik2=[];                              // unikc--> Contains the unique elements from all the columns as 2-D array

	if(cou==3){
		unikc[0] = (eliminateDuplicates(transpose(icombined_data)[1])).sort();
		unikc[1] = (eliminateDuplicates(transpose(icombined_data)[2])).sort();

		arrStr = eliminateDuplicates(unikc[0].concat(unikc[1]));
		unik = arrStr.length;
	}
	else if(cou==4){
		unikc[0] = (eliminateDuplicates(transpose(icombined_data)[1])).sort();
		unikc[1] = (eliminateDuplicates(transpose(icombined_data)[2])).sort();
		unikc[2] = (eliminateDuplicates(transpose(icombined_data)[3])).sort();
		arrStr = unikc[0].concat(unikc[1]);
		arrStr= eliminateDuplicates(arrStr.concat(unikc[2])); 
		unik = arrStr.length;
	}
	else{
		arrStr = (eliminateDuplicates(transpose(icombined_data)[1]));
	}
		//unik1 = (eliminateDuplicates(transpose(icombined_data)[1]));

	//console.log(arrStr);

