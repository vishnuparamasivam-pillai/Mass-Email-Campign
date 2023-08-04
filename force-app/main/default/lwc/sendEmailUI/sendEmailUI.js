import { LightningElement,api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class SendEmailUI extends LightningElement {
    @track to;
    @track cc;
    @track subject;
    @track body;
    objOptions = [{'label':'User', 'value': 'User'},{'label':'Account', 'value' : 'Account'}];
    @track fdlOptions;
    userfOptions = [{'label':'Role', 'value': 'Role'},{'label':'Department', 'value' : 'Department'}];
    accountfOptions = [{'label':'Country', 'value': 'Country'},{'label':'City', 'value' : 'City'}];
    @track emaildata;
    @track issend = false;
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: 'Email Send Succesfully',
            message: 'Emails Send to respected Recipient :)',
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
    handleError(event) {
        const evt = new ShowToastEvent({
            title: 'Email Not Send Succesfully',
            message: 'Emails Not Send to respected Recipient :(',
            variant: 'error',
        });
        this.dispatchEvent(evt);
    }
    handleWarning(field) {
        const evt = new ShowToastEvent({
            title: field+' field Values is not filled!',
            message: '  Kindly fill all the necessary values',
            variant: 'warning',
        });
        this.dispatchEvent(evt);
    }
    handleSubmit(event){
        this.emaildata = {to:this.to,subject:this.subject,body:this.body};
        if(this.to == null || this.body == null || this.subject == null){
            this.handleWarning('Summa');
        }
        else{
            this.issend = true;
        }
    }
    handleAgain(event){
        this.issend = false;
        this.clearallinputs();
    }
    handleTochange(event){
        this.to = event.detail.value;
    }
    handleCCchange(event){
        this.cc = event.detail.value;
    }
    handleSubjectchange(event){
        this.subject = event.detail.value;
    }
    handleBodychange(event){
        this.body = event.detail.value;
    }
    clearallinputs(){
        this.to = '';
        this.cc  = '';
        this.body = '';
        this.subject = '';
    }
    handleobjChange(event){
        if(event.detail.value === 'User'){
            this.fdlOptions = this.userfOptions;
        }
        else{
            this.fdlOptions = this.accountfOptions;
        }
    }
}