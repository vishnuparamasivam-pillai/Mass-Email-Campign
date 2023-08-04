function getCookies(ckName){
    var cookieString = "; " + document.cookie;
    var parts = cookieString.split("; " + this.ckName + "=");
    var tr = decodeURIComponent(parts.pop().split(";").shift());
    if(tr != ''){
        this.ckVal = JSON.parse(tr);
    } else{
        this.ckVal = [];
    }
    return this.ckVal;
}
function setCookies(ecsdata, ckName){
    window.alert('This is Save handler');
}
function createCookies(ecsdata, ckName, days){
    var expires;
 
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
 
        document.cookie = ckName + "=" + escape(ecsdata) + expires + "; path=/";

}
function serializeData(istoggleon, selObj, selfld, selcmp, selval){
    var value = JSON.stringify([{istoggleon :istoggleon, selObj:selObj, selfld:selfld, selcmp:selcmp, selval:selval}]);
    return this.value;

}
function desrealizeData(ecsdata){

}

export { getCookies,  setCookies, createCookies, serializeData, desrealizeData};