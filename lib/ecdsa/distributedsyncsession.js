'use strict';

import { asyncObject } from '../asyncobject';

import {
  DistributedEcdsaSyncSession as CoreDistributedEcdsaSyncSession,
  DistributedEcdsaSyncSessionShard as CoreDistributedEcdsaSyncSessionShard
} from 'crypto-core/lib/primitives/ecdsa/distributedsyncsession';

export class DistributedEcdsaSyncSession extends asyncObject(
  'DistributedEcdsaSyncSession',
  CoreDistributedEcdsaSyncSession
) {
  static async fromOptions(options, worker) {
    const state = await DistributedEcdsaSyncSession.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new DistributedEcdsaSyncSession(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await DistributedEcdsaSyncSession.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new DistributedEcdsaSyncSession(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await DistributedEcdsaSyncSession.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new DistributedEcdsaSyncSession(state, worker) : state;
  };

  async createInitialCommitment() {
    return await this.invoke({
      method: 'createInitialCommitment',
      arguments: []
    });
  }

  async processInitialData(remote) {
    return await this.invoke({
      method: 'processInitialData',
      arguments: [remote]
    });
  }

  async processChallengeCommitment(remote) {
    return await this.invoke({
      method: 'processChallengeCommitment',
      arguments: [remote]
    });
  }

  async processChallengeDecommitment(remote) {
    return await this.invoke({
      method: 'processChallengeDecommitment',
      arguments: [remote]
    });
  }
}

export class DistributedEcdsaSyncSessionShard extends asyncObject(
  'DistributedEcdsaSyncSessionShard',
  CoreDistributedEcdsaSyncSessionShard
) {
  static async fromOptions(options, worker) {
    const state = await DistributedEcdsaSyncSessionShard.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new DistributedEcdsaSyncSessionShard(state, worker) : state;
  };
  
  static async fromJSON(json, hex, worker) {
    const state = await DistributedEcdsaSyncSessionShard.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new DistributedEcdsaSyncSessionShard(state, worker) : state;
  };

  static async fromBytes(bytes, worker) {
    const state = await DistributedEcdsaSyncSessionShard.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new DistributedEcdsaSyncSessionShard(state, worker) : state;
  };

  async processInitialCommitment(remote) {
    return await this.invoke({
      method: 'processInitialCommitment',
      arguments: [remote]
    });
  }

  async processInitialDecommitment(remote) {
    return await this.invoke({
      method: 'processInitialDecommitment',
      arguments: [remote]
    });
  }

  async processResponseCommitment(remote) {
    return await this.invoke({
      method: 'processResponseCommitment',
      arguments: [remote]
    });
  }

  async processResponseDecommitment(remote) {
    return await this.invoke({
      method: 'processResponseDecommitment',
      arguments: [remote]
    });
  }
}