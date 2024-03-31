// GENERATED CODE -- DO NOT EDIT!

'use strict';
const grpc = require('@grpc/grpc-js');
var rental_pb = require('./rental_pb.js');

function serialize_org_acme_RentalGetAllRequest(arg) {
  if (!(arg instanceof rental_pb.RentalGetAllRequest)) {
    throw new Error('Expected argument of type org.acme.RentalGetAllRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_org_acme_RentalGetAllRequest(buffer_arg) {
  return rental_pb.RentalGetAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_org_acme_RentalGetRequest(arg) {
  if (!(arg instanceof rental_pb.RentalGetRequest)) {
    throw new Error('Expected argument of type org.acme.RentalGetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_org_acme_RentalGetRequest(buffer_arg) {
  return rental_pb.RentalGetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_org_acme_RentalGetResponse(arg) {
  if (!(arg instanceof rental_pb.RentalGetResponse)) {
    throw new Error('Expected argument of type org.acme.RentalGetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_org_acme_RentalGetResponse(buffer_arg) {
  return rental_pb.RentalGetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_org_acme_RentalPutRequest(arg) {
  if (!(arg instanceof rental_pb.RentalPutRequest)) {
    throw new Error('Expected argument of type org.acme.RentalPutRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_org_acme_RentalPutRequest(buffer_arg) {
  return rental_pb.RentalPutRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_org_acme_RentalPutResponse(arg) {
  if (!(arg instanceof rental_pb.RentalPutResponse)) {
    throw new Error('Expected argument of type org.acme.RentalPutResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_org_acme_RentalPutResponse(buffer_arg) {
  return rental_pb.RentalPutResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_org_acme_RentalRequest(arg) {
  if (!(arg instanceof rental_pb.RentalRequest)) {
    throw new Error('Expected argument of type org.acme.RentalRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_org_acme_RentalRequest(buffer_arg) {
  return rental_pb.RentalRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_org_acme_RentalResponse(arg) {
  if (!(arg instanceof rental_pb.RentalResponse)) {
    throw new Error('Expected argument of type org.acme.RentalResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_org_acme_RentalResponse(buffer_arg) {
  return rental_pb.RentalResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var RentalServiceService = exports.RentalServiceService = {
  createRental: {
    path: '/org.acme.RentalService/CreateRental',
    requestStream: false,
    responseStream: false,
    requestType: rental_pb.RentalRequest,
    responseType: rental_pb.RentalResponse,
    requestSerialize: serialize_org_acme_RentalRequest,
    requestDeserialize: deserialize_org_acme_RentalRequest,
    responseSerialize: serialize_org_acme_RentalResponse,
    responseDeserialize: deserialize_org_acme_RentalResponse,
  },
  getRental: {
    path: '/org.acme.RentalService/GetRental',
    requestStream: false,
    responseStream: false,
    requestType: rental_pb.RentalGetRequest,
    responseType: rental_pb.RentalGetResponse,
    requestSerialize: serialize_org_acme_RentalGetRequest,
    requestDeserialize: deserialize_org_acme_RentalGetRequest,
    responseSerialize: serialize_org_acme_RentalGetResponse,
    responseDeserialize: deserialize_org_acme_RentalGetResponse,
  },
  deleteRental: {
    path: '/org.acme.RentalService/DeleteRental',
    requestStream: false,
    responseStream: false,
    requestType: rental_pb.RentalGetRequest,
    responseType: rental_pb.RentalResponse,
    requestSerialize: serialize_org_acme_RentalGetRequest,
    requestDeserialize: deserialize_org_acme_RentalGetRequest,
    responseSerialize: serialize_org_acme_RentalResponse,
    responseDeserialize: deserialize_org_acme_RentalResponse,
  },
  updateRental: {
    path: '/org.acme.RentalService/UpdateRental',
    requestStream: false,
    responseStream: false,
    requestType: rental_pb.RentalPutRequest,
    responseType: rental_pb.RentalPutResponse,
    requestSerialize: serialize_org_acme_RentalPutRequest,
    requestDeserialize: deserialize_org_acme_RentalPutRequest,
    responseSerialize: serialize_org_acme_RentalPutResponse,
    responseDeserialize: deserialize_org_acme_RentalPutResponse,
  },
  allRental: {
    path: '/org.acme.RentalService/AllRental',
    requestStream: false,
    responseStream: true,
    requestType: rental_pb.RentalGetAllRequest,
    responseType: rental_pb.RentalGetResponse,
    requestSerialize: serialize_org_acme_RentalGetAllRequest,
    requestDeserialize: deserialize_org_acme_RentalGetAllRequest,
    responseSerialize: serialize_org_acme_RentalGetResponse,
    responseDeserialize: deserialize_org_acme_RentalGetResponse,
  },
};

exports.RentalServiceClient = grpc.makeGenericClientConstructor(RentalServiceService);
