import assert from 'assert';
import map from 'lodash/map';
import defaultTo from 'lodash/defaultTo';
import { default as _invoke } from 'lodash/invoke';

import { wrap, unwrap } from 'crypto-core/lib/marshal';

export function asyncObject(name, CoreClass) {
  const Class = new Function(
    'return function ' + name + '(state, worker) {\
      this.state = state || { type: \'' + name + '\' };\
      this.worker = worker || null;\
    }'
  )();

  Class.prototype.invoke = async function(message, wrapped) {
    assert(this.worker);
    const result = await this.worker.postMessage({
      action: 'invoke',
      class: name,
      self: this.state,
      method: message.method,
      arguments: map(defaultTo(message.arguments, []), wrap)
    });

    this.state = result.self;

    return wrapped ? result.result : unwrap(result.result);
  };

  Class.invokeStatic = async function(message, worker, wrapped) {
    if (worker) {
      const result = await worker.postMessage({
        action: 'invokeStatic',
        class: name,
        method: message.method,
        arguments: map(defaultTo(message.arguments, []), wrap)
      });
      return wrapped ? result : unwrap(result);
    } else {
      return _invoke(CoreClass, message.method, ... message.arguments);
    }
  };

  Class.prototype.fromOptions = async function(options) {
    await this.invoke({
      method: 'fromOptions',
      arguments: [options]
    }, true);
    return this;
  };

  Class.prototype.toJSON = async function(hex) {
    return await this.invoke({
      method: 'toJSON',
      arguments: [hex]
    });
  };

  Class.prototype.fromJSON = async function(json, hex) {
    await this.invoke({
      method: 'fromJSON',
      arguments: [json, hex]
    }, true);
    return this;
  };

  Class.prototype.toBytes = async function() {
    return await this.invoke({
      method: 'toBytes',
      arguments: []
    });
  };

  Class.prototype.fromBytes = async function(bytes) {
    await this.invoke({
      method: 'fromBytes',
      arguments: [bytes]
    }, true);
    return this;
  };

  Class.fromOptions = async function(options, worker) {
    const state = await Class.invokeStatic({
      method: 'fromOptions',
      arguments: [options]
    }, worker, true);

    return worker ? new Class(state, worker) : state;
  };
  
  Class.fromJSON = async function(json, hex, worker) {
    const state = await Class.invokeStatic({
      method: 'fromJSON',
      arguments: [json, hex]
    }, worker, true);

    return worker ? new Class(state, worker) : state;
  };

  Class.fromBytes = async function(bytes, worker) {
    const state = await Class.invokeStatic({
      method: 'fromBytes',
      arguments: [bytes]
    }, worker, true);

    return worker ? new Class(state, worker) : state;
  };

  return Class;
}