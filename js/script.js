const loadPhone = async(phoneName = 13) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
};

const displayPhones = (phones) =>{
    console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    // to clear the phone cards
    phoneContainer.textContent = '';
    
    // show all btn functionalities
    const showAllDiv = document.getElementById('show-all-btn-container');
    if(phones.length > 12){
        showAllDiv.classList.remove('hidden');
        showAllDiv.classList.add('flex', 'justify-center');
        
    }
    else if(phones.length === 0){
        showAllDiv.classList.add('hidden');
    }
    else if(phones.length > 0){
        showAllDiv.classList.remove('flex', 'justify-center');
    }
    // show all btn functionalities ends here

    // setting the phone limit
    phones = phones.slice(0, 12);

    phones.forEach(element => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList ='card bg-gray-200 shadow-xl p-7';
        phoneDiv.innerHTML = `
        <figure class="bg-white p-14 rounded-3xl">
            <img draggable='false' src="${element.image}" />
        </figure>
        <div class="card-body text-center">
            <h2 class="text-2xl">${element.phone_name}</h2>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${element.slug}');" class="btn btn-primary btn-sm px-8">Show Details</button>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);
};

// phone details functionalities are here............
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`) ;
    const data = await res.json();
    const phoneDetail = data.data;
    showPhoneDetails(phoneDetail);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const showDetail = document.getElementById('show-detail-modal');
    showDetail.innerHTML = `
    <dialog id="show_detail_modal" class="modal">
        <form method="dialog" class="modal-box">
            <img src='${phone.image}' class="w-36 mx-auto"/>
            <h3 class="font-extrabold text-2xl">${phone.name}</h3>
            <p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <p><span class="font-bold text-xl">Storage: </span> ${phone.mainFeatures.storage}</p>
            <p><span class="font-bold text-xl">Display Phone: </span> ${phone.mainFeatures.displaySize}</p>
            <p><span class="font-bold text-xl">Chipset: </span> ${phone.mainFeatures.chipSet}</p>
            <p><span class="font-bold text-xl">Storage: </span> ${phone.mainFeatures.storage}</p>
            <p><span class="font-bold text-xl">Storage: </span> ${phone.mainFeatures.storage}</p>
            <p><span class="font-bold text-xl">Storage: </span> ${phone.mainFeatures.storage}</p>
            <p><span class="font-bold text-xl">Storage: </span> ${phone.mainFeatures.storage}</p>
        </form>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
    
    `;
    show_detail_modal.showModal()
}


const searchFunction = () =>{
    const noData = document.getElementById('noData');
    const inputField = document.getElementById('search-field');
    const inputText = inputField.value;
    if(inputText === ''){
        alert('please put some value');
    }
    toggleSpinner(true);
    inputField.value = '';
    loadPhone(inputText);
}

const toggleSpinner = (isLoading) => {
    const spinner = document.getElementById('spinnerDiv');
    if(isLoading){
        spinner.classList.remove('hidden');
    }
    else{
        spinner.classList.add('hidden');
    }
};

loadPhone()