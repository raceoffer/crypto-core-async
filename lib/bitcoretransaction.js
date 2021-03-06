'use strict';

import { asyncObject } from './asyncobject';

import {
  BitcoreSignSession as CoreBitcoreSignSession,
  BitcoreSignSessionShard as CoreBitcoreSignSessionShard
} from 'crypto-core/lib/transaction/bitcore/bitcoretransaction';

export class BitcoreSignSession extends asyncObject(
  'BitcoreSignSession',
  CoreBitcoreSignSession
) {
  static async fromOptions(options, worker) {
    const state = await BitcoreSignSession.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new BitcoreSignSession(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await BitcoreSignSession.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new BitcoreSignSession(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await BitcoreSignSession.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new BitcoreSignSession(state, worker) : state;
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

export class BitcoreSignSessionShard extends asyncObject(
  'BitcoreSignSessionShard',
  CoreBitcoreSignSessionShard
) {
  static async fromOptions(options, worker) {
    const state = await BitcoreSignSessionShard.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new BitcoreSignSessionShard(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await BitcoreSignSessionShard.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new BitcoreSignSessionShard(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await BitcoreSignSessionShard.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new BitcoreSignSessionShard(state, worker) : state;
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