export default () => {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(String.prototype, 'limpa', {
    value: function () {
      return this.trim().toUpperCase().replace(/ /g, '')
    }
  })
}
