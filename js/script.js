const loadPhone = async(phoneName) =>{
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
    else{
        showAllDiv.classList.add('hidden');
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
            <h2 class="">${element.phone_name}</h2>
            <p class="">Price: </p>
            <div class="card-actions justify-center">
            <button class="btn btn-primary btn-sm px-8">Buy Now</button>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);
};

const searchFunction = () =>{
    const inputField = document.getElementById('search-field');
    const inputText = inputField.value;
    if(inputText === ''){
        alert('plese put some value');
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