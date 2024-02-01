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

editStatus = () => {
  let status = document.getElementById("transaction-status");
  status.contentEditable = status.contentEditable === "true" ? "false" : "true";

  document.addEventListener("click", function (event) {
    // Check if the clicked element is the status element or one of its ancestors
    if (!status.contains(event.target)) {
      // Clicked outside the status element, set contentEditable to false
      status.contentEditable = "false";
    }
  });

  status.focus();
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
