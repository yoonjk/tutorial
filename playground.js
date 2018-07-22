
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
 * Create Member participant and import card for identity
 * @param cardId mebmer를 위한 카드 id를 반입(등록)
 * @param {String} accountNumber
 */
 async function regisgterMember(cardId, accountNumber,firstName, lastName, email, phoneNumber) {
   try {
     businessNetworkConnection = new BusinessNetworkConnection();
     //connect as admin
     businessNetworkConnection.connect(ADMIN);

     //get the factory for the business network.
     factory = businessNetworkConnection.getBusinessNetwork().getFactory();

     const member = factory.newResource(namespace, 'Member', accountNumber);

     member.firstName = firstName;
     member.lastName = lastName;
     member.email = email;
     member.phoneNumber = phoneNumber;

     const participantRegistory = await businessNetworkConnection.getParticipantRegistry(namespace +'.Member');
     participantRegistory.add(member);

     // issue identity
     const identity = businessNetworkConnection.issueIdentity(namespace + '.Member#' + accountNumber, cardId);
     //import card for identity
     importCardForIdentity(cardId, identity);
     //disconnect
     businessNetworkConnection.disconnect(ADMIN);

     return true;
   } catch (err) {
     console.log(err);
     const error = {}
     error.error = err.message;

     return error;
   }
 }

/*
 * 다른 비즈니스 네트워크 카드를 사용하여 재연결
 * @param {String} cardName 주어진 카드네임으로 비즈니스 네트워크 연결을 재사용
 */
 async function useIdentity(cardName) {
   //disconnect existing connection
   await businessNetworkConnection.disconnect();

   //connect to network using cardName
   businessNetworkConnection = new BusinessNetworkConnect();
   await businessNetworkConnection.connect(cardName);
 }



 /*
 * 포인트 획득 트랜잭션을 수행
 * @param {String} cardId 비즈니스 네트워크 카드 Id
 * @param {String} accountNumber member Id
 */
 async function earnPointsTransaction(cardId, accountNumber, partnerId, points) {
   try {
     //connect to network with cardId
     businessNetworkConnection = new BusinessNetworkConnect();
     businessNetworkCOnnection.connect(cardId);

     //get the factory for the business network.
     factory = businessNetworkConnection.getBusinessNetwork().getFactory();

     //create transaction
     const earnPoints = factory.newTransaction(namespace, 'EarnPoints');
     earnPoints.points = points;
     earnPoints.member = factory.newRelationship(namespace, 'Member', accountNumber);
     earnPoints.partner = factory.newRelationship(namespace, 'Partner', partnerId);

     //submit transaction
     await businessNetworkConnection.submitTransaction(earnPoints);
     //disconnect
     await businessNetworkConnection.disconnect(cardId);

     return true;
   } catch(err) {
     console.log(err);

     const error = {};
     error.error = err.message;

     return error;
   }
 }

 async function usePointsTransaction(cardId, accountNumber, partnerId, points) {
   try {
     businessNetworkConnection = new BusinessNetworkConnection();
     // connect to network with cardId
     businessNetworkConnection.connect(cardId);

     //get the factory for the business network.
     factory = businessNetworkConnection.getBusinessNetwork().getFactory();

     //create transaction
     const usePoints = factory.newTransaction(namespace, 'UsePoints');
     usePoints.points = points;
     usePoints.member = factory.newRelationship(namespace, 'Member', accountNumber);
     usePoints.partner = factory.newRelationship(namespace, 'Partner', partnerId);

     //submit transaction
     await businessNetworkConnection.submitTransaction(usePoints);

     await businessNetworkConnection.disconnect(cardId);

     return true;
   } catch(err) {
     console.log(err);

     const error = {};
     error.error = err.message;

     return error;
   }
 }

const cardName = process.argv[2];
const partnerId = process.argv[3];
const partnerName = process.argv[4];

console.log(`cardName:${cardName}, partnerId:${partnerId}, partnerName:${partnerName}`)
//registerPartner(cardName, partnerId, partnerName);
