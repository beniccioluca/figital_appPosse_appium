(window.webpackJsonpwebClient=window.webpackJsonpwebClient||[]).push([[25],{1027:function(e,t,n){"use strict";n.r(t);var o=n(1),r=(n(0),n(781)),a=n(1315),l=n(918),i=n(788),s=n.n(i),c=n(13),u=n(7),d={id:0,type:"AddThreePassword",visible:!0,completed:null,seenAt:null,color:a.a.GREY},f={hideSkillDetailsDialog:jest.fn(),closeShowAllSkills:jest.fn(),openAddItemDialog:jest.fn(),openAllItemsView:jest.fn()};jest.mock("../../hooks/use-secondary-onboarding-actions",function(){return{useSecondaryOnboardingActions:function(){return f}}}),jest.mock("../../services/lp-vault",function(){return{LPVault:{extensionInstalled:function(){return!0}}}}),it("should render render the AddThreePassword component without crashing",function(){var e=s()([])({login:{baseUrl:"https://dummy.com"},vaultData:{passwords:{recordType:c.a.Password,username:"test@test.com",record:{}}},secondaryOnboarding:{allSkillsModalOpened:!0}}),t=Object(r.mount)(Object(o.jsx)(u.a,{store:e},Object(o.jsx)(l.default,{skill:d,expanded:!0,fromAllSkillsDialog:!1})));expect(f.openAllItemsView).toHaveBeenCalled(),expect(t).toHaveLength(1),t.unmount()}),it("should render the SiteComponent when extension is installed in AddThreePassword component without crashing",function(){var e=s()([]),t=top.bg;top.bg={};var n=e({login:{baseUrl:"https://dummy.com"},vaultData:{passwords:{recordType:c.a.Password,username:"test@test.com",record:{}}},secondaryOnboarding:{allSkillsModalOpened:!0}}),a=Object(r.mount)(Object(o.jsx)(u.a,{store:n},Object(o.jsx)(l.default,{skill:d,expanded:!0,fromAllSkillsDialog:!1})));console.log(a.html()),expect(a.find(".site-name")).toHaveLength(6),a.unmount(),top.bg=t}),it("should render the AddThreePassword component and click the Add Item button",function(){var e=s()([]),t={recordType:c.a.Password,username:"test@test.com",record:{}};top.bg=void 0;var n=e({login:{baseUrl:"https://dummy.com"},vaultData:{passwords:t},secondaryOnboarding:{allSkillsModalOpened:!0}}),a=Object(r.mount)(Object(o.jsx)(u.a,{store:n},Object(o.jsx)(l.default,{skill:d,expanded:!0,fromAllSkillsDialog:!1})));a.find(".add-item-button").at(1).simulate("click"),a.unmount(),expect(f.openAddItemDialog).toHaveBeenCalled(),expect(f.hideSkillDetailsDialog).toHaveBeenCalled(),expect(f.closeShowAllSkills).toHaveBeenCalled()})},782:function(e,t){},783:function(e,t){},784:function(e,t){},785:function(e,t){},788:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};var n=r.applyMiddleware.apply(void 0,function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(e))(function(){var e=[],n=[];return{getState:function(){return i(t)?t(e):t},getActions:function(){return e},dispatch:function(t){if(!(0,l.default)(t))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if("undefined"===typeof t.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant? Action: '+JSON.stringify(t));e.push(t);for(var o=0;o<n.length;o++)n[o]();return t},clearActions:function(){e=[]},subscribe:function(e){return i(e)&&n.push(e),function(){var t=n.indexOf(e);t<0||n.splice(t,1)}},replaceReducer:function(e){if(!i(e))throw new Error("Expected the nextReducer to be a function.")}}});return n()}};var o,r=n(68),a=n(789),l=(o=a)&&o.__esModule?o:{default:o};var i=function(e){return"function"===typeof e}},789:function(e,t){var n="[object Object]";var o,r,a=Function.prototype,l=Object.prototype,i=a.toString,s=l.hasOwnProperty,c=i.call(Object),u=l.toString,d=(o=Object.getPrototypeOf,r=Object,function(e){return o(r(e))});e.exports=function(e){if(!function(e){return!!e&&"object"==typeof e}(e)||u.call(e)!=n||function(e){var t=!1;if(null!=e&&"function"!=typeof e.toString)try{t=!!(e+"")}catch(n){}return t}(e))return!1;var t=d(e);if(null===t)return!0;var o=s.call(t,"constructor")&&t.constructor;return"function"==typeof o&&o instanceof o&&i.call(o)==c}}}]);