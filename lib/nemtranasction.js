'use strict';

import { NemTransaction as CoreNemTransaction } from 'crypto-core/lib/transaction/nem/nemtransaction';
import { DistributedEddsaSignSession, DistributedEddsaSignSessionShard } from './eddsa/distributededdsasignsession';

import { asyncObject } from './asyncobject';

export class NemTransaction extends asyncObject(
  'NemTransaction',
  CoreNemTransaction
) {
  static async fromOptions(options, worker) {
    const state = await NemTransaction.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new NemTransaction(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await NemTransaction.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new NemTransaction(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await NemTransaction.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new NemTransaction(state, worker) : state;
  };

  static async create(worker) {
    const state = await NemTransaction.invokeStatic({
      method: 'create',
      arguments: []
    }, worker, true);

    return worker ? new NemTransaction(state, worker) : state;
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
    return new DistributedEddsaSignSession(await this.invoke({
      method: 'startSignSession',
      arguments: [distributedKey.state]
    }, true), this.worker);
  }

  async startSignSessionShard(distributedKeyShard) {
    return new DistributedEddsaSignSessionShard(await this.invoke({
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
