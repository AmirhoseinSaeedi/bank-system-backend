

function toggleEdit(customerId) {
  console.log("i am here in toggle edit");
  const firstnameInput = document.getElementById("name-input");
  const lastnameInput = document.getElementById("last-name-input");
  const accountInput = document.getElementById("account-number-input");
  const editButton = document.getElementById("edit-customer-btn");

  console.log(firstnameInput.disabled);

  if (firstnameInput && lastnameInput && accountInput && accountInput) {
    // Toggle the 'disabled' attribute on inputs
    firstnameInput.disabled = !firstnameInput.disabled;
    lastnameInput.disabled = !lastnameInput.disabled;
    accountInput.disabled = !accountInput.disabled;

    // Change the button text based on the editing state
    if (firstnameInput.disabled) {
      editButton.innerText = "Edit";
    } else {
      editButton.innerText = "Done";
    }
  }
}


editTransactionStatus = (trId) =>{

  console.log(trId);
  const statusInput = document.getElementById('transaction-status');
  editTrnsactinDetails(trId,statusInput.value)
}

editTrnsactinDetails = (trId, trStatus) => {

  console.log(trId);
  console.log(trStatus);

  const requestBody = {
    id: trId,
    status: trStatus
  };
  
  // Make a POST request
  fetch('http://localhost:3000/transaction/withdrawal/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
      // Add any other headers if needed
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Handle the response if needed
      return response.json();
    })
    .then(data => {
      // Handle the data if needed
      console.log(data);
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });

}

editTransferStatus = (trId) => {

  const statusInput = document.getElementById('transfer-status');
  editTrnsferDetails(trId,statusInput.value)

};

function deleteCustomer(id) {
  fetch(`/user/delete/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        // Handle success, e.g., show a success message
        location.reload(); // Refresh the page
        fetch("/user/getAll") // Call the /user/getAll API
          .then((response) => response.json())
          .then((data) => {
            console.log(data); // Handle the response data from /user/getAll API
            // Update the page with the new data, if needed
          })
          .catch((error) => {
            // Handle error, e.g., show an error message
          });
      } else {
        // Handle error, e.g., show an error message
      }
    })
    .catch((error) => {
      // Handle error, e.g., show an error message
    });
}

editTrnsferDetails = (trId, trStatus) => {

  console.log(trId);
  console.log(trStatus);

  const requestBody = {
    id: trId,
    status: trStatus
  };
  
  // Make a POST request
  fetch('http://localhost:3000/transaction/transfer/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
      // Add any other headers if needed
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Handle the response if needed
      return response.json();
    })
    .then(data => {
      // Handle the data if needed
      console.log(data);
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });

}

