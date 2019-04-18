
//phoneNo class
class PhoneNo {
    constructor(name,phoneNo){
        this.name=name;
        this.phoneNo=phoneNo;
    }

}

//UI class:Handle UI Tasks
class UI{
    static  displayContacts(){
       
        const contacts=Store.getContacts();
        contacts.forEach((contact)=>UI.addContactToList(contact))


    }

    static changetext(value,ele){
        if(value.length==0){
            if(ele==="name"){
                document.querySelector('#namediv').innerHTML=''
            }
            if(ele==="contactno"){
                document.querySelector('#contactdiv').innerHTML=''
            }
        }else{
            if(ele==="name"){
                document.querySelector('#namediv').innerHTML=`Name: ${value}`
            }
            if(ele==="contactno"){
                document.querySelector('#contactdiv').innerHTML=`Contact No: ${value}`
            }
        }
        

    }

    static addContactToList(contact) {
        const contactList=document.querySelector('#contact-list');
        const row=document.createElement('tr');
        row.className="tablerow";
        row.innerHTML=`
        <td>${contact.name}</td>
        <td>${contact.phoneNo}</td>
        <td> <a href="#" class="btn btn-danger btn-sm delete" >X</a></td>  
        `
        contactList.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#name').value="";
        document.querySelector('#contactno').value="";
        document.querySelector('#namediv').innerHTML="";
        document.querySelector('#contactdiv').innerHTML="";



    }

    static deleteContact(contactDeletelink) {
        if(contactDeletelink.classList.contains('delete')){
            contactDeletelink.parentElement.parentElement.remove();
        }

    }

    static showAlert(message,className){
        const div=document.createElement('div');
        div.className=`alert alert-${className}`
        div.appendChild(document.createTextNode(message));

        const container=document.querySelector('.container');
        const form=document.querySelector('#phonebook-form');

        container.insertBefore(div,form);

        //vanish in 3 seconds
        setTimeout(()=>{
            document.querySelector('.alert').remove()
        },2000)

    }
}

//Event :Display Contacts
document.addEventListener('DOMContentLoaded',UI.displayContacts);


//Event:Add a contact
document.querySelector('#phonebook-form').addEventListener('submit',(e)=>
{
    //prevent actual submit
    e.preventDefault();

    //get Form Values
    const name=document.querySelector('#name').value;
    const phoneNo=document.querySelector('#contactno').value;

    if(name===''||phoneNo===''){
       UI.showAlert("Please Fill In All the Fields",'danger');
    }
    else{
        //creating contact instance
        const contact=new PhoneNo(name,phoneNo);

        //add contact to UI
        UI.addContactToList(contact);

        //add contact to store
        Store.addContact(contact);

        //show success message
        UI.showAlert('Contact Added' ,'success');

        //clear fields
        UI.clearFields();
   }
})

//Event:remove a Contact
document.querySelector('#contact-list').addEventListener('click',(e)=>
{
    //remove contact from UI
    UI.deleteContact(e.target);

    //remove contact from store
    Store.deleteContact(e.target.parentElement.previousElementSibling.textContent);

    //show success message
    UI.showAlert('Contact Deleted' ,'success');

})


//store class

class Store{

    static getContacts(){
        let contacts;
        if(localStorage.getItem('contacts')===null){
            contacts=[]
        }
        else{
            contacts=JSON.parse(localStorage.getItem('contacts'));
        }
        return contacts;
    }

    static  addContact(contact){
        const contacts=Store.getContacts();
        contacts.push(contact);

        localStorage.setItem('contacts',JSON.stringify(contacts))
    }

    static deleteContact(contactNo){
        const contacts=Store.getContacts();

        contacts.forEach((contact,index)=>{
            if(contact.phoneNo===contactNo){
                contacts.splice(index,1);
            }
        });

        localStorage.setItem('contacts',JSON.stringify(contacts));
    }

}

