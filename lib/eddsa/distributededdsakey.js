'use strict';

import { unwrap } from 'crypto-core/lib/marshal';
import { asyncObject } from '../asyncobject';

import {
  DistributedEddsaKey as CoreDistributedEddsaKey
} from 'crypto-core/lib/primitives/eddsa/distributedkey';

import { DistributedEddsaSignSession, DistributedEddsaSignSessionShard } from './distributededdsasignsession';
import { DistributedEddsaSyncSession, DistributedEddsaSyncSessionShard } from './distributededdsasyncsession';

export class DistributedEddsaKey extends asyncObject(
  'DistributedEddsaKey',
  CoreDistributedEddsaKey
) {
  static async fromOptions(options, worker) {
    const state = await DistributedEddsaKey.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new DistributedEddsaKey(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await DistributedEddsaKey.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new DistributedEddsaKey(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await DistributedEddsaKey.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new DistributedEddsaKey(state, worker) : state;
  };

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
    return new DistributedEddsaSyncSession(await this.invoke({
      method: 'startSyncSession',
      arguments: []
    }, true), this.worker);
  }

  async startSyncSessionShard() {
    return new DistributedEddsaSyncSessionShard(await this.invoke({
      method: 'startSyncSessionShard',
      arguments: []
    }, true), this.worker);
  }

  async importSyncData(syncData) {
    return await this.invoke({
      method: 'importSyncData',
      arguments: [syncData]
    });
  }

  async startSignSession(message) {
    return new DistributedEddsaSignSession(await this.invoke({
      method: 'startSignSession',
      arguments: [message]
    }, true), this.worker);
  }

  async startSignSessionShard(message) {
    return new DistributedEddsaSignSessionShard(await this.invoke({
      method: 'startSignSessionShard',
      arguments: [message]
    }, true), this.worker);
  }
}