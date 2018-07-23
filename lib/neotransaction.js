'use strict';

import assert from 'assert';
import map from 'lodash/map';
import defaultTo from 'lodash/defaultTo';

import { default as _invoke } from 'lodash/invoke';
import { NeoTransaction as CoreNeoTransaction } from 'crypto-core/lib/transaction/neo/neotransaction';

import { wrap, unwrap } from 'crypto-core/lib/marshal';

export class NeoTransaction {
  constructor(state, worker) {
    this.state = state || { type: 'NeoTransaction' };
    this.worker = worker || null;
  }

  async invoke(message, wrapped) {
    assert(this.worker);
    const result = await this.worker.postMessage({
      action: 'invoke',
      class: 'NeoTransaction',
      self: this.state,
      method: message.method,
      arguments: map(defaultTo(message.arguments, []), wrap)
    });

    this.state = result.self;

    return wrapped ? result.result : unwrap(result.result);
  }

  static async invokeStatic(message, worker, wrapped) {
    if (worker) {
      const result = await worker.postMessage({
        action: 'invokeStatic',
        class: 'NeoTransaction',
        method: message.method,
        arguments: map(defaultTo(message.arguments, []), wrap)
      });
      return wrapped ? result : unwrap(result);
    } else {
      return _invoke(CoreNeoTransaction, message.method, ... message.arguments);
    }
  }

  static async create(worker) {
    const state = await NeoTransaction.invokeStatic({
      method: 'create',
      arguments: []
    }, worker, true);

    return worker ? new NeoTransaction(state, worker) : state;
  }

  async fromOptions(tx) {
    await this.invoke({
      method: 'fromOptions',
      arguments: [tx]
    }, true);
    return this;
  }

  static async fromOptions(tx, worker) {
    const state = await NeoTransaction.invokeStatic({
      method: 'fromOptions',
      arguments: [tx]
    }, worker, true);

    return worker ? new NeoTransaction(state, worker) : state;
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

  async toJSON() {
    return await this.invoke({
      method: 'toJSON',
      arguments: []
    });
  }

  async fromJSON(json) {
    await this.invoke({
      method: 'fromJSON',
      arguments: [json]
    }, true);
    return this;
  }

  static async fromJSON(json, worker) {
    const state = await NeoTransaction.invokeStatic({
      method: 'fromJSON',
      arguments: [json]
    }, worker, true);

    return worker ? new NeoTransaction(state, worker) : state;
  }

  async startSignSession(compoundKey) {
    return await this.invoke({
      method: 'startSignSession',
      arguments: [compoundKey.state]
    });
  }

  async createCommitment() {
    return await this.invoke({
      method: 'createCommitment',
      arguments: []
    });
  }

  async processCommitment(commitment) {
    return await this.invoke({
      method: 'processCommitment',
      arguments: [commitment]
    });
  }

  async processDecommitment(decommitment) {
    await this.invoke({
      method: 'processDecommitment',
      arguments: [decommitment]
    });
  }

  async computeSignature() {
    return await this.invoke({
      method: 'computeSignature',
      arguments: []
    });
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
