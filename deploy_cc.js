logger.debug('[fcw] Installing Chaincode');
var client = obj.client;

// fix GOPATH - does not need to be real!
process.env.GOPATH = path.join(__dirname, '../../../chaincode');

// send proposal to endorser
var request = {
  targets: [client.newPeer(options.peer_urls[0], options.peer_tls_opts)],
  chaincodePath: options.path_2_chaincode,					//path to chaincode from <marbles root>/chaincode/src/
  chaincodeId: options.chaincode_id,
  chaincodeVersion: options.chaincode_version,
};
logger.debug('[fcw] Sending install req', request);

client.installChaincode(request).then(function (results) {

  // --- Check Install Response --- //
  common.check_proposal_res(results, options.endorsed_hook);
  if (cb) return cb(null, results);

}).catch(function (err) {

  // --- Errors --- //
  logger.error('[fcw] Error in install catch block', typeof err, err);
  var formatted = common.format_error_msg(err);
  if (cb) return cb(formatted, null);
  else return;
});
