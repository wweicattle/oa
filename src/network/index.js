import vue from "vue"
import request from "./../plugins/axios"
export function login(url, data) {
    console.log(333);
    return request(url, data)
}

