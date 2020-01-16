/*
 * @Description: 
 * @Author: shuqianwen
 * @Date: 2019-09-03 14:18:33
 * @LastEditors: shuqianwen
 * @LastEditTime: 2019-09-03 14:20:12
 */
import resource from 'resource'
import API from 'api'

class LoginService {
    list = (params) => {
        return resource.get(API.login.get, params).then((res) => {
            return res
        })
    }
}

export default new LoginService()
