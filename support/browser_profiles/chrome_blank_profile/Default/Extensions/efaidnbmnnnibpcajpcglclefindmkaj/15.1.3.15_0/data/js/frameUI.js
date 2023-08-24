/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2015 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property laws,
* including trade secret and or copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
var request,timer,sendCancel,isChecked,timer_off=!1,initialized=!1,events=acom_analytics.e,MENU_TIME=1500,PDF_MENU_TIME=3e3,FADE_TIME=1500;function sendMessage(e,t){"use strict";delete e.trefoilClick,delete e.trefoilUI,e.authenticatedPDF&&1==e.authenticatedPDF&&delete e.authenticatedPDF,util.messageToMain(e),delete e.newUI,delete e.analytics,timer&&(clearTimeout(timer),timer=null),t||"dismiss"===e.content_op||sendCancel()}function analytics(e){"use strict";request.analytics||(request.analytics=[]),request.analytics.push(e)}function clearTimer(){"use strict";util.consoleLog("Clear timer: "+timer),timer&&(clearTimeout(timer),timer=null),SETTINGS.IS_ERP_READER?$(".acrobatMainDiv").stop().css("display","none"):($(".acrobatMainDiv").stop().css("opacity",1),$(".convert-status").stop().css("opacity",1))}function sendCancel(){"use strict";request.content_op="dismiss",request.main_op="relay_to_content",request.newUI=!0,sendMessage(request)}function hideAway(){$(".convert-status").addClass("hidden"),$(".progress-area").addClass("hidden")}function fadeAway(){"use strict";timer=null,$(".convert-status").animate({opacity:0},FADE_TIME,"linear",hideAway)}function setTimer(){"use strict";(SETTINGS.TEST_MODE||SETTINGS.DEBUG_MODE)&&(timer=1),timer||timer_off||(timer=setTimeout((function(){setTimeout(fadeAway)}),request.is_pdf?PDF_MENU_TIME:MENU_TIME))}function doAcrobat(){"use strict";request.main_op="open_in_acrobat",request.newUI=!0,request.trefoilUI=!1,void 0!==request.paramName&&delete request.paramName,delete request.content_op,delete request.is_viewer,delete request.click_context,delete request.dataURL,util.handlePDFURL(request,!1)}function doAcrobatWithParams(e){"use strict";request.main_op="open_in_acrobat",request.newUI=!0,request.trefoilUI=!1,request.paramName=e,delete request.content_op,delete request.is_viewer,delete request.dataURL,delete request.click_context,util.handlePDFURL(request,!1)}function to_toggle(e){"use strict";isChecked=e,util.setCookie("ViewResultsPref",isChecked?"true":"false",3650),$(".do_set_open_pref").toggleClass("open-pdf-in-acrobat")}function checkForPDFForm(e){var t=!1;return SETTINGS.FILL_N_SIGN_ENABLED?void 0===e.stripId&&(void 0!==e.url&&!0===util.isPDFForm(e.url)?(e.stripId="stripTextOpenFillnSign",t=!0):e.stripId="stripTextOpenAcrobat"):e.stripId="stripTextOpenAcrobat",t}function initialize(e){"use strict";initialized||(initialized=!0,$(".do_acrobat").click((function(e){var t=$(e.currentTarget);clearTimer(),SETTINGS.FILL_N_SIGN_ENABLED&&t.hasClass("do_acrobat_FS")?doAcrobatWithParams("FillnSign"):t.hasClass("do_acrobat")&&doAcrobat()})),$(".close-dialog").click((function(){if(request&&request.version){events.PERSIST_PDF_MENU_CLOSED;analytics(SETTINGS.FILL_N_SIGN_ENABLED&&"stripTextOpenFillnSign"===request.stripId?request.version===SETTINGS.READER_VER?events.PERSIST_PDF_MENU_CLOSED_READER_FS:events.PERSIST_PDF_MENU_CLOSED_ACROBAT_FS:request.version===SETTINGS.READER_VER?events.PERSIST_PDF_MENU_CLOSED_READER:events.PERSIST_PDF_MENU_CLOSED)}request.fteClosed=!1,sendCancel()})),$(".always-show").prop("checked","false"!==util.getCookie("always-show-pdf-menu")),$(".always-show").click((function(){var e=$(".always-show").prop("checked")?"true":"false";util.setCookie("always-show-pdf-menu",e,3650)})))}function dump(e,t){"use strict";if(SETTINGS.DEBUG_MODE){var s,a=[t];for(s in e)e.hasOwnProperty(s)&&a.push("  "+s+": "+e[s]);console.log(a.join("\n"))}}function tester(e){"use strict";switch(util.consoleLog("TESTING"),util.consoleLogDir(JSON.stringify(e)),e.test_extension){case"doAcrobat":$("persistent.do_acrobat").not(":hidden").hasClass("do_acrobat_FS")?doAcrobatWithParams("FillnSign"):doAcrobat()}void 0!==e.test_extension&&delete e.test_extension}function legacyShim(e){return e.version<=1}function showAcrobatCard(e){switch(e.fteFeatureFlag){case"dc-cv-fte-pdf-redcard":$(".acrobat-only-side-card").removeClass("hidden");break;case"dc-cv-fte-pdf-dmb":$(".acrobat-only-top-bar").removeClass("hidden");break;default:$(".acrobat-only-card").removeClass("hidden")}}function setStatus(e){"use strict";var t,s,a,i=!0,n=!0,r=!1,o="web2pdfPDFOpenFailedv2",c=!(0==e.version||1==e.version||e.version===SETTINGS.READER_VER||e.version===SETTINGS.ERP_READER_VER);e.version===SETTINGS.READER_VER||(e.version,SETTINGS.ERP_READER_VER);if(!e.main_op||!["save-preferences","fetch-preferences"].includes(e.main_op)){if(e.test_extension)return tester(e);if(!e.authenticatedPDF)if(e.version===SETTINGS.ERP_READER_VER&&(SETTINGS.IS_ERP_READER=!0),e.persist)switch(initialize(e),delete(request=e).analytics,timer_off=!1,$(".acrobatMainDiv").stop().css("opacity",1),util.translateElements(".translate"),1===request.version&&$("#web2pdfOpenButtonText").val(util.getTranslation("web2pdfOpenButtonTextOlder")),request.version===SETTINGS.READER_VER&&$("#web2pdfOpenButtonText").val(util.getTranslation("web2pdfOpenButtonText")),$(".ui-element").addClass("hidden"),$("#action_message").text(""),request.displayName&&!SETTINGS.USE_ACROBAT&&($(".displayName").text(request.displayName),$(".sign-out").removeClass("hidden"),$(".action-signout").removeClass("hidden")),dump(request,"Receive frame message:"),s=request.panel_op,delete request.panel_op,delete request.dataURL,delete request.click_context,delete request.is_viewer,s){case"pdf_menu":const s=util.getCookie("fteDenied");if(util.isEdge()&&SETTINGS.VIEWER_ENABLED&&(!c||SETTINGS.VIEWER_ENABLED_FOR_ACROBAT))try{util.getCookie("pdfViewer")||(util.setCookie("fte","false"),util.setCookie("pdfViewer","true"),util.messageToMain({main_op:"analytics",analytics:[[events.USE_ACROBAT_IN_EDGE_AUTO_ENABLED]]}),reloadTab())}catch(e){analytics.event(analytics.e.LOCAL_STORAGE_DISABLED)}!c||SETTINGS.VIEWER_ENABLED&&SETTINGS.VIEWER_ENABLED_FOR_ACROBAT?!SETTINGS.VIEWER_ENABLED||util.getCookie("pdfViewer")||s&&10===parseInt(s)||c&&!SETTINGS.VIEWER_ENABLED_FOR_ACROBAT||!request.cookieStatus||request.incognito?!SETTINGS.USE_ACROBAT||legacyShim(e)||!SETTINGS.VIEWER_SHOW_OPEN_IN_ACRO||10!==parseInt(s)&&"false"!==util.getCookie("pdfViewer")||($(".acrobatMainDiv").removeClass("hidden"),$(".acro-option.pdf").removeClass("hidden")):(s&&parseInt(s)>=9&&($("#acc-cancel").addClass("hidden"),$("#acc-deny").removeClass("hidden")),showAcrobatCard(request)):($(".acrobatMainDiv").removeClass("hidden"),$(".acro-option.pdf").removeClass("hidden"),$(".acrobat-only-card").addClass("hidden")),util.getCookie("pdfViewer")&&$(".acrobat-only-card").addClass("hidden"),$(".acrobatMainDiv").off("hover");break;case"error":$(".error").removeClass("hidden").text("Unexpected Error:"+request.error.name+"\nReference: "+request.error.errnum+"\n"+request.error.details);break;case"flickr":$(".action-available").removeClass("hidden"),$("#action_message").text("Create slide shows and contact sheets."),$(".special_question").removeClass("hidden"),$("#special").removeClass("hidden");break;case"status":$(".progress-area").removeClass("hidden"),$(".convert").text(request.domtitle),$(".convert-status, .convert-title").addClass("hidden"),$(".convert").removeClass("convert-button hidden"),$(".acrobatMainDiv").off("hover"),"waiting"===request.current_status?(analytics(events.TREFOIL_HTML_CONVERT_WAITING),t=util.getTranslation("web2pdfStatusWaiting"),i=!1):"downloading"===request.current_status?(analytics(events.TREFOIL_HTML_CONVERT_DOWNLOADING),t=util.getTranslation("web2pdfStatusDownloading"),i=!1):"in_progress"===request.current_status?(analytics(events.TREFOIL_HTML_CONVERT_IN_PROGRESS),t=util.getTranslation("web2pdfStatusInProgress"),i=!1):"filelocked"===request.current_status?t=util.getTranslation("web2pdfFileLockedError"):"cancelled"===request.current_status?(analytics(events.TREFOIL_HTML_CONVERT_CANCELLED),t=util.getTranslation("web2pdfStatusCancelled"),r=!0):"complete"===request.current_status?(analytics(events.TREFOIL_HTML_CONVERT_COMPLETE),request.file_path?($(".convert").text(util.getTranslation("web2pdfOpenInDCButtonText")),$(".convert").addClass("convert-button")):($(".convert").empty(),$(".convert").addClass("hidden"))):"failure"===request.current_status?(analytics(events.TREFOIL_HTML_CONVERT_FAILED),request.message&&(t=request.message,t=$("<div/>").text(t).html()),n=!1):"noacrobat"===request.current_status?(analytics(events.TREFOIL_HTML_CONVERT_NO_ACROBAT),t=util.getTranslation("web2pdfUnsupportedAcrobatVersion"),n=!1):"unknown"===request.current_status?(t=util.getTranslation("web2pdfStatusUnknownFailure"),n=!1):"pdf_downloading"===request.current_status?(t=util.getTranslation("web2pdfStatusDownloadingPDF"),i=!1):"pdf_failure"===request.current_status?(request.version===SETTINGS.READER_VER?analytics(events.PERSIST_PDF_DOWNLOAD_FAILED_READER):analytics(events.PERSIST_PDF_DOWNLOAD_FAILED),o="web2pdfStatusUnknownFailure",n=!1):"pdf_downloaded"===request.current_status?(t=util.getTranslation("web2pdfPDFOpening"),i=!1):"pdf_opened"===request.current_status?(n=!0,"web2pdfPDFOpened"):"pdf_open_failed"===request.current_status&&(n=!1,i=!0,o="web2pdfPDFOpenFailedv2"),t&&($(".in-process").removeClass("hidden"),$(".convert-title").removeClass("hidden"),$(".convert-title").html(t)),i?(delete request.panel_op,$(".acrobatMainDiv").hover(clearTimer,setTimer),$(".actions").removeClass("hidden"),$(".in-process").addClass("hidden"),a=SETTINGS.USE_ACROBAT?request.is_pdf?".acro-option.pdf":".acro-option.html":request.is_pdf?".api-option.pdf":".api-option.html",$(a).removeClass("hidden"),$(".convert").removeClass("convert-busy"),$(".convert-status").removeClass("hidden"),$(".convert-status").stop().css("opacity",1),n?($(".progress-area").addClass("hidden"),$(".convert").removeClass("convert-busy"),$(".convert-status").addClass("hidden")):($(".convert-status-icon").removeClass("icon-success"),$(".convert-status-icon").addClass("icon-error"),$(".convert-status-title").text(util.getTranslation(o)),$(".convert").addClass("hidden")),r&&($(".convert-status").addClass("hidden"),$(".convert").addClass("hidden")),setTimer()):(timer_off=!0,$(".actions").addClass("hidden"),$(".convert").addClass("convert-busy"))}else $(".acrobatMainDiv").stop().css("opacity",0)}}function refreshRequestObj(e){void 0!==e&&(void 0!==e.stripId&&delete e.stripId,void 0!==e.paramName&&delete e.paramName)}function initPersistentStrip(e){if(refreshRequestObj(e),SETTINGS.FILL_N_SIGN_ENABLED=e.isFillnSignEnabled,SETTINGS.SHAREPOINT_ENABLED=e.isSharePointEnabled,!0===checkForPDFForm(e)){$(".acrobatMainDiv").width(205),$(".acro-option.pdf").addClass("do_acrobat_FS");{let t={tab:e.tab,main_op:"analytics",analytics:[]};e.version===SETTINGS.READER_VER?t.analytics.push(events.PDF_FORM_DETECTED_READER):t.analytics.push(events.PDF_FORM_DETECTED_ACROBAT),sendMessage(t,!0)}}$(".acro-option.pdf").attr("id",e.stripId),setStatus(e)}function reloadTab(){setTimeout(()=>{chrome.tabs.reload()},100)}util.isChrome()&&$((function(){"use strict";initialize()})),util.addMainListener(setStatus),$((function(){"use strict";window.location.search&&(request=JSON.parse(decodeURIComponent(window.location.search.split("=")[1])),SETTINGS.TEST_MODE&&window.addEventListener("message",(function(e){initPersistentStrip(e.data)}),!1),initPersistentStrip(request),"false"===util.getCookie("ViewResultsPref")?isChecked=!1:($(".do_set_open_pref").addClass("open-pdf-in-acrobat"),isChecked=!0),$("#acc-cancel, #sideCardCloseIcon, #acc-top-bar-close").on("click",(function(){let e,t=util.getCookie("repromptCount");switch(this.id){case"acc-top-bar-close":e=events.PERSIST_PDF_MENU_DMB_CANCEL;break;case"sideCardCloseIcon":e=events.PERSIST_PDF_MENU_RED_CARD_CANCEL;break;default:e=events.PERSIST_PDF_MENU_FTE_CANCEL}t?util.messageToMain({main_op:"analytics",analytics:[[e,{REPROMPT:"Reprompt"}]]}):util.messageToMain({main_op:"analytics",analytics:[[e,{":REPROMPT":""}]]});let s=util.getCookie("fteDenied");if(s=s&&parseInt(s)>=6?parseInt(s)+1:6,10===s){let e=Date.now();util.setCookie("reprompt-user-timestamp",e)}util.setCookie("persist-menu-closed",s-1),util.setCookie("fteDenied",s),request.fteClosed=!0,sendCancel()})),$("#acc-deny").on("click",(function(){let e=util.getCookie("fteDenied");if(analytics(util.getCookie("repromptCount")?events.PERSIST_PDF_MENU_FTE_REPROMPT_DENIED:events.PERSIST_PDF_MENU_FTE_DENIED),e=e&&parseInt(e)>=6?parseInt(e)+1:6,util.setCookie("fteDenied",e),10===e){let e=Date.now();util.setCookie("reprompt-user-timestamp",e)}request.fteClosed=!0,sendCancel()})),$("#acc-ok, #top-bar-acc-ok, #side-card-acc-ok").on("click",(function(){let e=!1;try{let t,s=util.getCookie("repromptCount");switch(this.id){case"top-bar-acc-ok":t=events.PERSIST_PDF_MENU_DMB_CONFIRM;break;case"side-card-acc-ok":t=events.PERSIST_PDF_MENU_RED_CARD_CONFIRM;break;default:t=events.PERSIST_PDF_MENU_FTE_ACCEPTED}s?util.messageToMain({main_op:"analytics",analytics:[[t,{REPROMPT:"Reprompt"}]]}):util.messageToMain({main_op:"analytics",analytics:[[t,{":REPROMPT":""}]]}),localStorage.setItem("pdfViewer","true"),e=!0}catch(e){util.messageToMain({main_op:"analytics",analytics:[[events.LOCAL_STORAGE_DISABLED]]})}e&&reloadTab()})),$("#acc-top-bar-close").on("click",(function(){$(".acrobat-only-top-bar").addClass("hidden")})),$("#fteSideCard").hover((function(){$(".fteSideCard-content-body").toggleClass("toggled")})))}));