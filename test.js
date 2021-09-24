var JS_TESTS = function (_) {
  'use strict';
  //region block: pre-declaration
  CoroutineSingletons.prototype = Object.create(Enum.prototype);
  CoroutineSingletons.prototype.constructor = CoroutineSingletons;
  Error_0.prototype = Object.create(Error.prototype);
  Error_0.prototype.constructor = Error_0;
  NotImplementedError.prototype = Object.create(Error_0.prototype);
  NotImplementedError.prototype.constructor = NotImplementedError;
  Long.prototype = Object.create(Number_0.prototype);
  Long.prototype.constructor = Long;
  _no_name_provided__1.prototype = Object.create(CoroutineImpl_0.prototype);
  _no_name_provided__1.prototype.constructor = _no_name_provided__1;
  Exception.prototype = Object.create(Error.prototype);
  Exception.prototype.constructor = Exception;
  RuntimeException.prototype = Object.create(Exception.prototype);
  RuntimeException.prototype.constructor = RuntimeException;
  IllegalStateException.prototype = Object.create(RuntimeException.prototype);
  IllegalStateException.prototype.constructor = IllegalStateException;
  NullPointerException.prototype = Object.create(RuntimeException.prototype);
  NullPointerException.prototype.constructor = NullPointerException;
  ClassCastException.prototype = Object.create(RuntimeException.prototype);
  ClassCastException.prototype.constructor = ClassCastException;
  box$slambda$slambda.prototype = Object.create(CoroutineImpl_0.prototype);
  box$slambda$slambda.prototype.constructor = box$slambda$slambda;
  box$slambda$slambda_1.prototype = Object.create(CoroutineImpl_0.prototype);
  box$slambda$slambda_1.prototype.constructor = box$slambda$slambda_1;
  box$slambda.prototype = Object.create(CoroutineImpl_0.prototype);
  box$slambda.prototype.constructor = box$slambda;
  Companion_3.prototype = Object.create(EmptyContinuation.prototype);
  Companion_3.prototype.constructor = Companion_3;
  //endregion
  //region file: libraries/stdlib/js-ir/build/commonMainSources/libraries/stdlib/src/kotlin/coroutines/Continuation.kt
  function Continuation() {
  }
  Continuation.$metadata$ = {
    simpleName: 'Continuation',
    kind: 'interface',
    interfaces: []
  };
  function startCoroutine(_this_, completion) {
    var tmp$ret$1;
    $l$block_0: {
      var tmp1_resume_0 = intercepted(createCoroutineUnintercepted(_this_, completion));
      var tmp$ret$0;
      $l$block: {
        var tmp0_success_0 = Companion_getInstance();
        tmp$ret$0 = _Result___init__impl_(Unit_getInstance());
        break $l$block;
      }
      tmp$ret$1 = tmp1_resume_0.resumeWith_bnunh2_k$(tmp$ret$0);
      break $l$block_0;
    }
  }
  //endregion
  //region file: libraries/stdlib/js-ir/build/commonMainSources/libraries/stdlib/src/kotlin/coroutines/ContinuationInterceptor.kt
  function Key() {
    Key_instance = this;
  }
  Key.$metadata$ = {
    simpleName: 'Key',
    kind: 'object',
    interfaces: [Key_0]
  };
  var Key_instance;
  function Key_getInstance() {
    if (Key_instance == null)
      new Key();
    return Key_instance;
  }
  //endregion
  //region file: libraries/stdlib/js-ir/build/commonMainSources/libraries/stdlib/src/kotlin/coroutines/CoroutineContext.kt
  function Key_0() {
  }
  Key_0.$metadata$ = {
    simpleName: 'Key',
    kind: 'interface',
    interfaces: []
  };
  function CoroutineContext() {
  }
  CoroutineContext.$metadata$ = {
    simpleName: 'CoroutineContext',
    kind: 'interface',
    interfaces: []
  };
  //endregion
  //region file: libraries/stdlib/js-ir/build/commonMainSources/libraries/stdlib/src/kotlin/coroutines/CoroutineContextImpl.kt
  function EmptyCoroutineContext() {
    EmptyCoroutineContext_instance = this;
    this._serialVersionUID = new Long(0, 0);
  }
  EmptyCoroutineContext.prototype.get_9uvjra_k$ = function (key) {
    return null;
  };
  EmptyCoroutineContext.$metadata$ = {
    simpleName: 'EmptyCoroutineContext',
    kind: 'object',
    interfaces: [CoroutineContext, Serializable]
  };
  var EmptyCoroutineContext_instance;
  function EmptyCoroutineContext_getInstance() {
    if (EmptyCoroutineContext_instance == null)
      new EmptyCoroutineContext();
    return EmptyCoroutineContext_instance;
  }
  //endregion
  //region file: libraries/stdlib/js-ir/build/commonMainSources/libraries/stdlib/src/kotlin/coroutines/intrinsics/Intrinsics.kt
  function _get_COROUTINE_SUSPENDED_() {
    return CoroutineSingletons_COROUTINE_SUSPENDED_getInstance();
  }
  var CoroutineSingletons_COROUTINE_SUSPENDED_instance;
  var CoroutineSingletons_UNDECIDED_instance;
  var CoroutineSingletons_RESUMED_instance;
  var CoroutineSingletons_entriesInitialized;
  function CoroutineSingletons_initEntries() {
    if (CoroutineSingletons_entriesInitialized)
      return Unit_getInstance();
    CoroutineSingletons_entriesInitialized = true;
    CoroutineSingletons_COROUTINE_SUSPENDED_instance = new CoroutineSingletons('COROUTINE_SUSPENDED', 0);
    CoroutineSingletons_UNDECIDED_instance = new CoroutineSingletons('UNDECIDED', 1);
    CoroutineSingletons_RESUMED_instance = new CoroutineSingletons('RESUMED', 2);
  }
  function CoroutineSingletons(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  CoroutineSingletons.$metadata$ = {
    simpleName: 'CoroutineSingletons',
    kind: 'class',
    interfaces: []
  };
  function CoroutineSingletons_COROUTINE_SUSPENDED_getInstance() {
    CoroutineSingletons_initEntries();
    return CoroutineSingletons_COROUTINE_SUSPENDED_instance;
  }
  //endregion
  //region file: libraries/stdlib/js-ir/build/commonMainSources/libraries/stdlib/src/kotlin/util/Result.kt
  function _Result___init__impl_(value) {
    return value;
  }
  function _Result___get_value__impl_(this_0) {
    return this_0;
  }
  function _Result___get_isFailure__impl_(this_0) {
    var tmp = _Result___get_value__impl_(this_0);
    return tmp instanceof Failure;
  }
  function Result__exceptionOrNull_impl(this_0) {
    var tmp0_subject = _Result___get_value__impl_(this_0);
    var tmp;
    if (tmp0_subject instanceof Failure) {
      tmp = _Result___get_value__impl_(this_0)._exception;
    } else {
      {
        tmp = null;
      }
    }
    return tmp;
  }
  function Companion_0() {
    Companion_instance = this;
  }
  Companion_0.$metadata$ = {
    simpleName: 'Companion',
    kind: 'object',
    interfaces: []
  };
  var Companion_instance;
  function Companion_getInstance() {
    if (Companion_instance == null)
      new Companion_0();
    return Companion_instance;
  }
  function Failure(exception) {
    this._exception = exception;
  }
  Failure.$metadata$ = {
    simpleName: 'Failure',
    kind: 'class',
    interfaces: [Serializable]
  };
  function createFailure(exception) {
    return new Failure(exception);
  }
  function throwOnFailure(_this_) {
    var tmp = _Result___get_value__impl_(_this_);
    if (tmp instanceof Failure)
      throw _Result___get_value__impl_(_this_)._exception;
    else {
    }
  }
  //endregion
  //region file: libraries/stdlib/js-ir/build/commonMainSources/libraries/stdlib/src/kotlin/util/Standard.kt
  function NotImplementedError(message) {
    Error_init_$Init$(message, this);
    captureStack(this, NotImplementedError);
  }
  NotImplementedError.$metadata$ = {
    simpleName: 'NotImplementedError',
    kind: 'class',
    interfaces: []
  };
  //endregion
  //region file: libraries/stdlib/js-ir/build/jsMainSources/core/builtins/native/kotlin/Comparable.kt
  function Comparable() {
  }
  Comparable.$metadata$ = {
    simpleName: 'Comparable',
    kind: 'interface',
    interfaces: []
  };
  //endregion
  //region file: libraries/stdlib/js-ir/build/jsMainSources/core/builtins/native/kotlin/Number.kt
  function Number_0() {
  }
  Number_0.$metadata$ = {
    simpleName: 'Number',
    kind: 'class',
    interfaces: []
  };
  //endregion
  //region file: libraries/stdlib/js-ir/build/jsMainSources/core/builtins/src/kotlin/Unit.kt
  function Unit() {
    Unit_instance = this;
  }
  Unit.$metadata$ = {
    simpleName: 'Unit',
    kind: 'object',
    interfaces: []
  };
  var Unit_instance;
  function Unit_getInstance() {
    if (Unit_instance == null)
      new Unit();
    return Unit_instance;
  }
  //endregion
  //region file: libraries/stdlib/js-ir/build/jsMainSources/libraries/stdlib/js/src/kotlin/io.kt
  function Serializable() {
  }
  Serializable.$metadata$ = {
    simpleName: 'Serializable',
    kind: 'interface',
    interfaces: []
  };
  //endregion
  //region file: libraries/stdlib/js-ir/builtins/Enum.kt
  function Companion_1() {
    Companion_instance_0 = this;
  }
  Companion_1.$metadata$ = {
    simpleName: 'Companion',
    kind: 'object',
    interfaces: []
  };
  var Companion_instance_0;
  function Companion_getInstance_0() {
    if (Companion_instance_0 == null)
      new Companion_1();
    return Companion_instance_0;
  }
  function Enum(name, ordinal) {
    Companion_getInstance_0();
    this._name = name;
    this._ordinal = ordinal;
  }
  Enum.$metadata$ = {
    simpleName: 'Enum',
    kind: 'class',
    interfaces: [Comparable]
  };
  //endregion
  //region file: libraries/stdlib/js-ir/runtime/coreRuntime.kt
  function boxIntrinsic(x) {
    throw IllegalStateException_init_$Create$('Should be lowered');
  }
  function unboxIntrinsic(x) {
    throw IllegalStateException_init_$Create$('Should be lowered');
  }
  function captureStack(instance, constructorFunction) {
    if (Error.captureStackTrace != null) {
      Error.captureStackTrace(instance, constructorFunction);
    } else {
      var tmp$ret$0;
      $l$block: {
        tmp$ret$0 = instance;
        break $l$block;
      }
      tmp$ret$0.stack = (new Error()).stack;
    }
  }
  function extendThrowable(this_, message, cause) {
    Error.call(this_);
    setPropertiesToThrowableInstance(this_, message, cause);
  }
  function setPropertiesToThrowableInstance(this_, message, cause) {
    if (!hasOwnPrototypeProperty(this_, 'message')) {
      var tmp;
      if (message == null) {
        var tmp_0;
        if (!(message === null)) {
          var tmp0_safe_receiver = cause;
          var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.toString();
          tmp_0 = tmp1_elvis_lhs == null ? undefined : tmp1_elvis_lhs;
        } else {
          tmp_0 = undefined;
        }
        tmp = tmp_0;
      } else {
        tmp = message;
      }
      this_.message = tmp;
    }if (!hasOwnPrototypeProperty(this_, 'cause')) {
      this_.cause = cause;
    }this_.name = Object.getPrototypeOf(this_).constructor.name;
  }
  function hasOwnPrototypeProperty(o, name) {
    var tmp$ret$0;
    $l$block: {
      var tmp0_unsafeCast_0 = Object.getPrototypeOf(o).hasOwnProperty(name);
      tmp$ret$0 = tmp0_unsafeCast_0;
      break $l$block;
    }
    return tmp$ret$0;
  }
  //endregion
  //region file: libraries/stdlib/js-ir/runtime/coroutineInternalJS.kt
  function getContinuation() {
    throw Exception_init_$Create$('Implemented as intrinsic');
  }
  //endregion
  //region file: libraries/stdlib/js-ir/runtime/hacks.kt
  function ensureNotNull(v) {
    var tmp;
    if (v == null) {
      THROW_NPE();
    } else {
      tmp = v;
    }
    return tmp;
  }
  function THROW_NPE() {
    throw NullPointerException_init_$Create$();
  }
  function THROW_CCE() {
    throw ClassCastException_init_$Create$();
  }
  //endregion
  //region file: libraries/stdlib/js-ir/runtime/long.kt
  function Companion_2() {
    Companion_instance_1 = this;
    this._MIN_VALUE = new Long(0, -2147483648);
    this._MAX_VALUE = new Long(-1, 2147483647);
    this._SIZE_BYTES = 8;
    this._SIZE_BITS = 64;
  }
  Companion_2.$metadata$ = {
    simpleName: 'Companion',
    kind: 'object',
    interfaces: []
  };
  var Companion_instance_1;
  function Companion_getInstance_1() {
    if (Companion_instance_1 == null)
      new Companion_2();
    return Companion_instance_1;
  }
  function Long(low, high) {
    Companion_getInstance_1();
    Number_0.call(this);
    this._low = low;
    this._high = high;
  }
  Long.prototype.toDouble_0_k$ = function () {
    return toNumber(this);
  };
  Long.prototype.valueOf = function () {
    return this.toDouble_0_k$();
  };
  Long.$metadata$ = {
    simpleName: 'Long',
    kind: 'class',
    interfaces: [Comparable]
  };
  //endregion
  //region file: libraries/stdlib/js-ir/runtime/longjs.kt
  var ZERO;
  var ONE;
  var NEG_ONE;
  var MAX_VALUE;
  var MIN_VALUE;
  var TWO_PWR_24_;
  function toNumber(_this_) {
    init_properties_longjs_kt();
    return _this_._high * 4.294967296E9 + getLowBitsUnsigned(_this_);
  }
  function fromInt(value) {
    init_properties_longjs_kt();
    return new Long(value, value < 0 ? -1 : 0);
  }
  function getLowBitsUnsigned(_this_) {
    init_properties_longjs_kt();
    return _this_._low >= 0 ? _this_._low : 4.294967296E9 + _this_._low;
  }
  var properties_initialized_longjs_kt;
  function init_properties_longjs_kt() {
    if (!properties_initialized_longjs_kt) {
      properties_initialized_longjs_kt = true;
      ZERO = fromInt(0);
      ONE = fromInt(1);
      NEG_ONE = fromInt(-1);
      MAX_VALUE = new Long(-1, 2147483647);
      MIN_VALUE = new Long(0, -2147483648);
      TWO_PWR_24_ = fromInt(16777216);
    }}
  //endregion
  //region file: libraries/stdlib/js-ir/runtime/typeCheckUtils.kt
  function isInterface(obj, iface) {
    var tmp0_elvis_lhs = obj.constructor;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var ctor = tmp;
    return isInterfaceImpl(ctor, iface);
  }
  function isInterfaceImpl(ctor, iface) {
    if (ctor === iface)
      return true;
    var metadata = ctor.$metadata$;
    if (!(metadata == null)) {
      var interfaces = metadata.interfaces;
      var indexedObject = interfaces;
      var inductionVariable = 0;
      var last = indexedObject.length;
      while (inductionVariable < last) {
        var i = indexedObject[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        if (isInterfaceImpl(i, iface)) {
          return true;
        }}
    }var superPrototype = !(ctor.prototype == null) ? Object.getPrototypeOf(ctor.prototype) : null;
    var superConstructor = superPrototype != null ? superPrototype.constructor : null;
    return !(superConstructor == null) ? isInterfaceImpl(superConstructor, iface) : false;
  }
  function isObject(obj) {
    var objTypeOf = typeof obj;
    var tmp0_subject = objTypeOf;
    switch (tmp0_subject) {
      case 'string':
        return true;
      case 'number':
        return true;
      case 'boolean':
        return true;
      case 'function':
        return true;
      default:return jsInstanceOf(obj, Object);
    }
  }
  //endregion
  //region file: libraries/stdlib/js-ir/src/kotlin/coroutines_13/CoroutineImpl.kt
  function releaseIntercepted($this) {
    var intercepted_0 = $this._intercepted_;
    if (!(intercepted_0 == null) ? !(intercepted_0 === $this) : false) {
      ensureNotNull($this._get_context__0_k$().get_9uvjra_k$(Key_getInstance())).releaseInterceptedContinuation_h7c6yl_k$(intercepted_0);
    }$this._intercepted_ = CompletedContinuation_getInstance();
  }
  function CoroutineImpl_0(resultContinuation) {
    this._resultContinuation = resultContinuation;
    this._state = 0;
    this._exceptionState = 0;
    this._result = null;
    this._exception_0 = null;
    this._finallyPath = null;
    var tmp = this;
    var tmp0_safe_receiver = this._resultContinuation;
    tmp.__context = tmp0_safe_receiver == null ? null : tmp0_safe_receiver._get_context__0_k$();
    this._intercepted_ = null;
  }
  CoroutineImpl_0.prototype._get_exception__0_k$ = function () {
    return this._exception_0;
  };
  CoroutineImpl_0.prototype._get_context__0_k$ = function () {
    return ensureNotNull(this.__context);
  };
  CoroutineImpl_0.prototype.intercepted_0_k$ = function () {
    var tmp2_elvis_lhs = this._intercepted_;
    var tmp;
    if (tmp2_elvis_lhs == null) {
      var tmp$ret$0;
      $l$block: {
        var tmp0_safe_receiver = this._get_context__0_k$().get_9uvjra_k$(Key_getInstance());
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.interceptContinuation_x4ijla_k$(this);
        var tmp0_also_0 = tmp1_elvis_lhs == null ? this : tmp1_elvis_lhs;
        {
        }
        {
          this._intercepted_ = tmp0_also_0;
        }
        tmp$ret$0 = tmp0_also_0;
        break $l$block;
      }
      tmp = tmp$ret$0;
    } else {
      tmp = tmp2_elvis_lhs;
    }
    return tmp;
  };
  CoroutineImpl_0.prototype.resumeWith_jccoe6_k$ = function (result) {
    var current = this;
    var tmp$ret$0;
    $l$block: {
      var tmp;
      if (_Result___get_isFailure__impl_(result)) {
        tmp = null;
      } else {
        var tmp_0 = _Result___get_value__impl_(result);
        tmp = (tmp_0 == null ? true : isObject(tmp_0)) ? tmp_0 : THROW_CCE();
      }
      tmp$ret$0 = tmp;
      break $l$block;
    }
    var currentResult = tmp$ret$0;
    var currentException = Result__exceptionOrNull_impl(result);
    while (true) {
      var tmp$ret$6;
      $l$block_5: {
        var tmp0_with_0 = current;
        {
        }
        if (currentException == null) {
          tmp0_with_0._result = currentResult;
        } else {
          tmp0_with_0._state = tmp0_with_0._exceptionState;
          tmp0_with_0._exception_0 = currentException;
        }
        try {
          var outcome_2 = tmp0_with_0.doResume_0_k$();
          if (outcome_2 === _get_COROUTINE_SUSPENDED_())
            return Unit_getInstance();
          currentResult = outcome_2;
          currentException = null;
        } catch ($p) {
          currentResult = null;
          var tmp$ret$1;
          $l$block_0: {
            tmp$ret$1 = $p;
            break $l$block_0;
          }
          currentException = tmp$ret$1;
        }
        releaseIntercepted(tmp0_with_0);
        var completion_4 = ensureNotNull(tmp0_with_0._resultContinuation);
        var tmp_1;
        if (completion_4 instanceof CoroutineImpl_0) {
          current = completion_4;
          tmp_1 = Unit_getInstance();
        } else {
          {
            if (!(currentException == null)) {
              var tmp$ret$3;
              $l$block_2: {
                var tmp0_resumeWithException_0_5 = ensureNotNull(currentException);
                var tmp$ret$2;
                $l$block_1: {
                  var tmp0_failure_0_1_6 = Companion_getInstance();
                  tmp$ret$2 = _Result___init__impl_(createFailure(tmp0_resumeWithException_0_5));
                  break $l$block_1;
                }
                tmp$ret$3 = completion_4.resumeWith_bnunh2_k$(tmp$ret$2);
                break $l$block_2;
              }
            } else {
              var tmp$ret$5;
              $l$block_4: {
                var tmp1_resume_0_7 = currentResult;
                var tmp$ret$4;
                $l$block_3: {
                  var tmp0_success_0_1_8 = Companion_getInstance();
                  tmp$ret$4 = _Result___init__impl_(tmp1_resume_0_7);
                  break $l$block_3;
                }
                tmp$ret$5 = completion_4.resumeWith_bnunh2_k$(tmp$ret$4);
                break $l$block_4;
              }
            }
            return Unit_getInstance();
          }
        }
        tmp$ret$6 = tmp_1;
        break $l$block_5;
      }
    }
  };
  CoroutineImpl_0.prototype.resumeWith_bnunh2_k$ = function (result) {
    return this.resumeWith_jccoe6_k$(result);
  };
  CoroutineImpl_0.$metadata$ = {
    simpleName: 'CoroutineImpl',
    kind: 'class',
    interfaces: [Continuation]
  };
  function CompletedContinuation() {
    CompletedContinuation_instance = this;
  }
  CompletedContinuation.prototype._get_context__0_k$ = function () {
    throw IllegalStateException_init_$Create$('This continuation is already complete');
  };
  CompletedContinuation.prototype.resumeWith_jccoe6_k$ = function (result) {
    {
      throw IllegalStateException_init_$Create$('This continuation is already complete');
    }
  };
  CompletedContinuation.prototype.resumeWith_bnunh2_k$ = function (result) {
    return this.resumeWith_jccoe6_k$(result);
  };
  CompletedContinuation.$metadata$ = {
    simpleName: 'CompletedContinuation',
    kind: 'object',
    interfaces: [Continuation]
  };
  var CompletedContinuation_instance;
  function CompletedContinuation_getInstance() {
    if (CompletedContinuation_instance == null)
      new CompletedContinuation();
    return CompletedContinuation_instance;
  }
  //endregion
  //region file: libraries/stdlib/js-ir/src/kotlin/coroutines_13/IntrinsicsJs.kt
  function intercepted(_this_) {
    var tmp0_safe_receiver = _this_ instanceof CoroutineImpl_0 ? _this_ : null;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.intercepted_0_k$();
    return tmp1_elvis_lhs == null ? _this_ : tmp1_elvis_lhs;
  }
  function createCoroutineUnintercepted(_this_, completion) {
    var tmp$ret$0;
    $l$block: {
      tmp$ret$0 = new _no_name_provided__1(completion, _this_);
      break $l$block;
    }
    return tmp$ret$0;
  }
  function invokeSuspendSuperType(_this_, completion) {
    throw new NotImplementedError('It is intrinsic method');
  }
  function _no_name_provided__1($completion, $this_createCoroutineUnintercepted) {
    this._$completion = $completion;
    this._$this_createCoroutineUnintercepted = $this_createCoroutineUnintercepted;
    CoroutineImpl_0.call(this, isInterface($completion, Continuation) ? $completion : THROW_CCE());
  }
  _no_name_provided__1.prototype.doResume_2_0_k$ = function () {
    if (this._get_exception__0_k$() != null)
      throw this._get_exception__0_k$();
    var tmp$ret$1;
    $l$block_0: {
      var tmp$ret$0;
      $l$block: {
        tmp$ret$0 = this._$this_createCoroutineUnintercepted;
        break $l$block;
      }
      var a_22 = tmp$ret$0;
      tmp$ret$1 = typeof a_22 === 'function' ? a_22(this._$completion) : this._$this_createCoroutineUnintercepted.invoke_0_k$(this._$completion);
      break $l$block_0;
    }
    return tmp$ret$1;
  };
  _no_name_provided__1.prototype.doResume_0_k$ = function () {
    return this.doResume_2_0_k$();
  };
  _no_name_provided__1.$metadata$ = {
    simpleName: '<no name provided>_1',
    kind: 'class',
    interfaces: []
  };
  //endregion
  //region file: libraries/stdlib/js-ir/src/kotlin/exceptions.kt
  function Exception_init_$Init$($this) {
    extendThrowable($this, void 1, void 1);
    Exception.call($this);
    return $this;
  }
  function Exception_init_$Init$_0(message, $this) {
    extendThrowable($this, message, void 1);
    Exception.call($this);
    return $this;
  }
  function Exception_init_$Create$(message) {
    var tmp = Exception_init_$Init$_0(message, Object.create(Exception.prototype));
    captureStack(tmp, Exception_init_$Create$);
    return tmp;
  }
  function Exception() {
    captureStack(this, Exception);
  }
  Exception.$metadata$ = {
    simpleName: 'Exception',
    kind: 'class',
    interfaces: []
  };
  function Error_init_$Init$(message, $this) {
    extendThrowable($this, message, void 1);
    Error_0.call($this);
    return $this;
  }
  function Error_0() {
    captureStack(this, Error_0);
  }
  Error_0.$metadata$ = {
    simpleName: 'Error',
    kind: 'class',
    interfaces: []
  };
  function RuntimeException_init_$Init$($this) {
    Exception_init_$Init$($this);
    RuntimeException.call($this);
    return $this;
  }
  function RuntimeException_init_$Init$_0(message, $this) {
    Exception_init_$Init$_0(message, $this);
    RuntimeException.call($this);
    return $this;
  }
  function RuntimeException() {
    captureStack(this, RuntimeException);
  }
  RuntimeException.$metadata$ = {
    simpleName: 'RuntimeException',
    kind: 'class',
    interfaces: []
  };
  function IllegalStateException_init_$Init$(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    IllegalStateException.call($this);
    return $this;
  }
  function IllegalStateException_init_$Create$(message) {
    var tmp = IllegalStateException_init_$Init$(message, Object.create(IllegalStateException.prototype));
    captureStack(tmp, IllegalStateException_init_$Create$);
    return tmp;
  }
  function IllegalStateException() {
    captureStack(this, IllegalStateException);
  }
  IllegalStateException.$metadata$ = {
    simpleName: 'IllegalStateException',
    kind: 'class',
    interfaces: []
  };
  function NullPointerException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    NullPointerException.call($this);
    return $this;
  }
  function NullPointerException_init_$Create$() {
    var tmp = NullPointerException_init_$Init$(Object.create(NullPointerException.prototype));
    captureStack(tmp, NullPointerException_init_$Create$);
    return tmp;
  }
  function NullPointerException() {
    captureStack(this, NullPointerException);
  }
  NullPointerException.$metadata$ = {
    simpleName: 'NullPointerException',
    kind: 'class',
    interfaces: []
  };
  function ClassCastException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    ClassCastException.call($this);
    return $this;
  }
  function ClassCastException_init_$Create$() {
    var tmp = ClassCastException_init_$Init$(Object.create(ClassCastException.prototype));
    captureStack(tmp, ClassCastException_init_$Create$);
    return tmp;
  }
  function ClassCastException() {
    captureStack(this, ClassCastException);
  }
  ClassCastException.$metadata$ = {
    simpleName: 'ClassCastException',
    kind: 'class',
    interfaces: []
  };
  //endregion
  //region file: libraries/stdlib/js-ir/src/kotlin/jsOperators.kt
  function jsTypeOf(value_hack) {
    var tmp$ret$0;
    $l$block: {
      var tmp0_unsafeCast_0 = jsTypeOf$outlinedJsCode$(value_hack);
      tmp$ret$0 = tmp0_unsafeCast_0;
      break $l$block;
    }
    return tmp$ret$0;
  }
  function jsInstanceOf(obj_hack, jsClass_hack) {
    var tmp$ret$0;
    $l$block: {
      var tmp0_unsafeCast_0 = jsInstanceOf$outlinedJsCode$(obj_hack, jsClass_hack);
      tmp$ret$0 = tmp0_unsafeCast_0;
      break $l$block;
    }
    return tmp$ret$0;
  }
  function jsTypeOf$outlinedJsCode$(value_hack) {
    return typeof value_hack;
  }
  function jsInstanceOf$outlinedJsCode$(obj_hack, jsClass_hack) {
    return obj_hack instanceof jsClass_hack;
  }
  //endregion
  //region file: <TMP>/JS_TESTS/2.kt
  function _C___init__impl_(value) {
    return value;
  }
  function _C___get_value__impl_(this_0) {
    return this_0;
  }
  function C(value) {
    this._value = value;
  }
  C.$metadata$ = {
    simpleName: 'C',
    kind: 'class',
    interfaces: []
  };
  function box() {
    var result = {_v: 'fail'};
    var tmp$ret$0;
    $l$block: {
      var tmp0_suspend_0 = box$slambda_0(result, null);
      tmp$ret$0 = tmp0_suspend_0;
      break $l$block;
    }
    startCoroutine(tmp$ret$0, Companion_getInstance_2());
    return result._v;
  }
  function box$slambda$slambda(resultContinuation) {
    CoroutineImpl_0.call(this, resultContinuation);
  }
  box$slambda$slambda.prototype.invoke_o9ai9r_k$ = function ($cont) {
    var tmp = this.create_s8oglw_k$($cont);
    tmp._result = Unit_getInstance();
    tmp._exception_0 = null;
    var tmp_0 = tmp.doResume_0_k$();
    if (tmp_0 === _get_COROUTINE_SUSPENDED_())
      return tmp_0;
    return tmp_0._value;
  };
  box$slambda$slambda.prototype.invoke_0_k$ = function ($cont) {
    return new C(this.invoke_o9ai9r_k$($cont));
  };
  box$slambda$slambda.prototype.doResume_0_k$ = function () {
    var suspendResult = this._result;
    $sm: do
      try {
        var tmp = this._state;
        if (tmp === 0) {
          this._exceptionState = 1;
          return new C(_C___init__impl_('OK'));
        } else if (tmp === 1) {
          throw this._exception_0;
        }} catch ($p) {
        throw $p;
      }
     while (true);
  };
  box$slambda$slambda.prototype.create_s8oglw_k$ = function (completion) {
    var i = new box$slambda$slambda(completion);
    return i;
  };
  box$slambda$slambda.$metadata$ = {
    simpleName: 'box$slambda$slambda',
    kind: 'class',
    interfaces: [],
    suspendArity: [0]
  };
  function box$slambda$slambda_0(resultContinuation) {
    var i = new box$slambda$slambda(resultContinuation);
    var l = function ($cont) {
      return i.invoke_o9ai9r_k$($cont);
    };
    l.$arity = 0;
    return l;
  }
  function box$slambda$slambda_1($tmp1_map_0, resultContinuation) {
    this._$tmp1_map_0 = $tmp1_map_0;
    CoroutineImpl_0.call(this, resultContinuation);
  }
  box$slambda$slambda_1.prototype.invoke_o9ai9r_k$ = function ($cont) {
    var tmp = this.create_s8oglw_k$($cont);
    tmp._result = Unit_getInstance();
    tmp._exception_0 = null;
    var tmp_0 = tmp.doResume_0_k$();
    if (tmp_0 === _get_COROUTINE_SUSPENDED_())
      return tmp_0;
    return tmp_0._value;
  };
  box$slambda$slambda_1.prototype.invoke_0_k$ = function ($cont) {
    return new C(this.invoke_o9ai9r_k$($cont));
  };
  box$slambda$slambda_1.prototype.doResume_0_k$ = function () {
    var suspendResult = this._result;
    $sm: do
      try {
        var tmp = this._state;
        switch (tmp) {
          case 0:
            this._exceptionState = 2;
            this._state = 1;
            suspendResult = this._$tmp1_map_0(this);
            if (suspendResult === _get_COROUTINE_SUSPENDED_()) {
              return suspendResult;
            }
            continue $sm;
          case 1:
	    debugger;
            var tmp2__anonymous__2 = suspendResult._value;
            return new C(tmp2__anonymous__2);
          case 2:
            throw this._exception_0;
        }
      } catch ($p) {
        if (this._exceptionState === 2) {
          throw $p;
        } else {
          this._state = this._exceptionState;
          this._exception_0 = $p;
        }
      }
     while (true);
  };
  box$slambda$slambda_1.prototype.create_s8oglw_k$ = function (completion) {
    var i = new box$slambda$slambda_1(this._$tmp1_map_0, completion);
    return i;
  };
  box$slambda$slambda_1.$metadata$ = {
    simpleName: 'box$slambda$slambda',
    kind: 'class',
    interfaces: [],
    suspendArity: [0]
  };
  function box$slambda$slambda_2($tmp1_map_0, resultContinuation) {
    var i = new box$slambda$slambda_1($tmp1_map_0, resultContinuation);
    var l = function ($cont) {
      return i.invoke_o9ai9r_k$($cont);
    };
    l.$arity = 0;
    return l;
  }
  function box$slambda($result, resultContinuation) {
    this._$result = $result;
    CoroutineImpl_0.call(this, resultContinuation);
  }
  box$slambda.prototype.invoke_sv8swh_k$ = function ($cont) {
    var tmp = this.create_s8oglw_k$($cont);
    tmp._result = Unit_getInstance();
    tmp._exception_0 = null;
    return tmp.doResume_0_k$();
  };
  box$slambda.prototype.invoke_0_k$ = function ($cont) {
    this.invoke_sv8swh_k$($cont);
    return Unit_getInstance();
  };
  box$slambda.prototype.doResume_0_k$ = function () {
    var suspendResult = this._result;
    $sm: do
      try {
        var tmp = this._state;
        switch (tmp) {
          case 0:
            this._exceptionState = 2;
            this._state = 1;
            var tmp_0 = this;
            var tmp0_suspend_0 = box$slambda$slambda_0(null);
            tmp_0._tmp1_map_00 = tmp0_suspend_0;
            suspendResult = box$slambda$slambda_2(this._tmp1_map_00, null)(this);
            if (suspendResult === _get_COROUTINE_SUSPENDED_()) {
              return suspendResult;
            }
            continue $sm;
          case 1:
            var ARGUMENT = suspendResult._value;
            var ARGUMENT_0 = _C___get_value__impl_(ARGUMENT);
            this._$result._v = ARGUMENT_0;
            return Unit_getInstance();
          case 2:
            throw this._exception_0;
        }
      } catch ($p) {
        if (this._exceptionState === 2) {
          throw $p;
        } else {
          this._state = this._exceptionState;
          this._exception_0 = $p;
        }
      }
     while (true);
  };
  box$slambda.prototype.create_s8oglw_k$ = function (completion) {
    var i = new box$slambda(this._$result, completion);
    return i;
  };
  box$slambda.$metadata$ = {
    simpleName: 'box$slambda',
    kind: 'class',
    interfaces: [],
    suspendArity: [0]
  };
  function box$slambda_0($result, resultContinuation) {
    var i = new box$slambda($result, resultContinuation);
    var l = function ($cont) {
      return i.invoke_sv8swh_k$($cont);
    };
    l.$arity = 0;
    return l;
  }
  //endregion
  //region file: <TMP>/JS_TESTS/CoroutineUtil.kt
  function EmptyContinuation_init_$Init$(context, $mask0, $marker, $this) {
    if (!(($mask0 & 1) === 0))
      context = EmptyCoroutineContext_getInstance();
    EmptyContinuation.call($this, context);
    return $this;
  }
  function Companion_3() {
    Companion_instance_2 = this;
    EmptyContinuation_init_$Init$(null, 1, null, this);
  }
  Companion_3.$metadata$ = {
    simpleName: 'Companion',
    kind: 'object',
    interfaces: []
  };
  var Companion_instance_2;
  function Companion_getInstance_2() {
    if (Companion_instance_2 == null)
      new Companion_3();
    return Companion_instance_2;
  }
  function EmptyContinuation(context) {
    Companion_getInstance_2();
    this._context = context;
  }
  EmptyContinuation.prototype._get_context__0_k$ = function () {
    return this._context;
  };
  EmptyContinuation.prototype.resumeWith_jccoe6_k$ = function (result) {
    var tmp$ret$0;
    $l$block: {
      throwOnFailure(result);
      var tmp = _Result___get_value__impl_(result);
      tmp$ret$0 = (tmp == null ? true : isObject(tmp)) ? tmp : THROW_CCE();
      break $l$block;
    }
    Unit_getInstance();
  };
  EmptyContinuation.prototype.resumeWith_bnunh2_k$ = function (result) {
    return this.resumeWith_jccoe6_k$(result);
  };
  EmptyContinuation.$metadata$ = {
    simpleName: 'EmptyContinuation',
    kind: 'class',
    interfaces: [Continuation]
  };
  //endregion
  //region block: exports
  _.box = box;
  //endregion
  return _;
}(typeof JS_TESTS === 'undefined' ? {} : JS_TESTS);
JS_TESTS.box()
