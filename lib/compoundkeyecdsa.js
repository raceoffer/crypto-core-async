'use strict';

import assert from 'assert';
import map from 'lodash/map';
import defaultTo from 'lodash/defaultTo';

import { default as _invoke } from 'lodash/invoke';
import { CompoundKey as CoreCompoundKey } from 'crypto-core/lib/primitives/ecdsa/compoundkey';

import { wrap, unwrap } from 'crypto-core/lib/marshal';

import { PaillierProver } from './paillierprover';
import { SignerEcdsa } from './signerecdsa';

export class CompoundKeyEcdsa {
  constructor(state, worker) {
    this.state = state || { type: 'CompoundKeyEcdsa' };
    this.worker = worker || null;
  }

  async invoke(message, wrapped) {
    assert(this.worker);
    const result = await this.worker.postMessage({
      action: 'invoke',
      class: 'CompoundKeyEcdsa',
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
        class: 'CompoundKeyEcdsa',
        method: message.method,
        arguments: map(defaultTo(message.arguments, []), wrap)
      });
      return wrapped ? result : unwrap(result);
    } else {
      return _invoke(CoreCompoundKey, message.method, ... message.arguments);
    }
  };

  static async generatePaillierKeys(worker) {
    return CompoundKeyEcdsa.invokeStatic({
      method: 'generatePaillierKeys',
      arguments: []
    }, worker);
  }

  async fromOptions(options) {
    await this.invoke({
      method: 'fromOptions',
      arguments: [options]
    }, true);
    return this;
  }

  static async fromOptions(options, worker) {
    const state = await CompoundKeyEcdsa.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new CompoundKeyEcdsa(state, worker) : state;
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
    const state = await CompoundKeyEcdsa.invokeStatic({
      method: 'fromJSON',
      arguments: [json]
    }, worker, true);

    return worker ? new CompoundKeyEcdsa(state, worker) : state;
  }

  async localPrivate() {
    return unwrap(this.state).localPrivate();
  }

  async localPublic() {
    return unwrap(this.state).localPublic();
  }

  async remotePublic() {
    return unwrap(this.state).remotePublic();
  }

  async compoundPublic() {
    return unwrap(this.state).compoundPublic();
  }

  async startSyncSession() {
    return new PaillierProver(await this.invoke({
      method: 'startSyncSession',
      arguments: []
    }, true), this.worker);
  }

  async extractSyncData() {
    return await this.invoke({
      method: 'extractSyncData',
      arguments: []
    });
  }

  async importSyncData(syncData) {
    return await this.invoke({
      method: 'importSyncData',
      arguments: [syncData]
    });
  }

  async startSignSession(message) {
    return new SignerEcdsa(await this.invoke({
      method: 'startSignSession',
      arguments: [message]
    }, true), this.worker);
  }
}
