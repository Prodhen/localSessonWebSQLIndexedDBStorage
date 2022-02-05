///<reference path="../jquery-1.8.3.min.js"/>
$(document).ready(function(){
        contactsNamespace.initialize();
});
(function(){
        this.contactsNamespace=this.contactsNamespace||{};
        var ns=this.contactsNamespace;
        var currentRecord;
        ns.initialize=function(){
                $('#btnSave').on('click',ns.save);
                ns.display();
                
        };
        function retrieveFromStorage(){
                var contactsJSON=sessionStorage.getItem('Arosh_session');
                return contactsJSON?JSON.parse(contactsJSON):[];
        };

        ns.display=function(){
                $('#currentAction').html('Input Your Information');
                currentRecord={key:null,contact:{}};
                displayCurrentRecord();
                var results=retrieveFromStorage();
                bindToGrid(results)
        };
        function bindToGrid(results){
                var html='';
                for(var i=0; i< results.length; i++){
                        var cotact=results[i];
                        html+='<tr><td>'+cotact.firstName+' '+cotact.lastName+"</td>";
                        html+='<td>'+cotact.NIDNumber+"</td>";
                        html+='<td>'+cotact.gender+"</td>";
                        html+='<td>'+cotact.email+"</td>";
                        html+='<td>'+cotact.phoneNumber+"</td>";
                        html+='<td><a class="edit" href="javascript:void(0)" data-key='+i+ '>Edit</a></td></tr>';
                  
        
                }
                html=html||'<tr><td colspan="3">No records available</td></tr>';
                $('#contacts tbody').html(html);
                $('#contacts a.edit').on('click',ns.loadContact)
        };
        ns.loadContact=function(){
                var key=parseInt($(this).attr('data-key'));
                var results=retrieveFromStorage();
                $('#currentAction').html('Edit your Information');
                currentRecord={key:key,contact:results[key]}
                displayCurrentRecord();
        };
        function displayCurrentRecord(){
                var contact=currentRecord.contact;
                $('#firstName').val(contact.firstName);
                $('#lastName').val(contact.lastName);
                $('#NIDNumber').val(contact.NIDNumber);
                $("input[type=radio][name=gender]:checked").val(contact.gender);
                $('#email').val(contact.email);
                $('#phoneNumber').val(contact.phoneNumber);
        };
        ns.save=function(){
                var contact=currentRecord.contact;

                contact.firstName=$('#firstName').val();
                contact.lastName=$('#lastName').val();
                contact.NIDNumber=$('#NIDNumber').val();
                contact.gender=$("input[type=radio][name=gender]:checked").val();

                contact.email=$('#email').val();
                contact.phoneNumber=$('#phoneNumber').val();
              
        
                var results=retrieveFromStorage();
                if(currentRecord.key!=null){
                        results[currentRecord.key]=contact;
        
                }
                else{
                        results.push(contact);
        
                };
                sessionStorage.setItem('Arosh_session',JSON.stringify(results))
                ns.display();
        
        }
        
})();
