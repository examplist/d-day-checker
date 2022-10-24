(()=>{"use strict";const t=document.createElement("div");t.classList.add("title"),t.innerText="D-Day 확인하기";const e=t,n="http://localhost:4000",i=document.createElement("div");function s(t,e){t.addEventListener("click",(t=>{d=e,Array.from(i.children).forEach((t=>{t.classList.remove("selected")})),t.currentTarget&&t.currentTarget instanceof HTMLButtonElement&&t.currentTarget.classList.add("selected"),p(1,e)}))}i.classList.add("sort");const a=document.createElement("button");a.innerText="작성순",s(a,"id");const c=document.createElement("button");c.innerText="날짜순",s(c,"date");let d="id";a.classList.add("selected"),i.append(a),i.append(c);const r=i;class o{constructor(t,e,n){this.id=t,this.$item=document.createElement("div"),this.$item.classList.add("item"),this.$firstLine=document.createElement("div"),this.$firstLine.classList.add("first-line"),this.$dDay=document.createElement("div"),this.$dDay.classList.add("d-day"),this.$date=document.createElement("div"),this.$date.classList.add("date"),this.$inputDate=document.createElement("input"),this.$inputDate.setAttribute("type","date"),this.$inputDate.classList.add("input-date","hide"),this.$content1=document.createElement("div"),this.$content1.classList.add("content"),this.$inputContent1=document.createElement("input"),this.$inputContent1.setAttribute("type","text"),this.$inputContent1.classList.add("input-content","hide"),this.$edit=document.createElement("button"),this.$edit.classList.add("edit"),this.$delete=document.createElement("button"),this.$delete.classList.add("delete"),this.$confirm=document.createElement("button"),this.$confirm.classList.add("confirm","hide"),this.$cancel=document.createElement("button"),this.$cancel.classList.add("cancel","hide"),this.$secondLine=document.createElement("div"),this.$secondLine.classList.add("second-line"),this.$content2=document.createElement("div"),this.$content2.classList.add("content"),this.$inputContent2=document.createElement("input"),this.$inputContent2.setAttribute("type","text"),this.$inputContent2.classList.add("input-content","hide"),this.$date.innerText=function(t){const e=t.split("-").map((t=>parseInt(t)));return`${e[0]}년 ${e[1]}월 ${e[2]}일`}(e),this.$content1.innerText=n,this.$edit.innerText="수정",this.$delete.innerText="삭제",this.$confirm.innerText="확인",this.$cancel.innerText="취소",this.$content2.innerText=n,this.$dDay.innerText=function(t){const e=new Date(t+"T00:00:00"),n=new Date,i=Number(n)-Number(e),s=Math.floor(i/864e5);let a;return a=0===s?"D-Day":s>0?`D+${s}`:`D${s}`,a}(e),this.$edit.addEventListener("click",this.editItem),this.$delete.addEventListener("click",this.deleteItem),this.$confirm.addEventListener("click",this.confirmEdit),this.$cancel.addEventListener("click",this.cancelEdit),this.$inputContent1.addEventListener("input",(t=>{t.currentTarget&&t.currentTarget instanceof HTMLInputElement&&(this.$inputContent2.value=t.currentTarget.value)})),this.$inputContent2.addEventListener("input",(t=>{t.currentTarget&&t.currentTarget instanceof HTMLInputElement&&(this.$inputContent1.value=t.currentTarget.value)})),this.$firstLine.appendChild(this.$dDay),this.$firstLine.appendChild(this.$date),this.$firstLine.appendChild(this.$inputDate),this.$firstLine.appendChild(this.$content1),this.$firstLine.appendChild(this.$inputContent1),this.$firstLine.appendChild(this.$edit),this.$firstLine.appendChild(this.$delete),this.$firstLine.appendChild(this.$confirm),this.$firstLine.appendChild(this.$cancel),this.$secondLine.appendChild(this.$content2),this.$secondLine.appendChild(this.$inputContent2),this.$item.appendChild(this.$firstLine),this.$item.appendChild(this.$secondLine)}toggleHide=()=>{Array.from(this.$firstLine.children).forEach((t=>{t.classList.toggle("hide")})),Array.from(this.$secondLine.children).forEach((t=>{t.classList.toggle("hide")}))};editItem=()=>{this.toggleHide(),this.$inputDate.value=function(t){const e=t.split(/\D\s?/);return e.pop(),e.map((t=>1===t.length?"0"+t:t)).join("-")}(this.$date.innerText),this.$inputContent1.value=this.$content1.innerText,this.$inputContent2.value=this.$content2.innerText};deleteItem=async()=>{if(confirm("정말로 삭제하시겠습니까?"))try{await async function(t){const e=await fetch(`${n}/${t}`,{method:"DELETE"}),{isRemoved:i}=await e.json();return i}(this.id)?p(1,d):alert("삭제를 하지 못했습니다.")}catch(t){console.error(t),alert("삭제를 하지 못했습니다.")}};confirmEdit=async()=>{const t={date:this.$inputDate.value,content:this.$inputContent1.value};try{await async function(t,e){const i=await fetch(`${n}/${t}`,{method:"PUT",headers:{"content-Type":"application/json"},body:JSON.stringify(e)});return await i.json()}(this.id,t),p(1,d)}catch(t){console.error(t),alert("수정을 하지 못했습니다.")}};cancelEdit=()=>{this.toggleHide()}}const l=document.createElement("div");l.classList.add("pagination");const h=l,u=document.createElement("div");async function p(t,e){u.innerHTML="",u.classList.add("container","loading");try{const i=await async function(t,e,i){const s=await fetch(`${n}?page=${t}&sort=${e}&limit=4`);return await s.json()}(t,e);u.classList.remove("loading"),0===i.length?(u.classList.add("no-content"),u.innerText="자료가 없습니다."):(i.forEach((t=>{const{id:e,date:n,content:i}=t,s=new o(e,n,i);u.append(s.$item)})),async function(t){let e;l.innerHTML="";try{e=await async function(){const t=await fetch(n+"/count"),{count:e}=await t.json();return e}()}catch(t){console.error(t),alert("일정의 개수를 파악할 수 없습니다."),e=0}let i=Math.ceil(e/4),s=3*Math.ceil(t/3);s>i&&(s=i);let a=s-2;a<1&&(a=1);const c=s+1,r=a-1;if(r>0){const e=document.createElement("button");e.classList.add("prev"),e.innerText="이전",e.addEventListener("click",(()=>{p(t=r,d)})),l.append(e)}for(let e=a;e<=s;e++){const n=document.createElement("button");n.setAttribute("id","page_"+e),n.innerText=e.toString(),t===e&&n.classList.add("selected"),n.addEventListener("click",(e=>{e.currentTarget&&e.currentTarget instanceof HTMLButtonElement&&(t=parseInt(e.currentTarget.innerText)),p(t,d)})),l.append(n)}if(s<i){const e=document.createElement("button");e.classList.add("next"),e.innerText="다음",e.addEventListener("click",(()=>{p(t=c,d)})),l.append(e)}}(t))}catch(t){console.error(t),u.classList.remove("loading"),u.classList.add("error"),u.innerText="죄송합니다. 현재 자료를 불러올 수 없습니다."}}p(1,d);const $=u,m=document.querySelector("#app"),L=(new class{constructor(){this.$add=document.createElement("form"),this.$add.classList.add("add"),this.$inputDate=document.createElement("input"),this.$inputDate.setAttribute("type","date"),this.$inputDate.classList.add("date"),this.$inputContent=document.createElement("input"),this.$inputContent.setAttribute("type","text"),this.$inputContent.classList.add("text"),this.$inputSubmit=document.createElement("input"),this.$inputSubmit.setAttribute("type","submit"),this.$inputSubmit.value="추가",this.$inputSubmit.classList.add("submit"),this.$add.append(this.$inputDate),this.$add.append(this.$inputContent),this.$add.append(this.$inputSubmit),this.$add.addEventListener("submit",this.add)}add=async t=>{t.preventDefault();const e={date:this.$inputDate.value,content:this.$inputContent.value};try{await async function(t){const e=await fetch(n,{method:"POST",headers:{"content-Type":"application/json"},body:JSON.stringify(t)});return await e.json()}(e),this.$inputDate.value="",this.$inputContent.value="",p(1,d)}catch(e){console.error(t),alert("일정을 추가하지 못했습니다!")}}}).$add;m?.append(e),m?.append(L),m?.append(r),m?.append($),m?.append(h)})();