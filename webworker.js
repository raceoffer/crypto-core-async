'use strict';

import registerPromiseWorker from 'promise-worker/register';
import assert from 'assert';

import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import includes from 'lodash/includes';
import keys from 'lodash/keys';
import get from 'lodash/get';
import has from 'lodash/has';
import invoke from 'lodash/invoke';
import map from 'lodash/map';
import defaultTo from 'lodash/defaultTo';

import { wrap, unwrap } from 'crypto-core/lib/marshal';

import * as Utils from 'crypto-core/lib/utils';

import { CompoundKey as CompoundKeyEcdsa } from 'crypto-core/lib/primitives/ecdsa/compoundkey';
import { PaillierProver } from 'crypto-core/lib/primitives/ecdsa/paillierprover';
import { PaillierVerifier } from 'crypto-core/lib/primitives/ecdsa/paillierverifier';
import { Signer as SignerEcdsa } from 'crypto-core/lib/primitives/ecdsa/signer';

import { CompoundKey as CompoundKeyEddsa } from 'crypto-core/lib/primitives/eddsa/compoundkey';
import { SyncSession } from 'crypto-core/lib/primitives/eddsa/syncsession';
import { Signer as SignerEddsa } from 'crypto-core/lib/primitives/eddsa/signer';

import { BitcoinTransaction } from 'crypto-core/lib/transaction/bitcore/bitcointransaction';
import { BitcoinCashTransaction } from 'crypto-core/lib/transaction/bitcore/bitcoincashtransaction';
import { LitecoinTransaction } from 'crypto-core/lib/transaction/bitcore/litecointransaction';
import { EthereumTransaction } from 'crypto-core/lib/transaction/ethereum/ethereumtransaction';
import { NemTransaction } from 'crypto-core/lib/transaction/nem/nemtransaction';

const CryptoCore = {
  Utils,
  CompoundKeyEcdsa,
  PaillierProver,
  PaillierVerifier,
  SignerEcdsa,
  CompoundKeyEddsa,
  SyncSession,
  SignerEddsa,
  BitcoinTransaction,
  BitcoinCashTransaction,
  LitecoinTransaction,
  EthereumTransaction,
  NemTransaction
};

registerPromiseWorker(async message => {
  assert(
    isString(message.action) && includes(['invoke', 'invokeStatic'], message.action),
    'message.action should be one of [\'invoke\', \'invokeStatic\']'
  );
  assert(
    isString(message.class) && has(CryptoCore, message.class),
    'message.class should be one of ' + keys(CryptoCore)
  );

  const objectClass = get(CryptoCore, message.class);

  switch(message.action) {
    case 'invoke':
      const self = unwrap(message.self);

      assert(
        isString(message.method) && isFunction(get(self, message.method)),
        'message.method should be an instance method of ' + message.class
      );

      const result = await invoke(
        self,
        message.method,
        ... map(defaultTo(message.arguments, []), unwrap)
      );

      return {
        result: wrap(result),
        self: wrap(self)
      };
    case 'invokeStatic':
      assert(
        isString(message.method) && isFunction(get(objectClass, message.method)),
        'message.method should be one of ' + keys(CryptoCore)
      );

      return wrap(await invoke(
        objectClass,
        message.method,
        ... map(defaultTo(message.arguments, []), unwrap)
      ));
  }
});
