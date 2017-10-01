const FtpDeploy = require('ftp-deploy')
const ftpDeploy = new FtpDeploy()
const path = require('path')
const config = {
  username: 'deploy',
  password: 'bongsolabs',
  host: 'bglee.me',
  port: 21,
  localRoot: path.join(__dirname, 'out'),
  remoteRoot: '/bongso/ops'
}

ftpDeploy.deploy(config, function(err) {
  if (err) {
    return console.log(err)
  }
  console.log('deployed');
});