const cryptoJs = require('crypto-js')
const storage = window.localStorage
const keys = { exp: 'exp' }

class Authentication {
  constructor (ctx) {
    this.store = ctx.store
    this.$axios = ctx.$axios
    this.error = ctx.error
    this.$config = ctx.$config
  }

  setStorage (exp) {
    storage.setItem(keys.exp, this.encrypt(exp))
  }

  removeStorage () {
    for (const key of Object.values(keys)) {
      storage.removeItem(key)
    }
  }

  getExpire () {
    const expire = storage.getItem(keys.exp)
    return expire ? this.decrypt(expire) : null
  }

  isAuthenticated() {
    return new Date().getTime() < this.getExpire()
  }

  login ({ exp, user }) {
    this.setStorage(exp)
    this.store.dispatch('getCurrentUser', user)
  }

  logout () {
    this.$axios.$delete('/api/vi/user_token')
    this.removeStorage()
    this.store.dispatch('getCurrentUser', null)
  }

  encrypt (exp) {
    const expire = String(exp * 1000)
    return cryptoJs.AES.encrypt(expire, this.$config.cryptoKey).toString()
  }

  decrypt (exp) {
    try{
      const bytes = cryptoJs.AES.decrypt(exp, this.$config.cryptoKey)
      return bytes.toString(cryptoJs.enc.Utf8) || this.removeStorage()
    } catch (e) {
      return this.removeStorage()
    }
  }

}

export default ( { store, $axios, error, $config }, inject) => {
  inject('auth', new Authentication({ store, $axios, error, $config }))
}