/*
 * @Description: 
 * @Author: shuqianwen
 * @Date: 2019-09-03 14:18:33
 * @LastEditors  : shuqianwen
 * @LastEditTime : 2020-01-15 15:52:06
 */
import resource from 'resource'
import API from 'api'

class LoginService {
    signin = (params) => {
        return resource.post(API.login.signin, params).then((res) => {
            return res
        })
    }
}

export default new LoginService()
