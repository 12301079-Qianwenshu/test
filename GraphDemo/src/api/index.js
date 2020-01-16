/*
 * @Description: 
 * @Author: shuqianwen
 * @Date: 2019-08-30 17:23:08
 * @LastEditors: shuqianwen
 * @LastEditTime: 2019-11-15 15:25:06
 */
import { mergeApi } from 'utils'

const HOST = '';

const CLOUDMONITORUSER = '';

//登陆
const login = mergeApi({
    get: ''
}, CLOUDMONITORUSER);

const API = mergeApi({
    login
}, HOST);

export default API;