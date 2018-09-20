'use strict';

import { asyncObject } from '../asyncobject';

import {
  DistributedEddsaSignSession as CoreDistributedEddsaSignSession,
  DistributedEddsaSignSessionShard as CoreDistributedEddsaSignSessionShard
} from 'crypto-core/lib/primitives/eddsa/distributededdsasignsession';

export class DistributedEddsaSignSession extends asyncObject(
  'DistributedEddsaSignSession',
  CoreDistributedEddsaSignSession
) {
  static async fromOptions(options, worker) {
    const state = await DistributedEddsaSignSession.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new DistributedEddsaSignSession(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await DistributedEddsaSignSession.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new DistributedEddsaSignSession(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await DistributedEddsaSignSession.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new DistributedEddsaSignSession(state, worker) : state;
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

export class DistributedEddsaSignSessionShard extends asyncObject(
  'DistributedEddsaSignSessionShard',
  CoreDistributedEddsaSignSessionShard
) {
  static async fromOptions(options, worker) {
    const state = await DistributedEddsaSignSessionShard.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new DistributedEddsaSignSessionShard(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await DistributedEddsaSignSessionShard.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new DistributedEddsaSignSessionShard(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await DistributedEddsaSignSessionShard.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new DistributedEddsaSignSessionShard(state, worker) : state;
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