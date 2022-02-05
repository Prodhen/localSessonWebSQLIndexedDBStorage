//Open or Create The Database
var db=openDatabase('webSQLArosh','1.0','webSQLArosh Database',2*1024*1024);

db.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS webSQLArosh(id INTEGER PRIMARY KEY AUTOINCREMENT,firstName,lastName,NIDNumber,email,gender,phoneNumber)')

});
function addContact(){

        var inputFirstName=document.getElementById('firstName').value;
        var inputLastName=document.getElementById('lastName').value;
        var inputNIDNumber=document.getElementById('NIDNumber').value;
        var inputEmail=document.getElementById('email').value;
        var inputPhoneNumber=document.getElementById('phoneNumber').value;
        var igender = document.querySelector('input[type=radio][name=gender]:checked').value;
        

        

        if(inputFirstName!==''&& inputLastName!==''&& inputPhoneNumber!==''&&inputNIDNumber!==''&&inputEmail!==''&&igender!==''){
                db.transaction(function (tx) {
                        tx.executeSql('INSERT INTO webSQLArosh(firstName,lastName,NIDNumber,email,gender,phoneNumber) VALUES (?,?,?,?,?,?)',[inputFirstName, inputLastName,inputNIDNumber,inputEmail,igender, inputPhoneNumber], function (tx, results) {

                        var contactRow = document.createElement("tr");
                        var id = document.createElement("td");
                        var firstName = document.createElement("td");
                        var lastName = document.createElement("td");
                        var NIDNumber = document.createElement("td");
                        var email = document.createElement("td");
                        var gender = document.createElement("td");
                        var phoneNumber = document.createElement("td");

                        var removeButton = document.createElement("td");

                        id.textContent = results.insertId;
                        firstName.textContent = inputFirstName;
                        lastName.textContent = inputLastName;
                        NIDNumber.textContent=inputNIDNumber;
                        email.textContent=inputEmail;
                        gender.texContent=igender;
                        phoneNumber.textContent = inputPhoneNumber;
                        removeButton.innerHTML = '<button onclick="removeContact(' + results.insertId + ')">Delete</button>';
                        contactRow.setAttribute("id", "c" + results.insertId);
                        contactRow.appendChild(id);
                        contactRow.appendChild(firstName);
                        contactRow.appendChild(lastName);
                        contactRow.appendChild(NIDNumber);
                        contactRow.appendChild(email);
                        contactRow.appendChild(gender);
                        contactRow.appendChild(phoneNumber);

                        contactRow.appendChild(removeButton);

                        document.getElementById("contacts").appendChild(contactRow);
                });
        });

        }
        else{
                alert("You have to Provide The First Name,Last Name and Phone number");
        }
}


function removeContact(id) {
        db.transaction(function (tx) {
                tx.executeSql('DELETE FROM webSQLArosh WHERE id=?', [id], function () {

                        var contactTable = document.getElementById("contacts");
                        var contactToDelete = document.getElementById("c" + id);
                        contactTable.removeChild(contactToDelete);
                });
        });
}
function stay() {
        db.transaction(tx => {
          tx.executeSql("Select * From webSQLArosh", [], (tx, results) => {
                var len = results.rows.length;
                                        var i;
                                        for (i = 0; i < len; i++) {
                                          
                                                 var contactRow = document.createElement("tr");
                                                 var id = document.createElement("td");
                                                 var firstName = document.createElement("td");
                                                 var lastName = document.createElement("td");
                                                 var NIDNumber = document.createElement("td");
                                                 var email = document.createElement("td");
                                                 var gender = document.createElement("td");
                                                 var phoneNumber = document.createElement("td");
                                                 var removeButton = document.createElement("td");
        
                                                id.textContent = results.rows.item(i).id;
                                                firstName.textContent = results.rows.item(i).firstName;
                                                lastName.textContent = results.rows.item(i).lastName;
                                                NIDNumber.textContent=results.rows.item(i).NIDNumber;
                                                email.textContent=results.rows.item(i).email;
                                                gender.textContent=results.rows.item(i).gender;
                                                phoneNumber.textContent = results.rows.item(i).phoneNumber;
                                                removeButton.innerHTML = '<button onclick="removeContact(' + results.rows.item(i).id +')">Delete</button>';
                                                contactRow.setAttribute("id", "c" + results.rows.item(i).id);
                                                contactRow.appendChild(id);
                                                contactRow.appendChild(firstName);
                                                contactRow.appendChild(lastName);
                                                contactRow.appendChild(NIDNumber);
                                                contactRow.appendChild(email);
                                                contactRow.appendChild(gender);
                                                contactRow.appendChild(phoneNumber);
                                                contactRow.appendChild(removeButton);
                                                document.getElementById("contacts").appendChild(contactRow);
                                        }
                               });
        });
};

window.addEventListener("load", stay, true);