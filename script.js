let interviewList=[{name:1}];
let rejectedList=[];

let total=document.getElementById("total-count");
// console.log("selected1");
let interviewCount=document.getElementById("interview-count");
// console.log("selected2");
let rejectedCount=document.getElementById("rejected-count");
// console.log("selected");

let allCards=document.getElementById("allCards");
 console.log(allCards.children.length);

 let mainSection=document.querySelector('main');
 console.log(mainSection);

 function count(){
     total.innerText=allCards.children.length;
     interviewCount.innerText=interviewList.length;
     rejectedCount.innerText=rejectedList.length;
    
 }
 count();

//  available jobs buttons
const allFilterBtn=document.getElementById("all-filter-btn");
const interviewFilterBtn=document.getElementById("interview-filter-btn");
const rejectedFilterBtn=document.getElementById("rejected-filter-btn");

 function toggleStyle(id){
    allFilterBtn.classList.remove("bg-blue-500","text-white");
    interviewFilterBtn.classList.remove("bg-blue-500","text-white");
    rejectedFilterBtn.classList.remove("bg-blue-500","text-white");

    allFilterBtn.classList.add("bg-white","text-[#64748B]");
    interviewFilterBtn.classList.add("bg-white","text-[#64748B]");
    rejectedFilterBtn.classList.add("bg-white","text-[#64748B]");

    console.log(id);
    const selected=document.getElementById(id);
    console.log(selected);

    selected.classList.remove("bg-white","text-[#64748B]");
    selected.classList.add("bg-blue-500","text-white");




 }