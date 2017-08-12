var filtered=[];
function GetOutput(){
  var html="";
	var data=[];
	var dataunique=[];
	var datauniquelength=[];
	for(i=1;i<=cou-1;i++){
		data[i]=[];
		for(j=0;j<icombined_data.length;j++){
			data[i].push(icombined_data[j][i]);		
		}
	}
	//console.log(data);
	Array.prototype.unique = function() {
  		return this.filter(function (value, index, self) { 
    	return self.indexOf(value) === index;
  		});
  	}
    var datauniquecopy=[];
  	for(i=1;i<cou;i++){
  		dataunique.push((data[i].unique()));
  	}
  	//console.log(dataunique);
    for(i=0;i<dataunique.length;i++){
  		datauniquelength.push(dataunique[i].length);
  	}
	//console.log(datauniquelength);
  	var combination=[];

  	for(i=0;i<icombined_data.length;i++){
  		for(j=1;j<cou;j++){
  			if((dataunique[j-1].indexOf(icombined_data[i][j]))>=0){
  				console.log((dataunique[j-1].indexOf(icombined_data[i][j])+1)+" in "+k);
  				combination.push((dataunique[j-1].indexOf(icombined_data[i][j])+1));
  			}
  		}
  	}



  	var parts=[];
  	var mapp=[];

  	for(i=0;i<lines-2;i++){
  		parts[i]=combination.slice(0,cou-1);
  		combination=combination.slice(cou-1,combination.length+1);
  	}


  	for(i=0;i<parts.length;i++){
  		var zero=[];
  		for(j=0;j<parts[i].length;j++){
  			zero.push(['0',parts[i][j].toString()]);
  		}
  		//console.log(zero);
  		
  		function allPossibleCases1(arr){
  			if(arr.length==1){
  				return arr[0];
  			} else{
  				var result=[];
  				var allCasesOfRest=allPossibleCases1(arr.slice(1));
  				for(var i=0;i<allCasesOfRest.length;i++){
  					for(var j=0;j<arr[0].length;j++){
  						result.push(arr[0][j]+"#"+allCasesOfRest[i]);
  					}
  				}
  				return result;
  			}
  		}
  		for(j=1;j<allPossibleCases1(zero).length;j++){
  			mapp.push(allPossibleCases1(zero)[j].split("#"));
  		}
  	}
  


  	//+++++++++++++++++++++++++++++++ All Possible Patterns ++++++++++++++++++++++++++++++++++++++++++++++++++

  	var alpha=[];
  	var alphasub=[];
  	for(i=0;i<datauniquelength.length;i++){
  		for(j=0;j<=datauniquelength[i];j++){
  			alphasub.push((j).toString());
  		}
  	}
  	//console.log(alphasub);
  	for(i=0;i<datauniquelength.length;i++){
  		alpha.push(alphasub.slice(0,datauniquelength[i]+1));
  		alphasub=alphasub.slice(datauniquelength[i]+1,alphasub.length);
  	}
  	//console.log(alpha);
  	
  	var patterns=[];
  	var list=[];
  	function allPossibleCases(arr){
  		if(arr.length==1){
  			return arr[0];
  		} else{
  			var result=[];
  			var allCasesOfRest=allPossibleCases(arr.slice(1));
  			for(var i=0;i<allCasesOfRest.length;i++){
  				for(var j=0;j<arr[0].length;j++){
  					result.push(arr[0][j]+"#"+allCasesOfRest[i]);
  				}
  			}
  			return result;
  		}
  	}
  	for(i=0;i<allPossibleCases(alpha).length;i++){
  		patterns.push(allPossibleCases(alpha)[i].split("#"));
  	}


    //+++++++++++++++++++++++++++++++++++ Create list having 2 arrays with patterns and frequency respectively++++++++++++++++++++++++++++++++++++++++++++++++=
  	var freq=[];
  	var list1=[];  //Patterns
  	var list2=[];  //frequency
  	var f=0;
  	for(i=0;i<patterns.length;i++){
  		list1.push(patterns[i]);
  	}
  	for(i=0;i<patterns.length;i++){
  		list2.push(0);
  	}
  	list.push(list1,list2);	
  	//console.log(list1);
  	//console.log(list2);
  	//console.log(list);
    
    function searchForArray(haystack,needle){
      var i,j,current;
      for(i=0;i<haystack.length;++i){
        if(needle.length===haystack[i].length){
          current=haystack[i];
          for(j=0;j<needle.length && needle[j] === current[j]; ++j);
          if(j=== needle.length)
            return i;
        }
      }
      return 0;
    }

    for(i=0;i<mapp.length;i++){
      var x = searchForArray(list1,mapp[i]);
      list2[x]++;
    }

    var list3=[];
    var list_data=[];
    for(i=0;i<dataunique.length;i++){
      dataunique[i].unshift("0");
    }

    for(i=1;i<list1.length;i++){
      //document.write(list1[i]+"<br>");---------[1,0,0];
      for(j=0;j<list1[i].length;j++){
        list3.push(dataunique[j][list1[i][j]]);
      }
    }
    //console.log(list3);
    for(i=0;i<list1.length;i++){
      list_data.push(list3.slice(0,cou-1));
      list3=list3.slice(cou-1,list3.length);
    }
   
    //++++++++++++++++++++++++++++++++++++++++++++ Find out percentage of each strata ++++++++++++++++++++++++++++
   
    //console.log(datauniquecopy);
    var count_list=[];                       //CONTAINS NUMBER OF ARRAYS IN 2D ARRAY HAVING SAME STRATA 
    var small_list=[];                        
    var freq_list=[];                         // CONTAINS FREQUENCY OF EACH PATTERN IN FORM OF ARRAY
    var total_freq=[];                        // CONTAINS FREQUENCY OF ALL PATTERNS HAVING SAME STRATA IN FORM OF ARRAY
    var frequency_list=[];                    // CONTAINS EACH FREQUENCY OF PATTERN HAVING SAME STRATA IN FORM OF 2D ARRAY                  
    for(i=0;i<dataunique.length;i++){
        dataunique[i].shift();
    }
    //console.log(dataunique);
    for(i=0;i<cou-1;i++){
      for(j=0;j<dataunique[i].length;j++){
        var numb=0;
        var sum_of_freq=0;
        for(k=0;k<list_data.length;k++){
          if(dataunique[i][j]==list_data[k][i]){
            numb++;
            //document.write(list_data[k]+"<br>");
            small_list.push(list_data[k]);
            freq_list.push(list2[k+1]);
            sum_of_freq=sum_of_freq+list2[k+1];
          }
        }
        count_list.push(numb);
        total_freq.push(sum_of_freq);
        //document.write("<br>");
      }
    }
    //console.log(freq_list);
    //console.log(total_freq);
    var complete_list=[];                                                        // CONTAINS PATTERN OF SAME STRATA IN FORM OF 2D ARRAY
 
    for(i=0;i<count_list.length;i++){
      complete_list.push(small_list.slice(0,count_list[i]));
      small_list = small_list.slice(count_list[i],small_list.length);
      frequency_list.push(freq_list.slice(0,count_list[i]));
      freq_list = freq_list.slice(count_list[i],freq_list.length);
    }
    //console.log(complete_list);
                              
    var phase_freq_list=[];
    var phase_freq_list_copy=[];                                                    // CONTAINS FREQUENCY OF EACH STRATA IN FORM OF ARRAYS
    for(i=0;i<frequency_list.length;i++){
      phase_freq_list.push(frequency_list[i][0]);
    }
    //console.log(phase_freq_list);
    for(i=0;i<frequency_list.length;i++){
      phase_freq_list_copy.push(frequency_list[i][0]);
    }

    var phase_freq=[];                                                              // CONTAINS FREQUENCY OF EACH STRATA IN EACH PHASE FORM OF 2D ARRAY
    for(i=0;i<datauniquelength.length;i++){
      phase_freq.push(phase_freq_list.slice(0,datauniquelength[i]));
      phase_freq_list=phase_freq_list.slice(datauniquelength[i],phase_freq_list.length);
    }



    var frequency_of_phase=[];                                                    // CONTAINS TOTAL FREQUENCY OF EACH PHASE 
    
    for(i=0;i<phase_freq.length;i++){
      var sum_freq=0;
      for(j=0;j<phase_freq[i].length;j++){
        sum_freq+=phase_freq[i][j];
      }
      frequency_of_phase.push(sum_freq);
    }
    //console.log(frequency_of_phase);
    var strata_arr=[];
    for(i=0;i<frequency_of_phase.length;i++){
      for(j=0;j<phase_freq[i].length;j++){
        var percentage=Math.round((phase_freq[i][j]/frequency_of_phase[i])*100);
        strata_arr.push([dataunique[i][j],phase_freq[i][j],percentage+"%"]);
      }
    } 
    

    //document.write("<br>");
    var phase_one1=[];      
    var phase_one=[];  
    var phase_demo=[];
    var phase_copy_one1=[];
  
    for(i=0;i<complete_list.length;i++){
      for(j=0;j<complete_list[i].length;j++){
        var percentage=Math.round((frequency_list[i][j]/phase_freq_list_copy[i])*100);
        //document.write(complete_list[i][j]+" has frequency "+ frequency_list[i][j] +" and percentage in terms of strata "+ percentage + "%"+"<br>");
       	phase_one1.push([complete_list[i][j],frequency_list[i][j],percentage+"%"]);
        phase_copy_one1.push([complete_list[i][j],frequency_list[i][j],percentage+"%"]);
       	phase_demo.push(complete_list[i][j]);
      }
      //document.write("<br><br>");
    }

    
    var temp2=[];
    temp2=phase_demo;
    var temp=[];
    for(i=0;i<phase_demo.length;i++){
      temp.push([phase_demo[i],i]);
    }
  
    var report_format2=[];
    function sortByCol(arr, colIndex){
    	arr.sort(sortFunction)
    	function sortFunction(a, b) {
        	a = a[colIndex]
        	b = b[colIndex]
        	return (a === b) ? 0 : (a < b) ? -1 : 1
    	}
	}
	sortByCol(phase_one1,0);
	sortByCol(phase_demo,0);
  sortByCol(temp,0);
  filtered=[];
  for(i=0;i<temp.length;i++){
    temp[i].shift();
  }

  var newArr = [];
  for(var i = 0; i < temp.length; i++)
  {
    newArr = newArr.concat(temp[i]);
  }
  //console.log(newArr);
  var temp=[];
  temp=newArr;

  function foo1(arr){
    var a = [], b = [], prev;
    arr.sort();
    for(i=0;i<arr.length;i++){
        if (arr[i]!==prev) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    return [a, b];
  }
  var result2=foo1(temp2);

  var temp3=[];
  var temp4=[];
  for(i=0;i<result2[1].length;i++){
    temp3.push(temp.slice(0,result2[1][i]));
    temp=temp.slice(result2[1][i],temp.length);
  }

  for(i=0;i<temp3.length;i++){
    temp3[i].sort(function(a, b){return a - b});
  };

  var phase_copy=[];
  console.log(temp3.length);
  for(i=0;i<temp3.length;i++){
    for(j=0;j<temp3[i].length;j++){
      phase_copy.push(temp3[i][j]);
    }
  }
  var phase_copy1=[];
  for(i=0;i<phase_copy.length;i++){
    phase_copy1.push(phase_copy_one1[phase_copy[i]]);
  }
  var phase_one1=[];
  phase_one1=phase_copy1;

	for(i=0;i<phase_one1.length;i++){
		phase_one.push(phase_one1[i]);
	}
 

	function foo(arr){
    var a = [], b = [], prev;
    arr.sort();
    for(i=0;i<arr.length;i++){
        if (arr[i]!==prev) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    return [a, b];
	}
	var result=foo(phase_demo)
	//for(i=0;i<result[1].length;i++){

	var phase_comb=[];
	for(i=0;i<result[1].length;i++){
		phase_comb.push(phase_one.slice(0,result[1][i]));
		phase_one=phase_one.slice(result[1][i],phase_one.length);
	}
	var phase_comb1=[];

	for(i=0;i<phase_comb.length;i++){
		phase_comb1.push(phase_comb[i][0][0]);
		phase_comb1.push(phase_comb[i][0][1]);
		for(j=0;j<phase_comb[i].length;j++){
			phase_comb1.push(phase_comb[i][j][2]);
		}
	}
	//for(i=0;i<phase_comb1.length;i++){
	//	document.write(phase_comb1[i]+"<br>");
	//}
	var report=[];
    for(i=0;i<result[1].length;i++){
      report.push(phase_comb1.slice(0,result[1][i]+2));
      phase_comb1=phase_comb1.slice(result[1][i]+2,phase_comb1.length);
    }
    //for(i=0;i<report.length;i++){
    //	document.write(report[i]+"<br>");
    //}
    Array.prototype.count = function(obj){
      var count = this.length;
      if(typeof(obj) !== "undefined"){
          var array = this.slice(0), count = 0; // clone array and reset count
          for(i = 0; i < array.length; i++){
              if(array[i] == obj){
                  count++;
              }
          }
      }
      return count;
    }
    /*for(i=0;i<report.length;i++){
      document.write(report[i][0]+"<br>");
    }*/
    var no_of_zeros=[];
    for (i = 0; i < report.length; i++) {
      var numOfTrue = 0;
      for(j=0;j<report[i][0].length;j++){
        if (report[i][0][j] == "0") { 
          numOfTrue++; 
        }
      }
      no_of_zeros.push(numOfTrue);      
    }                                                      // CONTAINS DIFFERENT TRANSITION (A-B,A-B-C etc) IN DIFFERENT ARRAYS (2D ARRAY) 
    
    Array.prototype.max = function() {
      return Math.max.apply(null, this);
    };
    var max = no_of_zeros.max();
    //console.log(no_of_zeros.length);
    while(max>=0){
      var re=[];
      for(i=0;i<report.length;i++){
        if(no_of_zeros[i]===max){
          re.push(report[i]);
        }
      }
      filtered.push(re);
      max--;
    }

    //console.log(filtered);
    //var group=[];
    //console.log(filtered[0][0][0][0]);
    /*for(i=0;i<filtered.length;i++){
      for(j=0;j<filtered[i].length;j++){
        if(filtered[i][j][0][0]==0){
          group.push(filtered[i][j]);
        }
      }
    }
    for(i=0;i<group.length/2;i++){
      document.write(group[i]+"<br>");
    }
    */
    //console.log(filtered[1][0].length);
  	//console.log(filtered);
    var filter_=[];
    filter_[0]="";
    //console.log(filtered);
    //for(i=0;i<filtered[1].length/2;i++){
     // filter.push(filtered[1][i]);     
    //}
    for(i=1;i<filtered.length;i++){
      var filter=[];
      for(j=0;j<filtered[i].length;j++){
        filter.push(filtered[i][j]);
      }
      filter_.push(filter);
    }
    //console.log(filter_);


    
    //+++++++++++++++++++++++++++++++++++++++++ Creating Table ++++++++++++++++++++++++++++++++++++++++++++++++++++
    //Build an array containing Customer records.
    for(i=1;i<filtered.length;i++){
      filtered[i]=filter_[i];
    }
    var fill3=[];
    for(i=0;i<filtered.length;i++){
      var fill2=[];
      for(j=0;j<filtered[i].length;j++){
          fill2.push(filtered[i][j].slice(2,filtered[i][j].length));
        }
        fill3.push(fill2);
    }
    
    //var fills=[];
    var remove1=[];
    for(i=0;i<filtered.length;i++){
      var remove=[];
      for(j=0;j<filtered[i].length;j++){
        var remove_sub=[];
        for(k=0;k<filtered[i][j][0].length;k++){
          if(filtered[i][j][0][k]!="0"){
            remove_sub.push(filtered[i][j][0][k]);
          }
        }
        remove.push(remove_sub);
      }
      remove1.push(remove);
    }
   

    
    //console.log(filtered);
    //for(i=0;i<filtered.length;i++){
      //for(j=0;j<filtered[i].length;j++){
        //document.write(filtered[i][j]+"<br>");
      //}
      //document.write("<br>");
    //}
    var maxlength=[];
    var full_length=[];
    for(i=0;i<filtered.length;i++){
      var length=[];
      for(j=0;j<filtered[i].length;j++){
        length.push(filtered[i][j].length);  
      } 
      full_length.push(length);
    }
    //console.log(full_length);
    for(i=0;i<full_length.length;i++){
      maxlength.push(full_length[i].max()-2);
    }
    console.log(filtered);

    var objkey=[];
    for(i=1;i<objectkeys.length;i++){
      objkey.push(objectkeys[i]);
    }
    console.log(objkey);
    var phases_list=[];                                       // CONTAINS PHASE NAME OF EACH STRATA IN FORM OF AN ARRAY
    for(i=0;i<datauniquelength.length;i++){
      for(j=0;j<datauniquelength[i];j++){
        phases_list.push(objkey[i])
      }
    }
    console.log(phases_list);
    var match=[];
    for(i=1;i<filtered.length;i++){
      var match1=[];
      for(j=0;j<filtered[i].length;j++){
        match1.push(filtered[i][j][0]);
      }
      match.push(match1);
    }
    

    
    var index_of_zero=[];
    for(i=0;i<match.length;i++){
      var index_of_zero1=[];
      for(j=0;j<match[i].length;j++){
        var index_of_zero2=[];
        for(k=0;k<match[i][j].length;k++){
          if(match[i][j][k]=="0"){
            index_of_zero2.push(k);
          }
        }
        index_of_zero1.push(index_of_zero2);
      }
      index_of_zero.push(index_of_zero1);
    }
    
    console.log(index_of_zero);
    var only_phase=[];
    for(i=0;i<match.length;i++){
      var only_phase1=[];
      for(j=0;j<match[i].length;j++){
        only_phase1.push(objkey);
      }
      only_phase.push(only_phase1);
    }
    console.log(only_phase);

    var only_phase_index=[];
    for(i=0;i<only_phase.length;i++){
      var only_phase_index1=[];
      for(j=0;j<only_phase[i].length;j++){
        var only_phase_index2=[];
        for(k=0;k<only_phase[i][j].length;k++){
          only_phase_index2.push(k);
        }
        only_phase_index1.push(only_phase_index2);
      }
      only_phase_index.push(only_phase_index1);
    }
    console.log(only_phase_index);

    Array.prototype.diff = function(a) {
      return this.filter(function(i) {return a.indexOf(i) < 0;});
    };

    var final=[];
    for(i=0;i<index_of_zero.length;i++){
      var final1=[];
      for(j=0;j<index_of_zero[i].length;j++){
        final1.push(only_phase_index[i][j].diff(index_of_zero[i][j]));
      }
      final.push(final1);
    }
    console.log(final);

    var display_phase=[];
    for(i=0;i<final.length;i++){
      var display_phase1=[];
      for(j=0;j<final[i].length;j++){
        var display_phase2=[];
        for(k=0;k<final[i][j].length;k++){
          display_phase2.push(objkey[final[i][j][k]]);
        }
        display_phase1.push(display_phase2);
      }
      display_phase.push(display_phase1);
    }
    display_phase.unshift("");
    console.log(display_phase);
    var phases_list_copy=[];
    for(i=0;i<phases_list.length;i++){
      phases_list_copy.push([phases_list[i]]);
    }
    console.log(phases_list_copy);
    html+="<BR>";
    html+="&nbsp;&nbsp;&nbsp;&nbsp;<B>AT STRATA LEVEL</B>"+"<br>";
    html+="<input type='button' value='PRINT/SAVE REPORT' onclick='window.print()' style='float:right;position:relative;right:120px;cursor:pointer;font-size:18px;color:white;height:60px;width:240px;border-radius:10px;border:0;background:#2E8B57;font-family:Tahoma;'>&nbsp;&nbsp;&nbsp;";
    html+="<TABLE BORDER=ON style='position:relative;left:15px;'>";
    html+="<TH> Strata </TH><TH> Frequency(N) </TH><TH> Percentage(in terms of Phase)</TH><TH>Phase</TH>";
    for(i=0;i<strata_arr.length;i++){
      html+="<TR>";
      for(j=0;j<strata_arr[i].length;j++){
        html+="<TD>"+strata_arr[i][j]+"</TD>";
        //html+="  "+strata_arr[i][j]+"   ";
      }
      for(j=0;j<phases_list_copy[i].length;j++){
        html+="<TD>"+phases_list_copy[i][j]+"</TD>";
      }
      html+="</TR>";
    }
    html+="</TABLE>";
    html+="<br>";
    

    for(i=0;i<strata_arr.length;i++){
    	html+="&nbsp;&nbsp;&nbsp;";
    	html+="<B>"+strata_arr[i][0]+"</B>" + " Strata has frequency "+"<B>"+strata_arr[i][1]+"</B>"+" and percentage in terms of "+"<B>"+phases_list[i]+"</B>"+" phase " +"<B>"+strata_arr[i][2]+"</B>"+"<br>";
   	}
    
    html+="<br>";
    for(i=1;i<maxlength.length;i++){
    	html+="&nbsp;&nbsp;&nbsp;&nbsp;<B> TRANSITION PATTERNS OCCURING BETWEEN " + maxlength[i] + " PHASES</B>"+"<br><br>";
      	html+="<TABLE BORDER=ON style='position:relative;left:15px;'>";
      	html+="<TH>   Pattern of Transition  </TH><TH>  Frequency(N) </TH>"; 
      	for(j=0;j<maxlength[i];j++){
        	html+="<TH>    Percentage(in terms of strata)   </TH>";
      	}
      	for(j=0; j<filtered[i].length; j++){
        	html+="<TR>";
        	for(k=0; k<filtered[i][j].length; k++){
          	html+="<TD>"+filtered[i][j][k]+"</TD>";
        	}
        	html+="</TR>";
      	}
      	html+="</TABLE>";
      	html+="<br>";
        

      	for(j=0;j<filtered[i].length;j++){
      		
      		//console.log(fill);
      		html+="&nbsp;&nbsp;&nbsp;";
      		html+="<B>"+remove1[i][j].join("-")+"</B>"+ " is transiting from ";
      		for(k=0;k<remove1[i][j].length;k++){
      			html+=" to " + "<B>"+remove1[i][j][k]+"</B>";
      		}
      		//document.write("&nbsp;&nbsp;&nbsp;");
      		html+="<br>"+"&nbsp;&nbsp;&nbsp;which is,"+"<br>";
      		//var k1=maxlength[i]+1;
      		//while(k1>1){ 
      		for(l=0;l<remove1[i][j].length;l++){ 
      			html+="&nbsp;&nbsp;&nbsp;";			
      		  	html+="<B>"+fill3[i][j][l]+"</B>"+" in Strata "+"<B>"+remove1[i][j][l]+"</B>"+" in Phase "+"<B>"+display_phase[i][j][l]+"</B>"+"<br>";
      			 // k1--;
          }
          html+="<br>";
      		//}
      	}
      	html+="<br>";

    }
    //document.write("<input type='button' value='GO BACK' onclick='goBack()' style='font-size:18px;color:white;height:60px;width:180px;border-radius:10px;border:0;background:#F39C12;font-family:Tahoma;cursor:pointer;'>");
    html+="<br>";
    return html;
}
function GetStrata(){
  var check=[];
  var withoutzero=[];
  var withoutzero_copy=[];
  var no_of_transitions=prompt("Enter number of phases taken into account for the pattern");
  for(i=0;i<parseInt(no_of_transitions);i++){
    var strataname=prompt("Enter Strata "+(i+1));
    check.push(strataname);
  }
  console.log(check);
  /*function removeElementsWithValue(arr, val) {
      var i = arr.length;
      while (i--) {
          if (arr[i] === val) {
          arr.splice(i, 1);
          }
      }
      return arr;
  }*/
  function removeElementsWithValue(arr, val) {
      var i = arr.length;
      while (i--) {
          if (arr[i] === val) {
          arr.splice(i, 1);
          }
      }
      return arr;
    }
  for(i=0;i<filtered.length;i++){
    for(j=0;j<filtered[i].length;j++){
      withoutzero.push(removeElementsWithValue(filtered[i][j][0],"0"));
    }
  }
    //console.log(withoutzero);
    for(i=0;i<filtered.length;i++){
      for(j=0;j<filtered[i].length;j++){
        removeElementsWithValue(filtered[i][j][0],"0");
      }
    }
    //console.log(filtered);
    for(i=0;i<filtered.length;i++){
      for(j=0;j<filtered[i].length;j++){
        withoutzero_copy.push(filtered[i][j]);
      }
    }
    //console.log(withoutzero_copy);
    function searchForArray1(haystack,needle){
      var i,j,current;
      for(i=0;i<haystack.length;++i){
        if(needle.length===haystack[i].length){
          current=haystack[i];
          for(j=0;j<needle.length && needle[j] === current[j]; ++j);
          if(j=== needle.length)
            return i;
        }
      }
      return 0;
    }

    //console.log(searchForArray1(withoutzero,check));
    //console.log(withoutzero_copy[100]);
    //console.log(withoutzero_copy[searchForArray1(withoutzero,check)]);
    var checked;
    var third="";
    checked = withoutzero_copy[searchForArray1(withoutzero,check)];
    //console.log(checked);
    var first = checked[0].join("-")+ " has percentage \n";
    for(i=2;i<checked.length;i++){
      var second =" "+checked[i] +" in "+ checked[0][i-2]+"\n";
      third+=second;
    }
    alert(first+third);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ END OF REPORT GENERATION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++