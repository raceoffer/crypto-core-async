'use strict';

import { asyncObject } from '../asyncobject';

import {
  DistributedEcdsaSignSession as CoreDistributedEcdsaSignSession,
  DistributedEcdsaSignSessionShard as CoreDistributedEcdsaSignSessionShard
} from 'crypto-core/lib/primitives/ecdsa/distributedecdsasignsession';

export class DistributedEcdsaSignSession extends asyncObject(
  'DistributedEcdsaSignSession',
  CoreDistributedEcdsaSignSession
) {
  static async fromOptions(options, worker) {
    const state = await DistributedEcdsaSignSession.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new DistributedEcdsaSignSession(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await DistributedEcdsaSignSession.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new DistributedEcdsaSignSession(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await DistributedEcdsaSignSession.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new DistributedEcdsaSignSession(state, worker) : state;
  };

  async createEntropyCommitment() {
    return await this.invoke({
      method: 'createEntropyCommitment',
      arguments: []
    });
  }

  async processEntropyData(remote) {
    return await this.invoke({
      method: 'processEntropyData',
      arguments: [remote]
    });
  }

  async finalizeSignature(remote) {
    return await this.invoke({
      method: 'finalizeSignature',
      arguments: [remote]
    });
  }
}

export class DistributedEcdsaSignSessionShard extends asyncObject(
  'DistributedEcdsaSignSessionShard',
  CoreDistributedEcdsaSignSessionShard
) {
  static async fromOptions(options, worker) {
    const state = await DistributedEcdsaSignSessionShard.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new DistributedEcdsaSignSessionShard(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await DistributedEcdsaSignSessionShard.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new DistributedEcdsaSignSessionShard(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await DistributedEcdsaSignSessionShard.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new DistributedEcdsaSignSessionShard(state, worker) : state;
  };

  async processEntropyCommitment(remote) {
    return await this.invoke({
      method: 'processEntropyCommitment',
      arguments: [remote]
    });
  }

  async processEntropyDecommitment(remote) {
    return await this.invoke({
      method: 'processEntropyDecommitment',
      arguments: [remote]
    });
  }
}