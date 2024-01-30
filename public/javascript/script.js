back = require('../../controllers/userController')
function toggleEdit(customerId) {
    console.log("i am here in toggle edit")
    const firstnameInput = document.getElementById('name-input');
    const lastnameInput = document.getElementById('last-name-input');
    const accountInput = document.getElementById('account-number-input');
    const editButton = document.getElementById("edit-customer-btn");

    console.log(firstnameInput.disabled)

    if (firstnameInput && lastnameInput && accountInput && accountInput) {
        // Toggle the 'disabled' attribute on inputs
        firstnameInput.disabled = !firstnameInput.disabled;
        lastnameInput.disabled = !lastnameInput.disabled;
        accountInput.disabled = !accountInput.disabled;

        // Change the button text based on the editing state
        if (firstnameInput.disabled) {
            editButton.innerText = 'Edit';
        } else {
            editButton.innerText = 'Done';
        }
    }
}

editStatus = () =>{
    console.log("here in transaction details page")
}
