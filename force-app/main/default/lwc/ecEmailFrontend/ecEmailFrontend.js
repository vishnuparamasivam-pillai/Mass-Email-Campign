//Importing required library, schema structure, JS functions.
import { LightningElement,api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import IMAGES from "@salesforce/resourceUrl/ec_Static_Dump";


export default class SendEmailUI extends LightningElement {
    //Declare required variables on track,api.
    @track issettingopen = false;
    @track issend = false;
    @track to;
    @track cc;
    @track subject;
    @track body;
    @api emaildata;
    logo = IMAGES +'/ec_Static_Dump/images/logo.png';
    setting = IMAGES +'/ec_Static_Dump/images/setting_logo.png';
    handleSuccess(event) {
        //Displays Success Message to user on Lightning UI.
        const evt = new ShowToastEvent({
            title: 'Email Send Succesfully',
            message: 'Emails Send to respected Recipient :)',
            variant: 'success',
        });
        this.dispatchEvent(evt);
        this.issend = true;
    }
    handleError(event) {
        //Displays Error Message to user on Lightning UI.
        const evt = new ShowToastEvent({
            title: 'Email Not Send Succesfully',
            message: 'Emails Not Send to respected Recipient :(',
            variant: 'error',
        });
        this.dispatchEvent(evt);
    }
    handleWarning(event) {
        //Displays Warning Message to user on Lightning UI.
        const evt = new ShowToastEvent({
            title: event.detail + ' field Values are blank!',
            message: '  Kindly fill all the necessary values',
            variant: 'warning',
        });
        this.dispatchEvent(evt);
    }
    handleAgain(event){
        //This function handles Send Again button event and clear inputs.
        this.issend = false;
        this.clearallinputs();
    }
    handleTochange(event){
        //Tracks and updates To field change.
        this.to = event.detail.value;
        this.emaildata = {to:this.to,subject:this.subject,body:this.body};
    }
    handleCCchange(event){
        //Tracks and updates CC field change.
        this.cc = event.detail.value;
        this.emaildata = {to:this.to,subject:this.subject,body:this.body};
    }
    handleSubjectchange(event){
        //Tracks and updates Subject field change.
        this.subject = event.detail.value;
        this.emaildata = {to:this.to,subject:this.subject,body:this.body};
    }
    handleBodychange(event){
        //Tracks and updates Body field change.
        this.body = event.detail.value;
        this.emaildata = {to:this.to,subject:this.subject,body:this.body};
    }
    clearallinputs(){
        //Clears To, CC, Subject, Body variable to null.
        this.to = '';
        this.cc  = '';
        this.body = '';
        this.subject = '';
        this.emaildata = {to:this.to,subject:this.subject,body:this.body};
    }
    handlesetting(event){
        //Handles the setting UI open/Close.
        this.issettingopen = true;
    }
    handlemodelclose(event){
        //Handles the setting UI open/Close.
        this.issettingopen = false;
    }
    handlemodelsave(event){
        if(event.detail){
            this.issend = false;
        }
        else{
            this.issend = true;
        }
        this.issettingopen = false;
    }
}