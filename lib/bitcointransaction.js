'use strict';

import { asyncObject } from './asyncobject';
import { BitcoinTransaction as CoreBitcoinTransaction } from 'crypto-core/lib/transaction/bitcore/bitcointransaction';

import { BitcoreSignSession, BitcoreSignSessionShard } from './bitcoretransaction';

export class BitcoinTransaction extends asyncObject(
  'BitcoinTransaction',
  CoreBitcoinTransaction
) {
  static async fromOptions(options, worker) {
    const state = await BitcoinTransaction.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new BitcoinTransaction(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await BitcoinTransaction.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new BitcoinTransaction(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await BitcoinTransaction.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new BitcoinTransaction(state, worker) : state;
  };

  static async create(worker) {
    const state = await BitcoinTransaction.invokeStatic({
      method: 'create',
      arguments: []
    }, worker, true);

    return worker ? new BitcoinTransaction(state, worker) : state;
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

  async startSignSession(distributedKey) {
    return new BitcoreSignSession(await this.invoke({
      method: 'startSignSession',
      arguments: [distributedKey.state]
    }, true), this.worker);
  }

  async startSignSessionShard(distributedKeyShard) {
    return new BitcoreSignSessionShard(await this.invoke({
      method: 'startSignSessionShard',
      arguments: [distributedKeyShard.state]
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
