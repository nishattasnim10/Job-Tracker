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
}
count();

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

    if (id == "interview-filter-btn"){
        allCards.classList.add("hidden");
        filteredSection.classList.remove("hidden");
        renderInterviewList(); 
    } 
    
    else if (id== "all-filter-btn"){
        allCards.classList.remove("hidden");
        filteredSection.classList.add("hidden");
    } 
    
    else if (id== "rejected-filter-btn"){
        allCards.classList.add("hidden");
        filteredSection.classList.remove("hidden");
        renderRejectedList(); 
    }
}

 mainSection.addEventListener("click",function (event){

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
});

function renderInterviewList(){
    filteredSection.innerHTML = '';
    for (let i = 0; i < interviewList.length; i++){
        let div = document.createElement("div");
        div.className= "card bg-white w-full shadow-sm mt-4 mx-auto p-6"; // Styling fix
        div.innerHTML= `
        <div class="px-6">
            <h2 class="company-name mt-6 font-semibold text-[18px]">${interviewList[i].jobName}</h2>
            <p class="position text-[16px] text-[#64748B] mt-1">${interviewList[i].position}</p>
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
    filteredSection.innerHTML = '';
    for (let i = 0; i < rejectedList.length; i++){
        let div = document.createElement("div");
        div.className= "card bg-white w-full shadow-sm mt-4 mx-auto p-6"; // Styling fix
        div.innerHTML= `
        <div class="px-6">
            <h2 class="company-name mt-6 font-semibold text-[18px]">${rejectedList[i].jobName}</h2>
            <p class="position text-[16px] text-[#64748B] mt-1">${rejectedList[i].position}</p>
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