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

var port = chrome.runtime.connectNative('com.mcafee.dlp_native_messaging_host');

port.onMessage.addListener(
	function(msg) {
	  if(msg.pagetext) {
		  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, msg, function(response) {
				port.postMessage(response);
			});
		  });
	   }
	}
);

chrome.runtime.onMessage.addListener(function(msg, sender) {
    if(msg.inputfile){
		var s = Object.assign({},msg, {'url': sender.url});
		port.postMessage(s);
	}
});

chrome.tabs.query( {} ,function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.executeScript(tabs[i].id, {file: "content.js"});
    }
});

var requestsMap = new Map();

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		if(details.method == "POST" || details.method == "PUT"){
			var payload = JSON.stringify(details);
			
			if(details.requestBody && details.requestBody.raw){
				for(var i = 0; i < details.requestBody.raw.length; ++i){
					if(details.requestBody.raw[i].bytes){
						var dv = new DataView(details.requestBody.raw[i].bytes);
						for(var j = 0; j < dv.byteLength; ++j){
							payload += (String.fromCharCode( dv.getInt8(j) ));
						}
					}
				}
			}
			
			requestsMap.set(details.requestId, payload);
		}
		return {cancel: false};
    },
    {urls: ["<all_urls>"]},
    ["requestBody"]
);

chrome.webRequest.onSendHeaders.addListener(
	function(details) {
		var payload = requestsMap.get(details.requestId);
		if(payload){
			for(var i = 0; i < details.requestHeaders.length; i++){
    			if(details.requestHeaders[i].name == "Content-Type"){
					if(details.requestHeaders[i].value == "application/x-www-form-urlencoded"){
						payload = decodeURIComponent(payload);
					}
					break;
    			}
			}
			
			port.postMessage({'post':{'url':details.url,'payload':payload}});
		}
    },
  	{urls: ["<all_urls>"]},
    ["requestHeaders"]
);

chrome.webRequest.onErrorOccurred.addListener(
	function(details) {
		requestsMap.delete(details.requestId);
    },
  	{urls: ["<all_urls>"]}
);

chrome.webRequest.onCompleted.addListener(
	function(details) {
		requestsMap.delete(details.requestId);
    },
  	{urls: ["<all_urls>"]}
);

chrome.tabs.onActivated.addListener(
	function(activeInfo) {
		chrome.tabs.get(activeInfo.tabId, function(tab) {
			if(tab.url){
				port.postMessage({'activeurl':{'id':tab.id.toString() + "-" + tab.windowId.toString(),'url':tab.url}}); 
			}
		});
	}
);

chrome.tabs.onUpdated.addListener(
	function(tabId, changeInfo, tab) {
		if(changeInfo.url && tab.active){
			port.postMessage({'activeurl':{'id':tabId.toString() + "-" + tab.windowId.toString(),'url':changeInfo.url}}); 
		}
	}
);

chrome.tabs.onRemoved.addListener(
	function(tabId, removeInfo){
		port.postMessage({'urlremove':{'id':tabId.toString() + "-" + removeInfo.windowId.toString()}});
	}
);

chrome.windows.onFocusChanged.addListener(function () {
    chrome.tabs.query({ currentWindow: true, lastFocusedWindow: true, active: true }, function (tabsArr) {
        if (0 < tabsArr.length && tabsArr[0].url) {
            port.postMessage({ 'activeurl': { 'id': tabsArr[0].id.toString() + "-" + tabsArr[0].windowId.toString(), 'url': tabsArr[0].url } });
        }
    });
});
