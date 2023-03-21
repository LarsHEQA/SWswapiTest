export default class BaseActions {

    replaceWhiteSpace(string){
        if (/\s/.test(string)) {
            string = string.replace(/\s+/g,"%20");
        } 
        return string;
    }

    removeWhiteSpace(string){
        if (/\s/.test(string)) {
            string = string.replace(/\s+/g,"");
        } 
        return string;
    }
}
