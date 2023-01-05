function saveToLocalStorage(event){
    event.preventDefault();
    const price = event.target.prices.value;
    const dish = event.target.dishes.value;
    const table = event.target.table.value;

    

const obj={
    price,
    dish,
    table
}
  //////save user on crud crud
  axios.post("https://crudcrud.com/api/093faa9a02a74d4ebe526d543b51769e/waitersorder", obj)
  .then((responce) => {
      showNewUserOnScreen(responce.data);
      console.log(responce.data);
  })
  .catch((err) => {
      console.log(err);
  })

}  
window.addEventListener("DOMContentLoaded", () => {
    
    axios.get("https://crudcrud.com/api/093faa9a02a74d4ebe526d543b51769e/waitersorder")
    .then((responce)=>{
       console.log(responce)
       for(var i =0;i<responce.data.length;i++){
           showNewUserOnScreen(responce.data[i]);
       }             
    }).catch((error) =>{
       console.log(error)

    })
})   

function showNewUserOnScreen(user){
    document.getElementById('prices').value = '';
    document.getElementById('dish').value ='';
    document.getElementById('table').value = '';

    if(localStorage.getItem(user.dish) !== null){
        removeUserFromScreen(user.dish)
    }
const parentNode =document.getElementById('list-group');
const childHTML = `<li id=${user._id}>${user.price} - ${user.dish} - ${user.table}
<button style="color:blue" onclick=editUser('${user.dish}','${user.price}','${user.table}','${user._id}')>Edit</button>
<button style="color:red"   onclick=deleteUser('${user._id}')>Delete</button>

</li>`;


parentNode.innerHTML =parentNode.innerHTML + childHTML;
}
function editUser(dishes,price,table,userId){
    document.getElementById('prices').value = price;
    document.getElementById('dish').value = dishes;
    document.getElementById('table').value = table;
    
    deleteUser(userId)
}





function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/093faa9a02a74d4ebe526d543b51769e/waitersorder/${userId}`)
    .then((responce)=>{
        removeUserFromScreen(userId)
    }
    ).catch((err)=>{
        console.log(err)
    }
    )

}

function removeUserFromScreen(userId){
    const parentNode = document.getElementById('list-group');
    const childNodeToBeDeleted = document.getElementById(userId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}
