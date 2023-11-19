function AddDataItems(event) {
    event.preventDefault();
    let Image = document.getElementById('imageinput');
    let category = document.getElementById("catinput").value;
    let name = document.getElementById("nameinput").value;
    let price = document.getElementById("priceInput").value;
    let Quantity = document.getElementById("quantinput").value;
    //   console.log(category);
    //   console.log(name);
    //   console.log(price);


    let imageFile = Image.files[0];
    // console.log(imageFile)
    let imageUrl = URL.createObjectURL(imageFile);


    let Product_Data = {
        Image,
        category,
        name,
        Quantity,
        price,
    };


    //   console.log(Product_Data);
    postData(Product_Data);



}
window.addEventListener("DOMContentLoaded", () => {
    axios
        .get(
            "https://crudcrud.com/api/b8abe0b485d046c5a0c973f64fe08d26/ProductData"
        )
        .then((res) => {
            for (var i = 0; i < res.data.length; i++) {
                DisplayData(res.data[i]); //iterate all product data objects
            }
        })
        .catch((err) => console.log(err));
});

function postData(Product_Data) {
    axios
        .post(
            "https://crudcrud.com/api/b8abe0b485d046c5a0c973f64fe08d26/ProductData",
            Product_Data
        )
        .then((res) => {
            DisplayData(res.data);
            //   console.log(res.data);
        })
        .catch((err) => console.log(err));
    //   console.log(data);
}

function DisplayData(ProductData) {


    let parentELe = document.getElementById('tableinput');

    let new_row = document.createElement('tr');

    let imgCell = document.createElement('td');
    let imgElement = document.createElement('img');
    // imgElement.src ='ProductData.Image'; //error in api object-object
    imgElement.alt = 'Product Image';
    imgCell.appendChild(imgElement);
    new_row.appendChild(imgCell);

    let newcell1 = document.createElement('td')
    newcell1.textContent = ProductData.category
    new_row.appendChild(newcell1)

    let newcell2 = document.createElement('td')
    newcell2.textContent = ProductData.name
    new_row.appendChild(newcell2)

    let newcell3 = document.createElement('td')
    newcell3.textContent = ProductData.Quantity
    new_row.appendChild(newcell3)

    let newcell4 = document.createElement('td')
    newcell4.textContent = ProductData.price
    new_row.appendChild(newcell4)


    let editcell = document.createElement('td')
    let editbtn = document.createElement('input')
    editbtn.value = 'Edit'
    editbtn.type = "button"
    editbtn.className = "btn btn-success btn-sm float-right mt-1 p-1 edit";
    editcell.appendChild(editbtn)
    new_row.appendChild(editcell)

    editbtn.onclick = function () {
        EditData(ProductData)
        new_row.remove();
    }

    let deleteCell = document.createElement('td')
    let deletebtn = document.createElement('input')
    deletebtn.value = 'Delete'
    deletebtn.type = "button"
    deletebtn.className = "btn btn-danger btn-sm float-left mt-1 p-1 delete";
    deleteCell.appendChild(deletebtn)
    new_row.appendChild(deleteCell)

    deletebtn.onclick = function () {
        deleteProduct(ProductData._id)
        new_row.remove();
    }

    let increaseCell = document.createElement('td')
    let increaseBtn = document.createElement('Button')
    increaseBtn.textContent = '+';
    increaseBtn.className = "btn btn-primary btn-sm float-left mt-1 p-1 Manger";
    increaseCell.appendChild(increaseBtn)
    new_row.appendChild(increaseCell)

    let updatedQuantity
    let updatedPrice

    increaseBtn.onclick = function () {
        updatedQuantity = parseInt(ProductData.Quantity) + 1
        updatedPrice = parseInt(ProductData.price) * updatedQuantity

        PutUpdateQuantPriceManger(ProductData._id, ProductData.Image, ProductData.category, ProductData.name, updatedQuantity, updatedPrice)
        newcell3.textContent = updatedQuantity
        newcell4.textContent = updatedPrice
    }

    let decreaseCell = document.createElement('td')
    let decreaseBtn = document.createElement('Button')
    decreaseBtn.textContent = '-';
    decreaseBtn.className = "btn btn-primary btn-sm float-left mt-1 p-1 Manger";
    decreaseCell.appendChild(decreaseBtn)
    new_row.appendChild(decreaseCell)


    decreaseBtn.onclick = function () {
        updatedQuantity = parseInt(ProductData.Quantity) - 1;

        //        updatedPrice = Math.floor(updatedPrice / updatedQuantity)
        updatedQuantity = Math.max(updatedQuantity, 1);

        // Calculate the updated price based on the decreased quantity
        updatedPrice = Math.floor(updatedPrice / (updatedQuantity + 1));


        PutUpdateQuantPriceManger(ProductData._id, ProductData.Image, ProductData.category, ProductData.name, updatedQuantity, updatedPrice)
        newcell3.textContent = updatedQuantity
        newcell4.textContent = updatedPrice

    }




    parentELe.appendChild(new_row)


    // let parentELe = document.getElementById('tableinput');

    //   let new_row = document.createElement('tr');

    //   new_row.innerHTML = `
    //       <td>${ProductData.category}</td>
    //       <td>${ProductData.name}</td>
    //       <td>${ProductData.price}</td>
    //   `;

    //   parentELe.appendChild(new_row);


}
function deleteProduct(UserId) {
    axios
        .delete(`https://crudcrud.com/api/b8abe0b485d046c5a0c973f64fe08d26/ProductData/${UserId}`)
        .then((res) => console.log('Deleted Object product', UserId))
        .catch((err) => console.log(err))
}

//when you click manager btn and increase quantity wiht price and put data inside the api crudcrud
function PutUpdateQuantPriceManger(UserId, Image, category, name, updatedQuantity, updatedPrice) {
    axios
        .put(`https://crudcrud.com/api/b8abe0b485d046c5a0c973f64fe08d26/ProductData/${UserId}`, {
            Image: Image,
            category: category,
            name: name,
            Quantity: updatedQuantity,
            price: updatedPrice,
        })
        .then((res) => console.log('updated price and quantity', UserId))
        .catch((err) => console.log(err))
}

//Edit data
function EditData(Product_Data) {
    // console.log(Product_Data.name)

    deleteProduct(Product_Data._id)


    if (Product_Data) {
        let Image = document.getElementById('imageinput');
        document.getElementById("catinput").value = Product_Data.category;
        document.getElementById("nameinput").value = Product_Data.name;
        document.getElementById("priceInput").value = Product_Data.price;
        document.getElementById("quantinput").value = Product_Data.Quantity;

    }

}










