// MCAFEE LLC, SOFTWARE LICENSE TERMS
// Copyright (c) 2017 McAfee LLC. All rights reserved.
//
// THIS SOFTWARE CONTAINS CONFIDENTIAL INFORMATION AND TRADE SECRETS OF MCAFEE LLC.  
// USE, DISCLOSURE OR REPRODUCTION IS PROHIBITED WITHOUT THE PRIOR
// EXPRESS WRITTEN PERMISSION OF MCAFEE LLC.
//
// NOTICE TO ALL USERS: CAREFULLY READ THE APPROPRIATE LEGAL AGREEMENT CORRESPONDING TO 
// THE LICENSE YOU PURCHASED, WHICH SETS FORTH THE GENERAL TERMS AND CONDITIONS FOR THE 
// USE OF THE LICENSED SOFTWARE. IF YOU DO NOT KNOW WHICH TYPE OF LICENSE YOU HAVE ACQUIRED, 
// PLEASE CONSULT THE SALES AND OTHER RELATED LICENSE GRANT OR PURCHASE ORDER DOCUMENTS 
// THAT ACCOMPANY YOUR SOFTWARE PACKAGING OR THAT YOU HAVE RECEIVED SEPARATELY AS PART OF 
// THE PURCHASE (AS A BOOKLET, A FILE ON THE PRODUCT CD, OR A FILE AVAILABLE ON THE WEBSITE FROM 
// WHICH YOU DOWNLOADED THE SOFTWARE PACKAGE). IF YOU DO NOT AGREE TO ALL OF THE TERMS SET FORTH 
// IN THE AGREEMENT, DO NOT INSTALL THE SOFTWARE.

chrome.extension.onMessage.addListener(
	function(msg, sender, sendResponse) {
		if(msg.pagetext) {
			sendResponse({'pagetext':{'id':msg.pagetext.id,'text':document.body.innerText}});
		}
	}
);

function readFile(file){
    var fName = file.name;
	var fSize = file.size;
	var fModification = file.lastModified;
				
    var reader = new FileReader();  
    reader.onloadend = function(e){   
        if (e.target.readyState == FileReader.DONE){
			chrome.runtime.sendMessage({'inputfile': {name:fName, size:fSize, modification:fModification}});
		}
    }
	
	var blob = file.slice(0, 1);
    reader.readAsText(blob);
}

document.addEventListener('change', function(e){
	if (e.target.tagName.toLowerCase() == "input" && e.target.type.toLowerCase() == "file"){
		for (var i = 0; i < e.target.files.length; i++){
			readFile(e.target.files[i]);
		}
    }
}, true);

function readDirectory(directory) {
	var dirReader = directory.createReader();
	
	var readEntries = function(){
		dirReader.readEntries(function(entries){
			for (var i = 0; i < entries.length; i++){
				if(entries[i].isDirectory){
					readDirectory(entries[i]);
				}
				else{
					entries[i].file( function(file){
						readFile(file);}
					);
				}
			}
			
			if(entries.length > 0){
				readEntries();
			}
		});
	}
	
	readEntries();
}

document.addEventListener('drop', function(e){	
	for (var i = 0; i < e.dataTransfer.items.length; i++){
		if(typeof e.dataTransfer.items[i].webkitGetAsEntry !== "function"){
			readFile(e.dataTransfer.items[i].getAsFile());
			continue;
		}
		
		var entry = e.dataTransfer.items[i].webkitGetAsEntry();
		if(entry && entry.isDirectory){
			readDirectory(entry);
		}
		else{
			readFile(e.dataTransfer.items[i].getAsFile());
		}
	}
	
}, true);