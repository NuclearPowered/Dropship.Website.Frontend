const consts = {
  WEBAPI_URL: 'https://api.reactor.gg',
  DROPSHIP_DL_URL: 'https://github.com/NuclearPowered/Dropship/releases/latest'
}

if (window.location.hostname === 'localhost') {
  // Assume we are in dev environment
  // consts.WEBAPI_URL = 'http://localhost:5000'
}

Object.freeze(consts)
export default consts
