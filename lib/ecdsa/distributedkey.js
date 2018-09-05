'use strict';

import { unwrap } from 'crypto-core/lib/marshal';
import { asyncObject } from '../asyncobject';

import {
  DistributedEcdsaKey as CoreDistributedEcdsaKey,
  DistributedEcdsaKeyShard as CoreDistributedEcdsaKeyShard
} from 'crypto-core/lib/primitives/ecdsa/distributedkey';

import { DistributedEcdsaSignSession, DistributedEcdsaSignSessionShard } from './distributedsignsession';
import { DistributedEcdsaSyncSession, DistributedEcdsaSyncSessionShard } from './distributedsyncsession';

export class DistributedEcdsaKey extends asyncObject(
  'DistributedEcdsaKey',
  CoreDistributedEcdsaKey
) {
  static async fromOptions(options, worker) {
    const state = await DistributedEcdsaKey.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new DistributedEcdsaKey(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await DistributedEcdsaKey.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new DistributedEcdsaKey(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await DistributedEcdsaKey.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new DistributedEcdsaKey(state, worker) : state;
  };

  static async generatePaillierKeys(worker) {
    return await DistributedEcdsaKey.invokeStatic({
      method: 'generatePaillierKeys',
      arguments: []
    }, worker);
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
    return new DistributedEcdsaSyncSession(await this.invoke({
      method: 'startSyncSession',
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
    return new DistributedEcdsaSignSession(await this.invoke({
      method: 'startSignSession',
      arguments: [message]
    }, true), this.worker);
  }
}

export class DistributedEcdsaKeyShard extends asyncObject(
  'DistributedEcdsaKeyShard',
  CoreDistributedEcdsaKeyShard
) {
  static async fromOptions(options, worker) {
    const state = await DistributedEcdsaKeyShard.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new DistributedEcdsaKeyShard(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await DistributedEcdsaKeyShard.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new DistributedEcdsaKeyShard(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await DistributedEcdsaKeyShard.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new DistributedEcdsaKeyShard(state, worker) : state;
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
    return new DistributedEcdsaSyncSessionShard(await this.invoke({
      method: 'startSyncSession',
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
    return new DistributedEcdsaSignSessionShard(await this.invoke({
      method: 'startSignSession',
      arguments: [message]
    }, true), this.worker);
  }
}