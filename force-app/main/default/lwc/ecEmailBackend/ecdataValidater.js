//Validation JS function which check if any of the required field is blank, null, undefined.
function validate(data){
    var isval;
    if(this.data == undefined ){
        this.isval = false;
    }
    else{
        if(this.data.to == undefined){
            this.isval = false;
        }
        else if(this.data.subject == undefined){
            this.isval = false;
        }
        else if(this.data.body == undefined){
            this.isval = false;
        }
        else{
            this.isval = true;
        }
    }
    return this.isval;
}
//errorfld JS function which gives the field name to display in Warning message.
function errorfld(data){
    var fld;
    if(this.data == undefined ){
        this.fld = 'To, Subject, Body';
    }
    else{
        if(this.data.to == undefined){
            this.fld = 'To ';
        }
        else if(this.data.subject == undefined){
            this.fld = this.fld + ' Subject';
        }
        else if(this.data.body == undefined){
            this.fld = this.fld + ' Body';
        }
        else{
            this.fld = 'Unexpected ';
        }
    }
    return this.fld;
}
//Exporting the Validate and errorfld to ecEmailBackend component.
export { validate,errorfld };