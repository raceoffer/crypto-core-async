'use strict';

import assert from 'assert';
import map from 'lodash/map';
import defaultTo from 'lodash/defaultTo';

import { default as _invoke } from 'lodash/invoke';
import { Signer as CoreSigner } from 'crypto-core/lib/primitives/eddsa/signer';

import { wrap, unwrap } from 'crypto-core/lib/marshal';

export class SignerEddsa {
  constructor(state, worker) {
    this.state = state || { type: 'SignerEddsa' };
    this.worker = worker || null;
  }

  async invoke(message, wrapped) {
    assert(this.worker);
    const result = await this.worker.postMessage({
      action: 'invoke',
      class: 'SignerEddsa',
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
        class: 'SignerEddsa',
        method: message.method,
        arguments: map(defaultTo(message.arguments, []), wrap)
      });
      return wrapped ? result : unwrap(result);
    } else {
      return _invoke(CoreSigner, message.method, ... message.arguments);
    }
  }

  async fromOptions(options) {
    await this.invoke({
      method: 'fromOptions',
      arguments: [options]
    }, true);
    return this;
  }

  static async fromOptions(options, worker) {
    const state = await Signer.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new SignerEddsa(state, worker) : state;
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
    const state = await SignerEddsa.invokeStatic({
      method: 'fromJSON',
      arguments: [json]
    }, worker, true);

    return worker ? new SignerEddsa(state, worker) : state;
  }

  async createCommitment() {
    return await this.invoke({
      method: 'createCommitment',
      arguments: []
    });
  };

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

  async computePartialSignature() {
    return await this.invoke({
      method: 'computePartialSignature',
      arguments: []
    });
  }

  async finalizeSignature(s) {
    return await this.invoke({
      method: 'finalizeSignature',
      arguments: [s]
    });
  }
}
