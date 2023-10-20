import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import {setInner,getValue} from "https://jscroot.github.io/element/croot.js";
import {setCookieWithExpireHour} from "https://jscroot.github.io/cookie/croot.js";

export default function PostSignUp(){
    let target_url = "https://asia-southeast2-rock-prism-401900.cloudfunctions.net/chapter4post";
    let tokenkey = "token";
    let datainjson = {
        "idmarker": getValue("name"),
        "volume": getValue("volume")
    }

    postWithToken(target_url,tokenkey,datainjson,responseData);

}



function responseData(result){
    setInner("pesan",result.message);
    setCookieWithExpireHour("token",result.token,2);
}