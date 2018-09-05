'use strict';

import { asyncObject } from './asyncobject';
import { LitecoinTransaction as CoreLitecoinTransaction } from 'crypto-core/lib/transaction/bitcore/litecointransaction';

import { BitcoreSignSession, BitcoreSignSessionShard } from './bitcoretransaction';

export class LitecoinTransaction extends asyncObject(
  'LitecoinTransaction',
  CoreLitecoinTransaction
) {
  static async fromOptions(options, worker) {
    const state = await LitecoinTransaction.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new LitecoinTransaction(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await LitecoinTransaction.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new LitecoinTransaction(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await LitecoinTransaction.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new LitecoinTransaction(state, worker) : state;
  };

  static async create(worker) {
    const state = await LitecoinTransaction.invokeStatic({
      method: 'create',
      arguments: []
    }, worker, true);

    return worker ? new LitecoinTransaction(state, worker) : state;
  }

  async estimateSize() {
    return await this.invoke({
      method: 'estimateSize',
      arguments: []
    });
  }

  async estimateFee() {
    return await this.invoke({
      method: 'estimateFee',
      arguments: []
    });
  }

  async validate(address) {
    return await this.invoke({
      method: 'validate',
      arguments: [address]
    });
  }

  async totalOutputs() {
    return await this.invoke({
      method: 'totalOutputs',
      arguments: []
    });
  }

  async startSignSession(compoundKey) {
    return new BitcoreSignSession(await this.invoke({
      method: 'startSignSession',
      arguments: [compoundKey]
    }, true), this.worker);
  }

  async startSignSessionShard(compoundKey) {
    return new BitcoreSignSessionShard(await this.invoke({
      method: 'startSignSessionShard',
      arguments: [compoundKey]
    }, true), this.worker);
  }

  async applySignature(signature) {
    return await this.invoke({
      method: 'applySignature',
      arguments: [signature]
    });
  }

  async toRaw() {
    return await this.invoke({
      method: 'toRaw',
      arguments: []
    });
  }

  async verify() {
    return await this.invoke({
      method: 'verify',
      arguments: []
    });
  }
}
