import { LightningElement, track, wire } from 'lwc';
import  { setCookies, serializeData, getCookies, createCookies }  from './ecCookieHandler';
import getallPicklist from '@salesforce/apex/EC_Dynamic_UI.getallPicklist';
import { getvalues,optionmaker } from './ecSettingHandler';

export default class EcEmailSetting extends LightningElement {
    @track allvalues;
    @track objOptions;
    @track selcobj;
    @track selfld;
    @track selval;
    @track fdlOptions;
    @track valOptions;
    @track istoggleon = true;
    @track comparitorOptions = [{'label':'Equal', 'value': '='},{'label':'Not Equal', 'value' : '!='}];

    handleobjChange(event){
        this.fdlOptions = optionmaker(Array.from(this.allvalues.get(event.detail.value).keys()));
        this.selcobj = event.detail.value;
    }
    handlefldChange(event){
        this.valOptions = optionmaker(Array.from(this.allvalues.get(this.selcobj).get(event.detail.value).keys()));
        console.log(this.allvalues.get(this.selcobj).get(event.detail.value).keys());
        this.selfld = event.detail.value;
    }
    hideModalBoxClose(event){
        const closeEvent = new CustomEvent("modclose", {
            detail: event.detail.value
          });
          this.dispatchEvent(closeEvent);
    }
    hideModalBoxSave(event){
        const saveEvent = new CustomEvent("modsave", {
            detail : this.istoggleon
          });
          this.dispatchEvent(saveEvent);
          
    }
    handlefiltertoggle(event){
        if(this.istoggleon == false){
            this.istoggleon = true;
        }
        else{
            this.istoggleon = false;
        }
    }
    @wire(getallPicklist)
    getallPicklist({ error, data }) {
        if (data) {
            this.allvalues = getvalues(data);
            this.objOptions = optionmaker(Array.from(this.allvalues.keys()));

        } else if (this.error) {
            this.error = error;
            window.alert(JSON.stringify(error));
            this.objOptions = [{'label':'Not Specified', 'value': 'Not Specified'}];
        }
    }
}