import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useLoginStore = defineStore('loginStore', {
    state () {
      return {
        userInfo: null,
        userRole: null,
        isLogin: false,
        returnUrl: null
      }
    },
    actions:{
        login (username, password) {
            console.log(username)
            axios.post('http://localhost:8082' + '/auth/login', {username, password})
            .then(res => {
                console.log(res)
                let token = res.data.token
                let userId = res.data.id
                localStorage.setItem("access_token", token)
                localStorage.setItem("access_id", userId)
                this.getUserInfo()
                router.push({ name: 'Homepage' })
            })
        },
        logout() {
          localStorage.clear()
          this.isLogin = false
          router.push({ name: 'Homepage' })
        },
        getUserInfo() {
          let token = localStorage.getItem("access_token")
          let userId = localStorage.getItem("access_id")
          let config = { 
            headers: {
              "Authorization": "Bearer " + token
            }
          }
          if(token !== null) {
            axios.get('http://localhost:8082' + '/api/users/' + userId, config)
            .then(res => {
              console.log(res)
              this.userInfo = res.data.username
              this.userRole = res.data.role
              this.isLogin = true
              router.push(this.returnUrl || '/')
            })
          }
        },
    }
});