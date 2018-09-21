'use strict';

import { asyncObject } from '../asyncobject';

import {
  DistributedEddsaSyncSession as CoreDistributedEddsaSyncSession,
  DistributedEddsaSyncSessionShard as CoreDistributedEddsaSyncSessionShard
} from 'crypto-core/lib/primitives/eddsa/distributededdsasyncsession';

export class DistributedEddsaSyncSession extends asyncObject(
  'DistributedEddsaSyncSession',
  CoreDistributedEddsaSyncSession
) {
  static async fromOptions(options, worker) {
    const state = await DistributedEddsaSyncSession.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new DistributedEddsaSyncSession(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await DistributedEddsaSyncSession.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new DistributedEddsaSyncSession(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await DistributedEddsaSyncSession.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new DistributedEddsaSyncSession(state, worker) : state;
  };

  async createCommitment() {
    return await this.invoke({
      method: 'createCommitment',
      arguments: []
    });
  }

  async processData(remote) {
    return await this.invoke({
      method: 'processData',
      arguments: [remote]
    });
  }
}

export class DistributedEddsaSyncSessionShard extends asyncObject(
  'DistributedEddsaSyncSessionShard',
  CoreDistributedEddsaSyncSessionShard
) {
  static async fromOptions(options, worker) {
    const state = await DistributedEddsaSyncSessionShard.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new DistributedEddsaSyncSessionShard(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await DistributedEddsaSyncSessionShard.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new DistributedEddsaSyncSessionShard(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await DistributedEddsaSyncSessionShard.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new DistributedEddsaSyncSessionShard(state, worker) : state;
  };

  async processCommitment(remote) {
    return await this.invoke({
      method: 'processCommitment',
      arguments: [remote]
    });
  }

  async processDecommitment(remote) {
    return await this.invoke({
      method: 'processDecommitment',
      arguments: [remote]
    });
  }
}