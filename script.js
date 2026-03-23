const content = document.querySelector("#content");
const submit = document.querySelector("#add");
const update = document.querySelector("#upt");
const recordCount = document.querySelector("#recordCount");

//POST API
submit.addEventListener("click", () => {
    

    let itemName = document.querySelector("#itemName").value;
    let itemCode = document.querySelector("#itemCode").value;
    let originalPrice = document.querySelector("#originalPrice").value;
    let discountPrice = document.querySelector("#discountPrice").value;
    let itemImage = document.querySelector("#itemImage").value;

    if (discountPrice === "") {
    discountPrice = 0; 
}

    let formData = { itemName, itemCode, originalPrice, discountPrice, itemImage };

    fetch("https://backend-crud-idjh.onrender.com/api/users", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    }).catch((error) => {
        console.log(error);
    });
    alert("User Added Successfully");
    location.reload();
    
    window.addEventListener("load", getUsers);
});

window.addEventListener("load", () => {
    getUsers()
});

function getUsers(){
    let html=""
    //FETCH API
    fetch('https://backend-crud-idjh.onrender.com/api/users',{mode:'cors'})
    .then(response=>{
        console.log(response);
        return response.json();
    })
    .then(data=>{
        console.log(data);
        recordCount.textContent = `${data.length} Records`;
        
        data.forEach(element=>{
            html+=`
            <tr>

                <td class="ps-4 fw-bold text-muted">#${element.itemCode}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="fw-bold text-dark">${element.itemName}</div>
                    </div>
                </td>    
                <td><span class="text-muted">₱${element.originalPrice}</span></td>
                <td><span class="text-muted">₱${element.discountPrice}</span></td>
                <td>
                <img src="${element.itemImage}" alt="dish" width="100" height="70" style="object-fit: cover; border-radius: 5px;" onerror="this.src='https://via.placeholder.com/50?text=No+Img'"></td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-dark me-1" onclick="searchMember(${element.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteMember(${element.id})">
                        <i class="bi bi-trash3"></i>
                    </button>
                </td>
            </tr>`;
        })
        content.innerHTML=html;
    })
    .catch(error=>{
        console.log(error);
        recordCount.textContent = "0 Records";
        content.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-4 text-muted">
                    <i class="bi bi-exclamation-circle display-7 d-block mb-2"></i>
                    No records found or server not running
                </td>
            </tr>`;
    })
}

function deleteMember(id){
    if(confirm("Are you sure you want to delete this user?")){
        fetch('https://backend-crud-idjh.onrender.com/api/users',{
            method: 'DELETE',
            body: JSON.stringify({id}),
            headers:{
                "Content-Type":"application/json"
            },
        }).then(response=>response.text())
        .then(response=>console.log(response))
        .catch(error=>{
            console.log(error);
        })
        alert("User Deleted Successfully");
        location.reload();
    } 
}

function searchMember(id){
    fetch(`https://backend-crud-idjh.onrender.com/api/users/${id}`)
    .then(response=> response.json())
    .then(data=>{
    document.querySelector('#itemName').value=data[0].itemName;
    document.querySelector('#itemCode').value=data[0].itemCode;
    document.querySelector('#originalPrice').value=data[0].originalPrice;
    document.querySelector('#discountPrice').value=data[0].discountPrice;
    document.querySelector('#ID').value=data[0].id;
    
    // Scroll to form
    document.querySelector('#itemName').scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.querySelector('#itemName').focus();
    }).catch(error=>{
    console.log(error)
    })
}

update.addEventListener(`click`,()=>{
    let itemName = document.querySelector("#itemName").value;
    let itemCode = document.querySelector("#itemCode").value;
    let originalPrice = document.querySelector("#originalPrice").value;
    let discountPrice = document.querySelector("#discountPrice").value;
    let itemImage = document.querySelector("#itemImage").value;
    let ID = document.querySelector("#ID").value;

    if (discountPrice === "") {
    discountPrice = 0; 
}
    let formData = {itemName, itemCode, originalPrice, discountPrice, itemImage,id:ID};

    if(confirm("Are you sure you want to update this user?")){
        fetch(`https://backend-crud-idjh.onrender.com/api/users`,{
        method: 'PUT',
        body: JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json"
        },
        }).catch((error)=>{
        console.log(error);
        })
        alert("User Updated Successfully");
        location.reload();
    } 
})
