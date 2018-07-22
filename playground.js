
require('dotenv').config();
const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const { BusinessNetworkDefinition, CertificateUtil, IdCard } = require('composer-common');

const admin = process.env.ADMIN;
//declate namespace
const namespace = process.env.NAMESPACE
const businessNetworkName = process.env.BUSINESS_NETWORK_NAME;
//in-memory card store for testing so cards are not persisted to the file system
const cardStore = require('composer-common').NetworkCardStoreManager.getCardStore( { type: 'composer-wallet-inmemory' } );

//admin connection to the blockchain, used to deploy the business network
let adminConnection;

//this is the business network connection the tests will use.
let businessNetworkConnection;


let factory;

/*
* 비즈니스 네트워크 카드를 반입한다.
* @param {String} cardName ㅂㅣ즈니스 네트워크 카드네임
* @param {String} identity
*/
async function importCardForIdentity(cardName, identity) {

  //use admin connection
  adminConnection = new AdminConnection();
  //declare metadata
  const metadata = {
      userName: identity.userID,
      version: 1,
      enrollmentSecret: identity.userSecret,
      businessNetwork: businessNetworkName
  };

  //get connectionProfile from json, create Idcard
  const connectionProfile = require('./local_connection.json');
  const card = new IdCard(metadata, connectionProfile);

  //import card
  await adminConnection.importCard(cardName, card);
}

/*
* 파트너를 등록한다.
* @param {String} cardId  비즈니스 네트워크 카드네임
* @param {String} partnerId 파트너 Id
* @param {String} name 파트너 네임
*/
async function registerPartner(cardId, partnerId, name) {
  try {

    //connect as admin
    businessNetworkConnection = new BusinessNetworkConnection();
    await businessNetworkConnection.connect(ADMIN);

    //get the factory for the business network.
    factory = businessNetworkConnection.getBusinessNetwork().getFactory();

    //create partner participant
    const partner = factory.newResource(namespace, 'Partner', partnerId);
    partner.name = name;

    //add partner participant
    const participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace + '.Partner');
    await participantRegistry.add(partner);

    //issue identity
    const identity = await businessNetworkConnection.issueIdentity(namespace + '.Partner#' + partnerId, cardId);

    //import card for identity
    await importCardForIdentity(cardId, identity);

    //disconnect
    await businessNetworkConnection.disconnect(ADMIN);

    return true;
  }
  catch(err) {
    //print and return error
    console.log(err);
    var error = {};
    error.error = err.message;
    return error;
  }
}

/*
 *
 *
 */
 async function

const cardName = process.argv[2];
const partnerId = process.argv[3];
const partnerName = process.argv[4];

console.log(`cardName:${cardName}, partnerId:${partnerId}, partnerName:${partnerName}`)
//registerPartner(cardName, partnerId, partnerName);
