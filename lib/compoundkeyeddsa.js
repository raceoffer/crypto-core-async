'use strict';

import assert from 'assert';
import map from 'lodash/map';
import defaultTo from 'lodash/defaultTo';

import { default as _invoke } from 'lodash/invoke';
import { CompoundKey as CoreCompoundKey } from 'crypto-core/lib/primitives/eddsa/compoundkey';

import { wrap, unwrap } from 'crypto-core/lib/marshal';

import { SyncSession } from './syncsession';
import { SignerEddsa } from './signereddsa';

export class CompoundKeyEddsa {
  constructor(state, worker) {
    this.state = state || { type: 'CompoundKeyEddsa' };
    this.worker = worker || null;
  }

  async invoke(message, wrapped) {
    assert(this.worker);
    const result = await this.worker.postMessage({
      action: 'invoke',
      class: 'CompoundKeyEddsa',
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
        class: 'CompoundKeyEddsa',
        method: message.method,
        arguments: map(defaultTo(message.arguments, []), wrap)
      });
      return wrapped ? result : unwrap(result);
    } else {
      return _invoke(CoreCompoundKey, message.method, ... message.arguments);
    }
  };

  async fromOptions(options) {
    await this.invoke({
      method: 'fromOptions',
      arguments: [options]
    }, true);
    return this;
  }

  static async fromOptions(options, worker) {
    const state = await CompoundKeyEddsa.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new CompoundKeyEddsa(state, worker) : state;
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
    const state = await CompoundKeyEddsa.invokeStatic({
      method: 'fromJSON',
      arguments: [json]
    }, worker, true);

    return worker ? new CompoundKeyEddsa(state, worker) : state;
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
    return new SyncSession(await this.invoke({
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
    return new SignerEddsa(await this.invoke({
      method: 'startSignSession',
      arguments: [message]
    }, true), this.worker);
  }
}
