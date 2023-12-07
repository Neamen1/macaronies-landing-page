function toggleMenu(x) {
    x.classList.toggle("change");
    var overlay = document.getElementById("overlay");
    if (overlay.style.width === "100%") {
        overlay.style.width = "0";
    } else {
        overlay.style.width = "100%";
    }
}


function changePastaButtonText(button) {
    // Get the text content of the clicked link
    var newText = button.textContent;
    var newValue = button.value;
    // Update the text of the dropbtn
    var btn = document.getElementById('pasta_dropbtn');
    btn.textContent = newText;
    btn.value = newValue;
}

function changeSauseButtonText(button) {
    // Get the text content of the clicked link
    var newText = button.textContent;
    var newValue = button.value;
    // Update the text of the dropbtn
    var btn = document.getElementById('sause_dropbtn');
    btn.textContent = newText;
    btn.value = newValue;
}

function changeQuantity(amount) {
    // Get the current quantity value
    var quantityElement = document.getElementById('quantity');
    var currentQuantity = parseInt(quantityElement.innerText);

    // Calculate the new quantity
    var newQuantity = currentQuantity + amount;

    // Ensure the quantity is more than 0
    newQuantity = Math.max(newQuantity, 1);

    // Update the quantity element
    quantityElement.innerText = newQuantity;
}

// Function to reset checkboxes and buttons
function resetForm() {
    // Uncheck all checkboxes with the class 'addings'
    var checkboxes = document.querySelectorAll('.addings');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });

    // Reset the quantity to 1
    document.getElementById('quantity').innerText = '1';

    //Reset dropdown buttons
    var pastaDrpbtn = document.getElementById('pasta_dropbtn');
    pastaDrpbtn.innerText = 'Select Pasta type';
    pastaDrpbtn.value="0";

    var sauseDrpbtn = document.getElementById('sause_dropbtn');
    sauseDrpbtn.innerText = 'Select your sauce';
    sauseDrpbtn.value="0";

    document.getElementById('special_instructions').value = '';
    document.getElementById('made_for').value = '';

    document.getElementById("total").innerText = 'Total: 0$'
}

function addToCart(){
    var pastaType = document.querySelector("#pasta_dropbtn").textContent;
    var sauseType = document.querySelector("#sause_dropbtn").textContent;
    if(pastaType == "Select Pasta type" || sauseType == "Select your sauce"){
        alert("Select pasta and sause!");
    }
    else{
        //save current order

        var addings="";
        var elements = document.getElementsByClassName("addings")
        
        for (var i = 0; i < elements.length; i++) {
            if(elements[i].checked) {
                var label = document.querySelector('label[for="' + elements[i].id + '"]');
                label = label ? label.textContent : null
                addings += label;
            }
        }

        var quantity = parseInt(document.getElementById('quantity').innerText);

        var spec_instr = document.getElementById('special_instructions').value;
        var made_for = document.getElementById('made_for').value;

        var total = document.getElementById("total").innerText
        console.log("Order added: ", total, quantity, pastaType, sauseType, addings, spec_instr, made_for)

        //clear form
        resetForm();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    
    var elements = document.getElementsByClassName("addings")
    
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', calculateTotal, false);
    }

    var buttons = document.querySelectorAll('.dropdown-content button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', calculateTotal, false);
    }

    var buttons2 = document.querySelectorAll('.change-quantity');
    for (var i = 0; i < buttons2.length; i++) {
        buttons2[i].addEventListener('click', calculateTotal, false);
    }

    // Function to calculate the total based on selected checkboxes
    function calculateTotal() {
        // Base price
        let total = 0;

        // Get all checkboxes with class "addings"
        const checkboxes = document.querySelectorAll(".addings:checked");

        // Iterate over selected checkboxes and update the total
        checkboxes.forEach(function(checkbox) {
            total += parseFloat(checkbox.value.split(" ")[0]); // Extract the price from the checkbox value
        });

        total += parseFloat(document.querySelector("#pasta_dropbtn").value)
        total += parseFloat(document.querySelector("#sause_dropbtn").value)

        total *= parseInt(document.getElementById('quantity').innerText);
    
        // Update the total money text
        document.getElementById("total").innerText = "Total: " + total.toFixed(2) + "$";
    }




});