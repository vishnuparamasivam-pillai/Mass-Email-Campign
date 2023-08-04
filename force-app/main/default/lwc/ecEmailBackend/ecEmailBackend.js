//Importing required library, schema structure, JS functions.
import { LightningElement, api, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import EMAIL_OBJECT from '@salesforce/schema/EC_Email__c';
import TO_FIELD from '@salesforce/schema/EC_Email__c.TO__c';
//import CC_FIELD from '@salesforce/schema/EC_Email__c.AnnualRevenue';
import SUBJECT_FIELD from '@salesforce/schema/EC_Email__c.Subject__c';
import BODY_FIELD from '@salesforce/schema/EC_Email__c.Body__c';
import { validate,errorfld } from './ecdataValidater'; // Validate To, Subject, Body field 

export default class EC_Email_Backend extends LightningElement {
    //Declare variable on (api eidata) to get current data from Parent component. 
    @api EC_Email__c;
    @api eidata;
    @track emailId;
    @track isval;

    
    handleSend(event) {
            //Check if the required field data are present!
            if(validate(this.eidata)){
                //Mapping User Data to Schema Structure.
                const fields = {};
                fields[TO_FIELD.fieldApiName] = this.eidata.to;
                fields[SUBJECT_FIELD.fieldApiName] = this.eidata.subject;
                fields[BODY_FIELD.fieldApiName] = this.eidata.body;
                const recordInput = { apiName: EMAIL_OBJECT.objectApiName , fields };
                createRecord(recordInput)
                    .then(emailrec => {
                        this.emailId = emailrec.id;
                        //Triggers an Success event to parent component.
                        const successEvent = new CustomEvent("inssuccess", {
                            detail: this.emailId
                          });
                          this.dispatchEvent(successEvent);
                    })
                    .catch(error => {
                        //Triggers an Error event to parent component.
                        const errorEvent = new CustomEvent("inserror", {
                            detail: error
                          });
                          this.dispatchEvent(errorEvent);
                    });
            }
            else{
                //Triggers an Warning event to parent component.
                const allerrorEvent = new CustomEvent("inwarning", {
                    detail: errorfld(this.eidata)
                });
                this.dispatchEvent(allerrorEvent);
            }
    }


}