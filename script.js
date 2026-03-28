let interviewList= [];
let rejectedList= [];
let currentStatus= 'all'; 

let total = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");

const allCards = document.getElementById('allCards');
const mainSection= document.querySelector('main');
const filteredSection= document.getElementById("filtered-section");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn= document.getElementById("interview-filter-btn");
const rejectedFilterBtn= document.getElementById("rejected-filter-btn");

function count(){
    total.innerText= allCards.children.length;
    interviewCount.innerText= interviewList.length;
    rejectedCount.innerText= rejectedList.length;

    updateJobCountText();
}
count();

function updateJobCountText(){
    const jobCountDisplay = document.querySelector('main h1 + p');
    const currentCount = allCards.children.length;
    jobCountDisplay.innerText= `${currentCount} jobs`;
}

function toggleStyle(id){
    allFilterBtn.classList.remove("bg-blue-500","text-white");
    interviewFilterBtn.classList.remove("bg-blue-500","text-white");
    rejectedFilterBtn.classList.remove("bg-blue-500","text-white");

    allFilterBtn.classList.add("bg-white","text-[#64748B]");
    interviewFilterBtn.classList.add("bg-white","text-[#64748B]");
    rejectedFilterBtn.classList.add("bg-white","text-[#64748B]");

    const selected= document.getElementById(id);
    currentStatus= id; 

    selected.classList.remove("bg-white","text-[#64748B]");
    selected.classList.add("bg-blue-500","text-white");

    const hiddenMain = document.getElementById("hidden-main");
    // -----------------------

    if (id== "interview-filter-btn"){
        allCards.classList.add("hidden");
        filteredSection.classList.remove("hidden");
        renderInterviewList(); 
    } 
    
    else if (id== "all-filter-btn"){
        allCards.classList.remove("hidden");
        filteredSection.classList.add("hidden");
        hiddenMain.style.display = "none";
    } 
    
    else if (id== "rejected-filter-btn"){
        allCards.classList.add("hidden");
        filteredSection.classList.remove("hidden");
        renderRejectedList(); 
    }
}

 mainSection.addEventListener("click",function(event){

    if (event.target.classList.contains("interview-btn")){
        const jobCard = event.target.parentNode.parentNode.parentNode;

        const jobName= jobCard.querySelector('.company-name').innerText;
        const position= jobCard.querySelector('.position').innerText;
        const salary = jobCard.querySelector('.salary').innerText;
        const description = jobCard.querySelector('.description').innerText;

        jobCard.querySelector('.status-btn').innerText= 'Interview';
        jobCard.querySelector('.status-btn').classList.remove("bg-[#EEF4FF]","text-[14px]");
        jobCard.querySelector('.status-btn').classList.add("bg-green-100","text-green-600","border", "border-green-700");

        const cardInfo= {jobName, position, salary, statusBtn: 'Interview', description};

        const cardExist = interviewList.find(item => item.jobName == cardInfo.jobName);
        if (!cardExist){
            interviewList.push(cardInfo);
        }

        rejectedList = rejectedList.filter(item => item.jobName !== cardInfo.jobName);
  
        if (currentStatus == 'rejected-filter-btn'){
            renderRejectedList();
        }
        count();
        renderInterviewList();

    } 
    
    else if (event.target.classList.contains("rejected-btn")){
        const jobCard = event.target.parentNode.parentNode.parentNode;

        const jobName = jobCard.querySelector('.company-name').innerText;
        const position = jobCard.querySelector('.position').innerText;
        const salary = jobCard.querySelector('.salary').innerText;
        const description = jobCard.querySelector('.description').innerText;

        jobCard.querySelector('.status-btn').innerText = 'Rejected';
        jobCard.querySelector('.status-btn').classList.remove("bg-[#EEF4FF]","text-[14px]");
        jobCard.querySelector('.status-btn').classList.add("bg-red-100","text-red-600","border", "border-red-700");

        const cardInfo = {jobName, position,salary,statusBtn: 'Rejected',description};

        const cardExist= rejectedList.find(item => item.jobName == cardInfo.jobName);
        if (!cardExist){
            rejectedList.push(cardInfo);
        }

        
        
        interviewList = interviewList.filter(item => item.jobName !== cardInfo.jobName);

      
        
        if (currentStatus== "interview-filter-btn"){
            renderInterviewList();
        }


        count();
        renderRejectedList();
    }
    //  delete btn part

    else if (event.target.closest('.btn-delete')) {
        const jobCard = event.target.closest('.card');
        const jobName = jobCard.querySelector('.company-name').innerText;

        jobCard.remove();

        interviewList = interviewList.filter(item => item.jobName !== jobName);
        rejectedList = rejectedList.filter(item => item.jobName !== jobName);

        //update count and text
        count();
        updateJobCountText();
    }
});

function renderInterviewList(){
    // if empty 
    const hiddenMain = document.getElementById("hidden-main"); 
    filteredSection.innerHTML = '';
    if (interviewList.length === 0) {
        filteredSection.classList.add("hidden"); 
        hiddenMain.style.display = "block";      
        return; 
    }
    else{
        hiddenMain.style.display = "none";
        filteredSection.classList.remove("hidden");

    }
    
    
    for (let i = 0; i < interviewList.length; i++){
        let div = document.createElement("div");
        div.className= "card bg-white w-full shadow-sm mt-4 mx-auto p-6"; 
        div.innerHTML= `
        <div class="px-6">
            <h2 class="company-name mt-6 font-semibold text-[18px]">${interviewList[i].jobName}</h2>
            <p class="position text-[16px] text-[#64748B] mt-1">${interviewList[i].position}</p>
            <div  class="flex justify-end" >
                <button class="btn-delete flex justify-end p-[8px] cursor-pointer rounded-full border border-slate-200 mt-[-30px]" > <i class="fa-regular fa-trash-can " style="color: #64748B;"></i></button>
            </div>
        </div>
        <div class="px-6 text-[14px] text-[#64748B] mt-4"><p class="salary">${interviewList[i].salary}</p></div>
        <div class="px-6 mt-5 ">
            <div><button class="status-btn btn font-medium bg-green-100 text-green-600 border border-green-700 text-[14px] rounded-[4px]">${interviewList[i].statusBtn}</button></div>
            <p class="description text-[#323B49] mt-2 ">${interviewList[i].description}</p>
        </div>
        <div class="card-actions justify-start px-6 mt-5 gap-2 flex">
            <button class="interview-btn btn text-[14px] text-green-500 border-green-600 border p-2">Interview</button>
            <button class="rejected-btn btn text-[14px] text-red-500 border-red-600 border p-2">Rejected</button>
        </div>`;
        filteredSection.appendChild(div);
    }
}

function renderRejectedList(){
    
    // if rejected tab empty
    const hiddenMain = document.getElementById("hidden-main");
    filteredSection.innerHTML = '';

    if (rejectedList.length === 0){
        filteredSection.classList.add("hidden");
        hiddenMain.style.display = "block";
        return;
    }
    else{
        hiddenMain.style.display = "none";
        filteredSection.classList.remove("hidden");

    }
    
    for (let i = 0; i < rejectedList.length; i++){
        let div = document.createElement("div");
        div.className= "card bg-white w-full shadow-sm mt-4 mx-auto p-6"; 
        div.innerHTML= `
        <div class="px-6">
            <h2 class="company-name mt-6 font-semibold text-[18px]">${rejectedList[i].jobName}</h2>
            <p class="position text-[16px] text-[#64748B] mt-1">${rejectedList[i].position}</p>
            <div  class="flex justify-end" >
                       <button class="btn-delete flex justify-end p-[8px] cursor-pointer rounded-full border border-slate-200 mt-[-30px]" > <i class="fa-regular fa-trash-can " style="color: #64748B;"></i></button>
             </div>
        </div>
        <div class="px-6 text-[14px] text-[#64748B] mt-4"><p class="salary">${rejectedList[i].salary}</p></div>
        <div class="px-6 mt-5 ">
            <div><button class="status-btn btn font-medium bg-red-100 text-red-600 border border-red-700 text-[14px] rounded-[4px]">${rejectedList[i].statusBtn}</button></div>
            <p class="description text-[#323B49] mt-2 ">${rejectedList[i].description}</p>
        </div>
        <div class="card-actions justify-start px-6 mt-5 gap-2 flex">
            <button class="interview-btn btn text-[14px] text-green-500 border-green-600 border p-2">Interview</button>
            <button class="rejected-btn btn text-[14px] text-red-500 border-red-600 border p-2">Rejected</button>
        </div>`;
        filteredSection.appendChild(div);
    }
}