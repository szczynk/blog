(window.webpackJsonp=window.webpackJsonp||[]).push([[11,6],{295:function(t,e,n){t.exports=n.p+"img/128affc.png"},300:function(t,e){},301:function(t,e){},307:function(t,e,n){var map={"./introduction.png":295};function o(t){var e=r(t);return n(e)}function r(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}o.keys=function(){return Object.keys(map)},o.resolve=r,t.exports=o,o.id=307},320:function(t,e){},325:function(t,e){},336:function(t,e,n){"use strict";n.r(e);var o={props:{prev:{type:Object,default:function(){return null}},next:{type:Object,default:function(){return null}}}},r=n(5),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex justify-between space-x-4"},[t.prev?n("NuxtLink",{staticClass:"no-underline",attrs:{to:t.prev.slug}},[t._v("\n    "+t._s(t.prev.title)+"\n  ")]):n("span",[t._v(" ")]),t._v(" "),t.next?n("NuxtLink",{staticClass:"no-underline",attrs:{to:t.next.slug}},[t._v("\n    "+t._s(t.next.title)+"\n  ")]):n("span",[t._v(" ")])],1)}),[],!1,null,null,null);e.default=component.exports},337:function(t,e,n){var map={"./introduction.png":338};function o(t){var e=r(t);return n(e)}function r(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}o.keys=function(){return Object.keys(map)},o.resolve=r,t.exports=o,o.id=337},338:function(t,e,n){var o={src:n.p+"img/39aa17f.png",preSrc:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACASURBVG3BzQoBURiA4Zc56iiUn8UoscLCHUyuwoXO3g0oqyn7yU9JaiRG50xpfJqaI8nzVADhj6pu8cruOIovjeGU9iyg4w+4Go9kHWJ2GwqKktcd4c8X9PpNdF2jTY3jeYujKOWXA6fVEpmMuaUW7IPcpjiKD+GZxMT7CET49QYopydmMwhWiQAAAABJRU5ErkJggg=="};t.exports=o.preSrc,t.exports=Object.assign(t.exports,o)},358:function(t,e){},378:function(t,e,n){"use strict";n.r(e);var o=n(24),r=n(8),c=(n(29),n(44),n(11),n(34),n(25),n(33),n(339)),l={asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,c,l,m,d,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,r=t.params,e.next=3,n(r.slug).fetch();case 3:return c=e.sent,e.next=6,n().only(["title","slug","createdAt"]).sortBy("createdAt","asc").surround(r.slug).fetch();case 6:return l=e.sent,m=Object(o.a)(l,2),d=m[0],f=m[1],e.abrupt("return",{blog:c,prev:d,next:f});case 11:case"end":return e.stop()}}),e)})))()},head:function(){var t="https://szczynk.github.io",e="https://szczynk.github.io/blog/".concat(this.blog.slug),o=new Date(this.blog.createdAt),r=new Date(this.blog.updatedAt),c=n(307)("./".concat(this.blog.cover.thumb)),l=this.blog.title;this.blog.description&&(l=this.blog.description);var m={"@context":"https://schema.org","@type":"BlogPosting",mainEntityOfPage:{"@type":"WebPage","@id":e},headline:this.blog.title,description:l,image:t+c,author:{"@type":"Person",name:"szczynk",url:"https://szczynk.github.io/resume/"},datePublished:o.toISOString(),dateModified:r.toISOString()},head={title:"".concat(this.blog.title," | Szczynk Blog"),link:[{rel:"canonical",href:e}],script:[{type:"application/ld+json",json:m}],meta:[]};return[{name:"author",content:"szczynk"},{name:"apple-mobile-web-app-title",content:"".concat(this.blog.title," | Szczynk Blog")},{name:"description",content:l},{property:"og:title",content:"".concat(this.blog.title," | Szczynk Blog")},{property:"og:description",content:l},{property:"og:type",content:"website"},{property:"og:url",content:e},{property:"og:image",content:t+c},{property:"og:image:width",content:1200},{property:"og:image:height",content:638},{property:"og:locale",content:"en"},{property:"og:site_name",content:"".concat(this.blog.title," | Szczynk Blog")},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:site",content:"@szczynk"},{name:"twitter:creator",content:"@szczynk"},{name:"twitter:title",content:"".concat(this.blog.title," | Szczynk Blog")},{name:"twitter:description",content:l},{name:"twitter:image",content:t+c},{name:"twitter:image:width",content:1200},{name:"twitter:image:height",content:638}].forEach((function(t){void 0!==t.content&&null!==t.content&&(Object.prototype.hasOwnProperty.call(t,"name")?head.meta.push({hid:t.name,name:t.name,content:t.content}):Object.prototype.hasOwnProperty.call(t,"property")&&head.meta.push({hid:t.property,property:t.property,content:t.content}))})),head},methods:{sanitizeHtml:n.n(c).a}},m=n(5),component=Object(m.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("article",{staticClass:"px-4 md:mx-8 md:p-8 lg:mx-16 lg:p-16"},[o("h1",{staticClass:"text-4xl mb-3"},[t._v("\n    "+t._s(t.blog.title)+"\n  ")]),t._v(" "),t.blog.lead?o("h2",{staticClass:"text-2xl mb-3"},[t._v("\n    "+t._s(t.blog.lead)+"\n  ")]):t._e(),t._v(" "),o("div",{staticClass:"text-sm mb-3"},[o("a",{staticClass:"text-black font-bold mr-2 dark:text-white",attrs:{href:"https://szczynk.github.io/resume/"}},[t._v("\n      szczynk\n    ")]),t._v(" "),t.blog.createdAt?o("span",{staticClass:"text-gray-600 dark:text-gray-400"},[t._v("\n      "+t._s(t.$moment(t.blog.createdAt).format("LLL"))+"\n    ")]):t._e()]),t._v(" "),t.blog.tags.length?o("div",{staticClass:"flex flex-wrap mb-3"},t._l(t.blog.tags,(function(e){return o("span",{key:e,staticClass:"\n        inline-flex\n        items-center\n        bg-gray-200\n        rounded-full\n        px-3\n        py-1\n        text-xs\n        font-semibold\n        mr-2\n        mb-2\n        dark:bg-gray-700\n      "},[t._v("\n      "+t._s(e)+"\n    ")])})),0):t._e(),t._v(" "),t.blog.cover?o("figure",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"my-4 w-full"},[o("img",{attrs:{"data-src":n(307)("./"+t.blog.cover.thumb),"data-loading":n(337)("./"+t.blog.cover.thumb),alt:t.blog.cover.alt?t.blog.cover.alt:t.blog.title}}),t._v(" "),o("figcaption",{staticClass:"text-sm text-center",domProps:{innerHTML:t._s(t.sanitizeHtml(t.blog.cover.caption))}})]):t._e(),t._v(" "),t.blog.toc.length>1?o("nav",[o("ul",{staticClass:"px-4 my-4"},t._l(t.blog.toc,(function(link){return o("li",{key:link.id,staticClass:"list-disc pl-1",class:{"ml-5":3===link.depth}},[o("NuxtLink",{staticClass:"no-underline",attrs:{to:"#"+link.id}},[t._v("\n          "+t._s(link.text)+"\n        ")])],1)})),0)]):t._e(),t._v(" "),o("NuxtContent",{staticClass:"my-8",attrs:{document:t.blog}}),t._v(" "),o("PrevNext",{staticClass:"mt-16",attrs:{prev:t.prev,next:t.next}})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{PrevNext:n(336).default})}}]);