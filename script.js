let interviewList=[];
let rejectedList=[];

let total=document.getElementById("total-count");
// console.log("selected1");
let interviewCount=document.getElementById("interview-count");
// console.log("selected2");
let rejectedCount=document.getElementById("rejected-count");
// console.log("selected");


const allCards=document.getElementById('allCards');
//  console.log(allCards.children.length);

 const mainSection=document.querySelector('main');
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

    // show selected card section in interview tab
    if(id=="interview-filter-btn"){
        allCards.classList.add("hidden");
        filteredSection.classList.remove("hidden");
    }
    else if(id=="all-filter-btn"){
        allCards.classList.remove("hidden");
        filteredSection.classList.add("hidden");
    }

 }

// 


mainSection.addEventListener("click",function(event){

    // console.log(event.target);

    // console.log(event.target.classList.contains("interview-btn"));
    if(event.target.classList.contains("interview-btn")){
        console.log(event.target.parentNode.parentNode.parentNode);
    const jobCard=event.target.parentNode.parentNode.parentNode;

    const jobName =jobCard.querySelector('.company-name').innerText;
    const position=jobCard.querySelector('.position').innerText;
    const salary=jobCard.querySelector('.salary').innerText;
    const statusBtn=jobCard.querySelector('.status-btn').innerText;
    const description=jobCard.querySelector('.description').innerText;
    // console.log(jobName,position,salary,statusBtn,description);

    
    jobCard.querySelector('.status-btn').innerText='Interview';
    jobCard.querySelector('.status-btn').classList.remove("bg-[#EEF4FF]","text-[14px]");
    jobCard.querySelector('.status-btn').classList.add("bg-green-100","text-green-600", "border", "border-green-700");
    
    // CARD InFO OBJECT
    const cardInfo={jobName,position,salary,statusBtn:'Interview',description};
    

    const cardExist = interviewList.find(item =>item.jobName == cardInfo.jobName);

    
    


    if(!cardExist){
     interviewList.push(cardInfo);
     }

    renderInterviewList();

    }
    
})

 const filteredSection=document.getElementById("filtered-section");
 function renderInterviewList(){
    filteredSection.innerHTML='';

    for(let i=0;i<interviewList.length;i++){
        console.log(interviewList);
    
    

        let div=document.createElement("div");

        div.className="card bg-white w-[1110px] h-[295px] shadow-sm mt-4 mx-auto";
        div.innerHTML=`
        <div class="px-6">
                     <h2 id="" class="company-name mt-6 font-semibold text-[18px]">${interviewList[i].jobName}</h2>
                     <p id="" class="position text-[16px] text-[#64748B] mt-1">${interviewList[i].position}</p>
                      <div  class="flex justify-end" >
                       <button class=" flex justify-end p-[8px] cursor-pointer rounded-full border border-slate-200 mt-[-30px]" > <i class="fa-regular fa-trash-can " style="color: #64748B;"></i></button>
                      </div>    
                </div>
                 <div  class="px-6 text-[14px] text-[#64748B] mt-4"><p class="salary">${interviewList[i].salary}</p></div>

                 <div class="px-6 mt-5 ">
                      <div><button id="not-applied-btn" class="status-btn btn font-medium bg-[#EEF4FF] text-[14px] rounded-[4px]">${interviewList[i].statusBtn}</button></div>
                      <p class="description text-[#323B49] mt-2 ">${interviewList[i].description}</p>
                    </div>
              <div class="card-actions justify-start px-6 mt-5 gap-2">
                   <div class="">
                        <button  class="interview-btn btn text-[14px] text-green-500 border-green-600">Interview</button>
                    </div>
                    <div class="">
                         <button class="rejected-btn btn font-[24px] text-red-500 border-red-600">Rejected</button>

                    </div>
                
                </div>
        
        
        `
         filteredSection.appendChild(div);
    }
    count();

 }
