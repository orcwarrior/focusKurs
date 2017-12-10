
class apiCredentials {
  constructor() {
    this.login = process.env['FOCUS_LOGIN'];
    this.password = process.env['FOCUS_PWD'];
    this.servicePhoneNumber = process.env['FOCUS_PHONE'];
    this.url = process.env['FOCUS_URL'] || 'https://uni-call.fcc-online.pl';

    if (isAnyCredentialEmpty(this)) {
      throw new Error(
        `Focus API Credentials should be filled!
         Setup atleast FOCUS_LOGIN and FOCUS_PWD enviroment variables!
         (FOCUS_URL is optional).`)
    }
  }

}
/* private */
function isAnyCredentialEmpty(credentialsObj) {
  return !credentialsObj.login || !credentialsObj.password || !credentialsObj.url;
}

/* export shared instance */
export default new apiCredentials();
