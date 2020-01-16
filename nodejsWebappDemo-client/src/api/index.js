/*
 * @Description: 
 * @Author: shuqianwen
 * @Date: 2019-08-30 17:23:08
 * @LastEditors  : shuqianwen
 * @LastEditTime : 2020-01-15 15:51:56
 */
import { mergeApi } from 'utils'

const HOST = '';

const CLOUDMONITORUSER = '';

//登陆
const login = mergeApi({
    signin: '/signin'
}, CLOUDMONITORUSER);

const API = mergeApi({
    login
}, HOST);

export default API;