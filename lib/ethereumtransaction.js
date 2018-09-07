'use strict';

import { EthereumTransaction as CoreEthereumTransaction } from 'crypto-core/lib/transaction/ethereum/ethereumtransaction';
import { DistributedEcdsaSignSession, DistributedEcdsaSignSessionShard } from './ecdsa/distributedsignsession';

import { asyncObject } from './asyncobject';

export class EthereumTransaction extends asyncObject(
  'EthereumTransaction',
  CoreEthereumTransaction
) {
  static async fromOptions(options, worker) {
    const state = await EthereumTransaction.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new EthereumTransaction(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await EthereumTransaction.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new EthereumTransaction(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await EthereumTransaction.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new EthereumTransaction(state, worker) : state;
  };

  static async create(worker) {
    const state = await EthereumTransaction.invokeStatic({
      method: 'create',
      arguments: []
    }, worker, true);

    return worker ? new EthereumTransaction(state, worker) : state;
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
    return new DistributedEcdsaSignSession(await this.invoke({
      method: 'startSignSession',
      arguments: [distributedKey.state]
    }, true), this.worker);
  }

  async startSignSessionShard(distributedKeyShard) {
    return new DistributedEcdsaSignSessionShard(await this.invoke({
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
